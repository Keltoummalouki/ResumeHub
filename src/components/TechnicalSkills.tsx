const TechnicalSkills = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
      <div>
        <p className="mb-1">
          <span className="font-bold">Langages :</span> C, HTML5, CSS3, SQL, NoSQL, JavaScript, TypeScript, PHP.
        </p>
        <p className="mb-1">
          <span className="font-bold">Frameworks & APIs :</span> Laravel, React, Next.js, Express.js, NestJS, Tailwind CSS, GraphQL.
        </p>
        <p>
          <span className="font-bold">DevOps :</span> Docker, CI/CD (GitHub Actions, GitLab), tests automatisés
        </p>
      </div>
      <div>
        <p className="mb-1">
          <span className="font-bold">Bases de données :</span> MySQL, PostgreSQL, MongoDB.
        </p>
        <p className="mb-1">
          <span className="font-bold">Gestion de projets :</span> Méthodes agiles, Jira.
        </p>
        <p className="mb-1">
          <span className="font-bold">Conception :</span> Merise, UML.
        </p>
        <p className="mb-1">
          <span className="font-bold">Contrôle de version :</span> Git, GitHub, GitLab.
        </p>
        <p>
          <span className="font-bold">Design UX/UI :</span> Figma, Canva, Adobe XD.
        </p>
      </div>
    </div>
  );
};

export default TechnicalSkills;
