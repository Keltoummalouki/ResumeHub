const Additional = () => {
  return (
    <div className="space-y-3">
      <div className="text-xs">
        <p className="mb-1">Certifications: Docker Foundations Professional LinkedIn Certificate</p>
      </div>

      <div className="border-t-2 border-divider pt-2">
        <h3 className="text-base font-bold uppercase tracking-wide mb-2">Compétences transversales</h3>
        <div className="grid grid-cols-3 gap-3 text-xs text-center">
          <div>Gestion du temps</div>
          <div>Adaptabilité - Flexibilité</div>
          <div>Travail en équipe</div>
        </div>
      </div>

      <div className="border-t-2 border-divider pt-2">
        <h3 className="text-base font-bold uppercase tracking-wide mb-2">Langues</h3>
        <div className="grid grid-cols-3 gap-3 text-xs text-center">
          <div>Arabe (maternelle)</div>
          <div>Français (B1)</div>
          <div>Anglais (A2)</div>
        </div>
      </div>
    </div>
  );
};

export default Additional;