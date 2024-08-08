import "./Breadcrumb.css";

const Breadcrumb = () => {
  return (
    <div className="w-full text-white text-xs py-4 bg-[#0D335F]">
      <div className=" row">
        <div className="grid grid-cols-4">
          <div className="col-span-1"></div>
          <div className="col-span-3 text-white">
            Vous êtes ici : Bienvenue » Thèmes » Energies renouvelables » Publications
            » Guides digitales » Projets d’énergie renouvelable en Tunisie : Guide
            détaillé
          </div>
        </div>
      </div>


    </div>
  );
};

export default Breadcrumb;
