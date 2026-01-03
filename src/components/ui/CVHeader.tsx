import profileImage from "@/assets/profile.png";

const CVHeader = () => {
  return (
    <header className="mb-4">
      <div className="flex items-start justify-between gap-6 mb-3">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-1 leading-tight">
            Développeuse Full Stack
          </h1>
          <h2 className="text-2xl font-bold uppercase tracking-wide leading-tight">
            Keltoum Malouki
          </h2>
        </div>
        <div className="flex-shrink-0">
          <img
            src={profileImage}
            alt="Keltoum Malouki"
            className="w-20 h-20 rounded-full object-cover border-2 border-foreground"
          />
        </div>
      </div>

      <div className="border-t-2 border-divider pt-2 pb-2">
        <div className="text-[10px] space-y-1 leading-relaxed">
          <p>
            <span className="font-bold">Téléphone:</span> +212 606232697 |{" "}
            <span className="font-bold">E-mail:</span> keltoummalouki@gmail.com |{" "}
            <span className="font-bold">Adresse</span>: Casablanca (mobilité)
          </p>
          <p>
            <span className="font-bold">GitHub :</span> keltoummalouki |{" "}
            <span className="font-bold">Linkedin:</span> keltoummalouki |{" "}
            <span className="font-bold">Portfolio :</span> keltoummalouki.com
          </p>
        </div>
      </div>
    </header>
  );
};

export default CVHeader;