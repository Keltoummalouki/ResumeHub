import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Copy, Check, Share2, ArrowLeft, Printer, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TemplateRenderer, { CVData } from '@/components/templates/TemplateRenderer';
import { db, CVVariant } from '@/db/database';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SharePage = () => {
    const { variantId } = useParams();
    const cvRef = useRef<HTMLDivElement>(null);

    const [variant, setVariant] = useState<CVVariant | null>(null);
    const [cvData, setCvData] = useState<CVData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadData();
    }, [variantId]);

    const loadData = async () => {
        setIsLoading(true);

        // Load variant or get default
        let cv: CVVariant | undefined;
        if (variantId) {
            cv = await db.cvVariants.get(variantId);
        } else {
            cv = await db.cvVariants.filter(v => v.isDefault).first();
        }

        if (cv) {
            setVariant(cv);
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

        setIsLoading(false);
    };

    const getShareableLink = () => {
        const baseUrl = window.location.origin;
        return `${baseUrl}/share/${variant?.id || 'default'}`;
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(getShareableLink());
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

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
            pdf.save(`CV_${cvData?.profile.name.replace(/\s+/g, '_')}.pdf`);

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

    const handleExportJSON = () => {
        if (!cvData) return;

        const exportData = {
            exportedAt: new Date().toISOString(),
            variant: variant ? {
                name: variant.name,
                template: variant.template,
                language: variant.language,
            } : null,
            data: cvData,
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_${cvData.profile.name.replace(/\s+/g, '_')}_backup.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success('JSON backup exported!');
    };

    const handlePrint = () => {
        window.print();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!cvData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">CV Not Found</h1>
                    <p className="text-muted-foreground mb-4">This CV doesn't exist or has been deleted.</p>
                    <Button asChild>
                        <Link to="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Toolbar */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center justify-between px-6 print:hidden">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/dashboard">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="font-semibold">{variant?.name || 'My CV'}</h1>
                        <p className="text-xs text-muted-foreground">
                            Share & Export
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Share Link */}
                    <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                        <input
                            type="text"
                            value={getShareableLink()}
                            readOnly
                            className="bg-transparent text-sm w-64 outline-none"
                        />
                        <Button variant="ghost" size="icon" onClick={copyLink} className="h-7 w-7">
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>

                    <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>

                    <Button variant="outline" size="sm" onClick={handleExportJSON}>
                        <FileJson className="h-4 w-4 mr-2" />
                        JSON
                    </Button>

                    <Button size="sm" onClick={handleExportPDF} disabled={isExporting}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                    </Button>
                </div>
            </div>

            {/* CV Preview */}
            <div className="pt-16 p-8 flex justify-center print:p-0 print:pt-0">
                <div
                    ref={cvRef}
                    className="bg-white shadow-2xl print:shadow-none"
                    style={{ width: '210mm', minHeight: '297mm' }}
                >
                    <TemplateRenderer
                        template={variant?.template || 'classic'}
                        data={cvData}
                        language={variant?.language || 'fr'}
                        accentColor={variant?.accentColor}
                    />
                </div>
            </div>

            {/* Share Info Card */}
            <div className="fixed bottom-6 right-6 bg-card border border-border rounded-xl p-4 shadow-lg max-w-sm print:hidden">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Share2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-medium">Share Your CV</h3>
                        <p className="text-xs text-muted-foreground">Anyone with the link can view</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={copyLink}>
                        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? 'Copied!' : 'Copy Link'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleExportPDF} disabled={isExporting}>
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SharePage;
