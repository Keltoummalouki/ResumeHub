import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Download, Eye, Printer, ArrowLeft, Settings2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TemplateRenderer, { CVData } from '@/components/templates/TemplateRenderer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { db, CVVariant } from '@/db/database';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const accentColors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Teal', value: '#14b8a6' },
];

const PreviewPage = () => {
    const { variantId } = useParams();
    const navigate = useNavigate();
    const cvRef = useRef<HTMLDivElement>(null);

    const [variant, setVariant] = useState<CVVariant | null>(null);
    const [cvData, setCvData] = useState<CVData | null>(null);
    const [template, setTemplate] = useState<'classic' | 'modern' | 'minimal'>('classic');
    const [accentColor, setAccentColor] = useState('#3b82f6');
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            // Load variant or get default
            let cv: CVVariant | undefined;
            if (variantId) {
                cv = await db.cvVariants.get(variantId);
            } else {
                cv = await db.cvVariants.filter(v => v.isDefault).first();
            }

            if (cv) {
                setVariant(cv);
                setTemplate(cv.template);
                if (cv.accentColor) setAccentColor(cv.accentColor);
            }

            // Load all data
            const [profile, experiences, projects, skills, education, certifications] = await Promise.all([
                db.profile.get('default'),
                db.experiences.orderBy('order').toArray(),
                db.projects.orderBy('order').toArray(),
                db.skills.toArray(),
                db.education.orderBy('order').toArray(),
                db.certifications.toArray(),
            ]);

            if (profile) {
                // Filter data based on variant selections (if variant exists)
                const filteredData: CVData = {
                    profile,
                    experiences: cv?.selectedExperienceIds?.length
                        ? experiences.filter(e => cv.selectedExperienceIds.includes(e.id))
                        : experiences,
                    projects: cv?.selectedProjectIds?.length
                        ? projects.filter(p => cv.selectedProjectIds.includes(p.id))
                        : projects,
                    skills: cv?.selectedSkillIds?.length
                        ? skills.filter(s => cv.selectedSkillIds.includes(s.id))
                        : skills,
                    education: cv?.selectedEducationIds?.length
                        ? education.filter(e => cv.selectedEducationIds.includes(e.id))
                        : education,
                    certifications: cv?.selectedCertificationIds?.length
                        ? certifications.filter(c => cv.selectedCertificationIds.includes(c.id))
                        : certifications,
                };
                setCvData(filteredData);
            }
        };

        loadData();
    }, [variantId]);

    const handleExportPDF = async () => {
        if (!cvRef.current) return;

        setIsExporting(true);
        toast.loading('Generating PDF...');

        try {
            const canvas = await html2canvas(cvRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`CV_${cvData?.profile.name.replace(/\s+/g, '_')}_${template}.pdf`);

            // Mark as exported
            if (variant?.id) {
                await db.cvVariants.update(variant.id, { lastExportedAt: new Date() });
            }

            toast.dismiss();
            toast.success('PDF exported successfully!');
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to export PDF');
            console.error(error);
        } finally {
            setIsExporting(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (!cvData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Toolbar */}
            <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-border z-50 flex items-center justify-between px-4 print:hidden">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="font-semibold">{variant?.name || 'CV Preview'}</h1>
                        <p className="text-xs text-muted-foreground">
                            {template.charAt(0).toUpperCase() + template.slice(1)} Template
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Template Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Settings2 className="h-4 w-4 mr-2" />
                                {template}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Template Style</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setTemplate('classic')}>
                                Classic - Traditional single-column
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTemplate('modern')}>
                                Modern - Two-column with sidebar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTemplate('minimal')}>
                                Minimal - Clean, whitespace-focused
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Color Selector (for Modern template) */}
                    {template === 'modern' && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Palette className="h-4 w-4 mr-2" />
                                    <div
                                        className="w-4 h-4 rounded-full border"
                                        style={{ backgroundColor: accentColor }}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Accent Color</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {accentColors.map(color => (
                                    <DropdownMenuItem
                                        key={color.value}
                                        onClick={() => setAccentColor(color.value)}
                                    >
                                        <div
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{ backgroundColor: color.value }}
                                        />
                                        {color.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>

                    <Button size="sm" onClick={handleExportPDF} disabled={isExporting}>
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* CV Preview */}
            <div className="pt-14 p-8 flex justify-center print:p-0 print:pt-0">
                <div
                    ref={cvRef}
                    className="bg-white shadow-2xl print:shadow-none"
                    style={{ width: '210mm', minHeight: '297mm' }}
                >
                    <TemplateRenderer
                        template={template}
                        data={cvData}
                        language={variant?.language || 'fr'}
                        accentColor={accentColor}
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
