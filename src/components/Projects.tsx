const Projects = () => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold">Careflow – Application Web</h4>
          <span className="font-bold whitespace-nowrap">Mars 2025</span>
        </div>
        <p className="mb-0.5">Développement d'une API REST permettant de :</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Gérer les utilisateurs et leurs rôles ainsi que les dossiers patients</li>
          <li>Planifier et gérer les rendez-vous avec prévention des conflits et rappels email</li>
        </ul>
        <p className="mt-1">
          <span className="font-bold">Technologies & outils utilisés :</span>
        </p>
        <p className="ml-5">Node.js, Express.js, MongoDB/Mongoose, JWT, Redis, Mocha/Chai</p>
      </div>

      <div>
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold">Réservez-Moi - Application Web</h4>
          <span className="font-bold whitespace-nowrap">Apr 2025</span>
        </div>
        <p className="mb-0.5">Développement d'un système permettant aux utilisateurs de :</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Réserver facilement des services dans plusieurs secteurs (ex : beauté, réparation, etc.)</li>
          <li>Consulter les disponibilités et gérer leurs réservations</li>
        </ul>
        <p className="mt-1">
          <span className="font-bold">Technologies & outils utilisés :</span>
        </p>
        <p className="ml-5">Laravel, MySQL, HTML, Tailwind CSS, JavaScript, UML, Jira, Git/GitHub</p>
      </div>
    </div>
  );
};

export default Projects;
