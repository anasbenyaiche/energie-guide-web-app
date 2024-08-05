// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Footer.css"; // Assuming you have a CSS file for styling
import "font-awesome/css/font-awesome.min.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="col norM-03 tabL-06 tabP-12 mobL-00 float-left">
          <div className="footer_widget footer-1">
            <div id="elm-313" className="elm">
              <p className="bodytext">
                <img
                  src="src\assets\logo-bottom.png"
                  alt=""
                  width="200"
                  height="100"
                  data-htmlarea-file-uid="235"
                  style={{}}
                />
              </p>
              <h3>Ministère de l'Industrie, des Mines et de l’Énergie</h3>
              <p className="bodytext">
                Immeuble Panorama, 40 avenue du Japon, Montplaisir, Tunis 1002 -
                Tunisie.
              </p>
              <p className="bodytext">Téléphone : (+216) 71 901 953</p>
              <p className="bodytext">Fax : (+216) 71 909 149</p>
              <p className="bodytext">
                E-mail :{" "}
                <a href="mailto:contact@energiemines.gov.tn">
                  contact(at)energiemines.gov.tn
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="footer_widget list-mc footer-21">
            <div id="elm-316" className="elm">
              <div className="row">
                <div className="col">
                  <h4 className="csc-firstHeader">Ministère</h4>
                  <ul className="csc-menu csc-menu-1">
                    <li>
                      <a
                        href="https://www.energiemines.gov.tn/fr/ministere/mot-de-bienvenue/"
                        title="Mot de Bienvenue"
                      >
                        Mot de Bienvenue
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.energiemines.gov.tn/fr/ministere/visions-missions/"
                        title="Visions &amp; Missions"
                      >
                        Visions &amp; Missions
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.energiemines.gov.tn/fr/ministere/attributions/"
                        title="Attributions"
                      >
                        Attributions
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.energiemines.gov.tn/fr/ministere/organigramme/"
                        title="Organigramme"
                      >
                        Organigramme
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="csc-menu csc-menu-1">
                    <li>
                      <a
                        href="https://www.energiemines.gov.tn/fr/ministere/entreprises-et-etablissements-sous-tutelle/"
                        title="Entreprises et Etablissements sous tutelle"
                      >
                        Entreprises et Etablissements sous tutelle
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.energiemines.gov.tn/fr/ministere/budget-du-ministere/"
                        title="Budget du Ministère"
                      >
                        Budget du Ministère
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.energiemines.gov.tn/fr/ministere/cooperation-internationale/"
                        title="Coopération internationale"
                      >
                        Coopération internationale
                      </a>
                    </li>
                    <h1 className="csc-firstHeader">
                      <a href="https://www.energiemines.gov.tn/fr/cadre-reglementaire/">
                        Cadre réglementaire
                      </a>
                    </h1>
                    <h1 className="csc-firstHeader">
                      <a href="http://data.industrie.gov.tn/" target="_blank">
                        Open Data
                      </a>
                    </h1>
                  </ul>
                </div>
              </div>
              {/* <div className="row">
        <div className="col">
          <h4 className="csc-firstHeader"></h4>
        </div>
      </div> */}
            </div>
          </div>
        </div>

        <div className="col norM-04 tabL-06 tabP-12 mobL-12 float-right">
          <div className="row">
            <div className="col norM-12 tabP-05 mobL-12">
              <div className="footer_widget footer-4">
                <div id="elm-320" className="elm">
                  <h2 className="csc-firstHeader">
                    Suivez<i>-nous</i>
                  </h2>
                  <ul>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="footer-bottom">
          <div className="col norM-05 mobL-00">
            <div className="cnt">
              <div id="elm-321" className="elm">
                <p className="bodytext">
                  2020©Ministère de l'Industrie, des Mines et de
                  l’Énergie.&nbsp;
                </p>
              </div>
            </div>
          </div>
          <div className="col norM-07 mobL-12">
            <div className="cnt">
              <div className="menu-top">
                <p>
                  <a
                    href="fr/tc/liens-utiles/"
                    title="Liens utiles"
                    className="no"
                  >
                    Liens utiles
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="fr/tc/publications/"
                    title="Publications"
                    className="no"
                  >
                    Publications
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="fr/open-gov/la-lutte-contre-la-corruption/"
                    title="Dénoncer une corruption"
                    className="no"
                  >
                    Dénoncer une corruption
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="fr/open-gov/acces-a-linformation/"
                    title="Accès à l'information"
                    className="no"
                  >
                    Accès à l'information
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="fr/tc/plan-du-site/"
                    title="Plan du site"
                    className="no"
                  >
                    Plan du site
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a href="fr/tc/contact/" title="Contact" className="no">
                    Contact
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
