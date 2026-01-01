import { Download, FileImage, FileJson, Upload, RotateCcw, Printer, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { useCVStore } from '@/store/cvStore';
import { CVData } from '@/types/cv';
import { useRef, useState } from 'react';

const ExportMenu = () => {
    const { cv, importCV, resetCV } = useCVStore();
    const { personalInfo } = cv;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const getFileName = (ext: string) => {
        const name = personalInfo.name.replace(/\s+/g, '_');
        const date = new Date().toISOString().split('T')[0];
        return `CV_${name}_${date}.${ext}`;
    };

    // Optimized PDF export with professional settings
    const handleDownloadPDF = async () => {
        if (isExporting) return;

        try {
            setIsExporting(true);
            toast('Génération du PDF en cours...', { duration: 5000 });

            const element = document.getElementById('cv-content');
            if (!element) {
                toast.error('Élément CV non trouvé');
                return;
            }

            // Store original styles
            const originalStyles = {
                boxShadow: element.style.boxShadow,
                borderRadius: element.style.borderRadius,
                transform: element.style.transform,
            };

            // Apply PDF-optimized styles
            element.style.boxShadow = 'none';
            element.style.borderRadius = '0';
            element.style.transform = 'none';

            // Wait for styles to apply
            await new Promise(resolve => setTimeout(resolve, 100));

            // High-quality canvas rendering
            const canvas = await html2canvas(element, {
                scale: 4, // Maximum quality for print
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                imageTimeout: 15000,
                removeContainer: true,
                // Optimize for text rendering
                letterRendering: true,
                // Prevent font issues
                foreignObjectRendering: false,
            });

            // Restore original styles
            Object.assign(element.style, originalStyles);

            // A4 dimensions in mm
            const A4_WIDTH_MM = 210;
            const A4_HEIGHT_MM = 297;
            const MARGIN_MM = 0; // No margins for edge-to-edge

            // Calculate image dimensions to fit A4
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const aspectRatio = canvasWidth / canvasHeight;

            // Fit to A4 width
            const pdfWidth = A4_WIDTH_MM - (MARGIN_MM * 2);
            const pdfHeight = pdfWidth / aspectRatio;

            // Create PDF with optimal settings
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true,
                putOnlyUsedFonts: true,
                floatPrecision: 16,
            });

            // Convert canvas to high-quality JPEG (smaller file size than PNG)
            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            // Add image with proper positioning
            let heightLeft = pdfHeight;
            let position = MARGIN_MM;
            let pageNumber = 1;

            // Add first page
            pdf.addImage(
                imgData,
                'JPEG',
                MARGIN_MM,
                position,
                pdfWidth,
                pdfHeight,
                `page-${pageNumber}`,
                'MEDIUM'
            );
            heightLeft -= (A4_HEIGHT_MM - MARGIN_MM * 2);

            // Add additional pages if needed
            while (heightLeft > 0) {
                pageNumber++;
                position = MARGIN_MM - (pageNumber - 1) * (A4_HEIGHT_MM - MARGIN_MM * 2);
                pdf.addPage();
                pdf.addImage(
                    imgData,
                    'JPEG',
                    MARGIN_MM,
                    position,
                    pdfWidth,
                    pdfHeight,
                    `page-${pageNumber}`,
                    'MEDIUM'
                );
                heightLeft -= (A4_HEIGHT_MM - MARGIN_MM * 2);
            }

            // Add PDF metadata
            pdf.setProperties({
                title: `CV - ${personalInfo.name}`,
                subject: `CV ${personalInfo.title}`,
                author: personalInfo.name,
                keywords: 'CV, Resume, ' + personalInfo.title,
                creator: 'ResumeHub - https://github.com/keltoummalouki/ResumeHub',
            });

            // Save with optimized filename
            pdf.save(getFileName('pdf'));
            toast.success('CV téléchargé en PDF haute qualité !');
        } catch (error) {
            console.error('PDF export error:', error);
            toast.error('Erreur lors de la génération du PDF');
        } finally {
            setIsExporting(false);
        }
    };

    const handleDownloadPNG = async () => {
        if (isExporting) return;

        try {
            setIsExporting(true);
            toast("Génération de l'image en cours...");

            const element = document.getElementById('cv-content');
            if (!element) return;

            const originalShadow = element.style.boxShadow;
            element.style.boxShadow = 'none';

            const canvas = await html2canvas(element, {
                scale: 4,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
            });

            element.style.boxShadow = originalShadow;

            canvas.toBlob(
                (blob) => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = getFileName('png');
                    link.click();
                    URL.revokeObjectURL(url);
                    toast.success('CV téléchargé en PNG haute résolution !');
                },
                'image/png',
                1.0
            );
        } catch (error) {
            console.error('PNG export error:', error);
            toast.error('Erreur lors du téléchargement');
        } finally {
            setIsExporting(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExportJSON = () => {
        try {
            const exportData = {
                ...cv,
                _metadata: {
                    exportedAt: new Date().toISOString(),
                    version: '1.0.0',
                    generator: 'ResumeHub',
                },
            };
            const dataStr = JSON.stringify(exportData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = getFileName('json');
            link.click();
            URL.revokeObjectURL(url);
            toast.success('CV exporté en JSON !');
        } catch (error) {
            console.error('JSON export error:', error);
            toast.error("Erreur lors de l'export");
        }
    };

    const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const data = JSON.parse(content);

                // Handle both direct CVData and wrapped format
                const cvData: CVData = data._metadata ?
                    {
                        personalInfo: data.personalInfo, skills: data.skills, experience: data.experience,
                        education: data.education, projects: data.projects, certifications: data.certifications,
                        softSkills: data.softSkills, languages: data.languages
                    } :
                    data;

                // Basic validation
                if (!cvData.personalInfo || !cvData.skills || !cvData.experience) {
                    throw new Error('Invalid CV data structure');
                }

                importCV(cvData);
                toast.success('CV importé avec succès !');
            } catch (error) {
                console.error('JSON import error:', error);
                toast.error('Fichier JSON invalide. Vérifiez le format.');
            }
        };
        reader.readAsText(file);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleReset = async () => {
        const result = await Swal.fire({
            title: 'Réinitialiser le CV ?',
            text: 'Cette action supprimera toutes vos modifications.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Oui, réinitialiser',
            cancelButtonText: 'Annuler',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            resetCV();
            Swal.fire({
                title: 'Réinitialisé !',
                text: 'Votre CV a été réinitialisé aux valeurs par défaut.',
                icon: 'success',
                confirmButtonColor: '#2563eb',
            });
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleImportJSON}
                className="hidden"
                aria-label="Importer un fichier JSON"
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="default" className="gap-2" disabled={isExporting}>
                        {isExporting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">Exporter</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleDownloadPDF} disabled={isExporting}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>PDF (Haute qualité)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownloadPNG} disabled={isExporting}>
                        <FileImage className="mr-2 h-4 w-4" />
                        <span>PNG (4x résolution)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        <span>Imprimer</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleExportJSON}>
                        <FileJson className="mr-2 h-4 w-4" />
                        <span>Exporter JSON</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Importer JSON</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleReset} className="text-destructive focus:text-destructive">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        <span>Réinitialiser</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ExportMenu;
