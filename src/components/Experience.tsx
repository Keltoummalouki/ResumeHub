const Experience = () => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold">Stagiaire Développeuse Web – Caisse Manager, Rabat</h4>
          <span className="font-bold whitespace-nowrap">Juin – Août 2025</span>
        </div>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Développement d'un site vitrine officiel</li>
          <li>Réalisation de maquettes et intégration front-end avec React, Next.js et Tailwind CSS.</li>
          <li>Mise en place d'animations web interactives.</li>
        </ul>
        <p className="mt-1">
          <span className="font-bold">Technologies & outils utilisés :</span>
        </p>
        <p className="ml-5">Next.js, React.js, TailwindCSS, GSAP, Framer Motion, Shadcn UI, Git/GitHub</p>
      </div>
    </div>
  );
};

export default Experience;
