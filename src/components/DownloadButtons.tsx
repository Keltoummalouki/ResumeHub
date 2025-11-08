import { Download, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

const DownloadButtons = () => {
  const handleDownloadPDF = async () => {
    try {
      toast("Génération du PDF en cours...");
      const element = document.getElementById("cv-content");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("CV_Keltoum_Malouki.pdf");
      toast.success("CV téléchargé en PDF !");
    } catch (error) {
      toast.error("Erreur lors du téléchargement");
    }
  };

  const handleDownloadPNG = async () => {
    try {
      toast("Génération de l'image en cours...");
      const element = document.getElementById("cv-content");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "CV_Keltoum_Malouki.png";
        link.click();
        URL.revokeObjectURL(url);
        toast.success("CV téléchargé en PNG !");
      });
    } catch (error) {
      toast.error("Erreur lors du téléchargement");
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <Button
        onClick={handleDownloadPDF}
        variant="default"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Télécharger PDF
      </Button>
      <Button
        onClick={handleDownloadPNG}
        variant="outline"
        className="gap-2"
      >
        <FileImage className="h-4 w-4" />
        Télécharger PNG
      </Button>
    </div>
  );
};

export default DownloadButtons;