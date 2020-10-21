// packages
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Finance from "financejs";

// components
import checkboxes from "./checkboxes";

// actions
import { postInputForm } from "../../actions/formData";

export const InputKpi = ({ postInputForm }) => {
  // init form state
  const [formData, setFormData] = useState({
    type: "",
    codePostal: "",
    netVendeur: 0,
    travaux: 0,
    ammeublement: 0,
    notaire: 0.075,
    agence: 0.05,
    duree: 20,
    apport: "",
    interet: 0.012,
    assurance: 0.001,
    loyer: 0,
    chargesLoc: 0,
    occupation: 11,
    fonciere: 0,
    gestion: 0,
    charges: 0,
    pno: 0,
    revInvest1: 0,
    augInvest1: 0.01,
    revInvest2: 0,
    augInvest2: 0.01,
    invCouple: true,
    partFisc: 1,
    sciIs: false,
    lmnpReel: false,
    lmnpMicro: false,
    lmpReel: false,
    lmpMicro: false,
    nueReel: false,
    nueMicro: false,
    irl: 0.01,
  });

  const [modal, setModal] = useState(false);

  // destructure state
  const {
    netVendeur,
    travaux,
    ammeublement,
    notaire,
    agence,
    duree,
    apport,
    interet,
    assurance,
    loyer,
    chargesLoc,
    occupation,
    fonciere,
    gestion,
    charges,
    pno,
    revInvest1,
    augInvest1,
    revInvest2,
    augInvest2,
    invCouple,
    partFisc,
    irl,
    sciIs,
    lmnpReel,
    lmnpMicro,
    lmpReel,
    lmpMicro,
    nueReel,
    nueMicro,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeRegime = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      postInputForm(formData);
    } else {
      console.log("error");
      // setAlert("Start time can't be superieur to end time", "red");
    }
    setModal(true);
  };

  // side navigation -----------------------------------------------------------------------------------------
  const scrollTo = (ele) => {
    // ele is the section being scrolled to
    ele.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const headerRef = useRef(null);
  const projetRef = useRef(null);
  const financementRef = useRef(null);
  const revenuRef = useRef(null);
  const chargesRef = useRef(null);
  const foyerRef = useRef(null);
  const regimeRef = useRef(null);

  // options -----------------------------------------------------------------------------------------------

  const optionsAgence = []; // frais d'agence
  for (let i = 0; i < 11; i++) {
    optionsAgence.push(i);
  }

  const optionsOccupation = []; // options taux occupation
  for (let i = 1; i <= 12; i += 0.5) {
    optionsOccupation.push(i);
  }

  const optionsAugmentation = [];
  for (let i = 0; i < 21; i++) {
    optionsAugmentation.push(i);
  }

  const optionsPartFisc = [];
  for (let i = 1; i <= 5; i += 0.25) {
    optionsPartFisc.push(i);
  }

  // calcul de indicateurs ---------------------------------------------------------------------------------
  const finance = new Finance();

  const coutProjet =
    parseInt(netVendeur) +
    parseInt(travaux) +
    parseInt(ammeublement) +
    parseInt(netVendeur) * notaire +
    parseInt(netVendeur) * agence;

  const emprunt = parseInt(coutProjet) - parseInt(apport);

  const mensualite =
    finance.AM(emprunt, interet * 100, parseInt(duree) * 12, 1) +
    (emprunt * assurance) / 12;

  const revAnnuel = parseInt(loyer) * parseInt(occupation);

  const rendementBrut =
    Math.round(
      ((parseInt(revAnnuel) / parseInt(coutProjet)) * 100 + Number.EPSILON) *
        100
    ) / 100;

  const cashFlowAnnuel =
    revAnnuel -
    (mensualite * 12 +
      parseInt(fonciere) +
      parseInt(charges) +
      parseInt(gestion) +
      parseInt(pno));

  const valeurFinale = parseInt(netVendeur) + parseInt(travaux);

  const rendementNet =
    Math.round(
      (((cashFlowAnnuel + valeurFinale / duree) / coutProjet) * 100 +
        Number.EPSILON) *
        100
    ) / 100;

  const sepSpace = (value) => {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // display / hide blocks
  const netVendeurCheck = parseInt(netVendeur) !== 0;
  const apportCheck = apport !== "";
  const loyerCheck = parseInt(loyer) !== 0;
  const chargesCheck =
    parseInt(charges) !== 0 ||
    parseInt(fonciere) !== 0 ||
    parseInt(gestion) !== 0 ||
    parseInt(pno) !== 0;
  const foyerCheck = parseInt(revInvest1) !== 0;
  const regimeCheck =
    sciIs !== false ||
    lmnpReel !== false ||
    lmnpMicro !== false ||
    lmpReel !== false ||
    lmpMicro !== false ||
    nueReel !== false ||
    nueMicro !== false;
  const formCheck =
    netVendeurCheck &&
    apportCheck &&
    loyerCheck &&
    chargesCheck &&
    foyerCheck &&
    regimeCheck;

  return (
    <div>
      <div className={modal ? "email-modal" : "modal-none"}>
        <div className='modal-input'>
          <h4>
            Simulimo est une solution gratuite pour modéliser la rentabilité
            d'investissements locatifs. Actuellement en construction, nous
            mettrons rapidement en lignes les fonctionnalités suivantes :
          </h4>
          <ul>
            <li>
              <i className='far fa-hand-point-right fa-2x'></i>
              <p>
                La fiscalité sur les revenus d'exploitation (loyers) modélisée
                selon les différents régimes fiscaux sélectionnés ainsi que tous
                les paramètres renseignés décrivant votre investissement.
              </p>
            </li>
            <li>
              <i className='far fa-hand-point-right fa-2x'></i>
              <p>
                La fiscalité lors de la revente modélisée selon le régime
                d'exploitation choisi, de l'année de revente ainsi que tous les
                paramètres renseignés décrivant votre investissement.
              </p>
            </li>
          </ul>
          <h4>
            Restez informé(e) lors de la mise en lignes de ces nouvelles
            fonctionnalités :
          </h4>
          <div className='container-email'>
            <input type='email' placeholder='Saisir Email' name='email' />
            <button>Valider</button>
            <button
              onClick={() => setModal(false)}
              style={{ backgroundColor: "#a8a8a8" }}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
      <div className='flex-row' ref={headerRef}>
        {/* indicateur */}
        <div className='side-column ml-20 mr-20 mt-50'>
          <h3>
            <i className='fas fa-temperature-high header-i'></i>
            &nbsp;&nbsp;Indicateurs
          </h3>
          <div className='side-column-box jc-fc mt-10 pdg-20'>
            <div className='flex-column mb-10'>
              <h4>
                {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
                Coût du projet :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0
                  ? "-"
                  : sepSpace(coutProjet).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
                Emprunt :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 || apport === ""
                  ? "-"
                  : sepSpace(emprunt).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
                Mensualité :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 || apport === ""
                  ? "-"
                  : sepSpace(mensualite).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
                Revenu annuel :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 ||
                apport === "" ||
                parseInt(loyer) === 0
                  ? "-"
                  : sepSpace(revAnnuel).toString() + " €"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
                Rendement brut :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 ||
                apport === "" ||
                parseInt(loyer) === 0
                  ? "-"
                  : rendementBrut.toString() + " %"}
              </h4>
            </div>
            <div className='flex-column mb-10'>
              <h4>
                {/* <i className='fas fa-landmark fa-xs kpi-i'></i>&nbsp; */}
                Rendement net :
              </h4>
              <h4 className='bold color-blue'>
                {parseInt(netVendeur) === 0 ||
                apport === "" ||
                parseInt(loyer) === 0
                  ? //   parseInt(charges) !== 0 ||
                    // parseInt(gestion) !== 0 ||
                    // parseInt(fonciere) !== 0 ||
                    // parseInt(pno) !== 0
                    "-"
                  : rendementNet.toString() + " %"}
              </h4>
            </div>
          </div>
        </div>
        {/* forms */}
        <div style={{ width: "100%" }}>
          {/*****************************************************************************************/
          /* Projet */}
          <section id='Projet' ref={projetRef}>
            <h3 className=' form-header mt-20'>
              <i className='fas fa-landmark header-i'></i>
              &nbsp;&nbsp;Description du projet
            </h3>
            <div className='flex-row jc-se mt-10'>
              <div className='flex-row jc-sb ai-fc form-group mr-10'>
                <label>Type de bien : </label>
                <select
                  type='select'
                  name='type'
                  onChange={onChange}
                  className='input-box fs-12'
                  defaultValue='Selection...'
                >
                  <option>Selection...</option>
                  <option value='appartement'>Appartement</option>
                  <option value='immeuble'>Immeuble</option>
                  <option value='maison'>Maison</option>
                  <option value='parking'>Parking</option>
                  <option value='commerce'>Local Commercial</option>
                </select>
              </div>

              <div className='flex-row jc-sb ai-fc form-group ml-10'>
                <label>Code postal : </label>
                <input
                  type='number'
                  max='99999'
                  min='1'
                  name='codePostal'
                  onChange={onChange}
                  className='input-box fs-12'
                  placeholder='Saisir Code Postal'
                />
              </div>
            </div>

            <div className='slidecontainer form-group mt-20'>
              <label>Net vendeur : {sepSpace(netVendeur)} €</label>
              <input
                type='range'
                name='netVendeur'
                value={netVendeur}
                onChange={onChange}
                min='0'
                max='1000000'
                step='500'
                className='slider mt-5'
              />
            </div>

            <div className='slidecontainer form-group mt-20'>
              <label>Travaux : {sepSpace(travaux)} €</label>
              <input
                type='range'
                name='travaux'
                value={travaux}
                onChange={onChange}
                min='0'
                max='300000'
                step='200'
                className='slider mt-5'
              />
            </div>

            <div className='slidecontainer form-group mt-20'>
              <label>Ammeublement : {sepSpace(ammeublement)} €</label>
              <input
                type='range'
                name='ammeublement'
                value={ammeublement}
                onChange={onChange}
                min='0'
                max='100000'
                step='100'
                className='slider mt-5'
              />
            </div>

            <div className='flex-row jc-se ai-fc mt-10 mt-20'>
              <div className='flex-row jc-sb ai-fc form-group mr-10'>
                <label>
                  Frais de notaire :
                  <br />
                  {sepSpace(netVendeur * notaire)} €
                </label>
                <select
                  type='select'
                  name='notaire'
                  value={notaire}
                  onChange={onChange}
                  className='input-box fs-12'
                >
                  <option value='0.075'>Ancien (7.5%)</option>
                  <option value='0.03'>Neuf (3%)</option>
                </select>
              </div>

              <div className='flex-row jc-sb ai-fc form-group ml-10'>
                <label>
                  Frais d'agence :
                  <br />
                  {sepSpace(netVendeur * agence)} €
                </label>
                <select
                  type='select'
                  name='agence'
                  value={agence}
                  onChange={onChange}
                  className='input-box'
                >
                  {optionsAgence.map((option) => (
                    <option key={option} value={option / 100}>
                      {option}%
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/*****************************************************************************************/
          /* Financement */}
          <section
            id='Financement'
            ref={financementRef}
            // style={{ display: !netVendeurCheck && "none" }}
          >
            <h3 className='form-header mt-20'>
              <i className='fas fa-piggy-bank header-i'></i>
              &nbsp;&nbsp;Financement du projet
            </h3>
            <div className='flex-row jc-se mt-10'>
              <div className='slidecontainer form-group mr-10'>
                <label>Durée d'emprunt : {duree} ans</label>
                <input
                  type='range'
                  name='duree'
                  value={duree}
                  onChange={onChange}
                  min='0'
                  max='30'
                  className='slider mt-5'
                />
              </div>

              <div className='flex-row jc-sb ai-fc form-group ml-10'>
                <label>Apport (€) : </label>
                <input
                  type='number'
                  placeholder='Saisir Apport'
                  name='apport'
                  value={apport}
                  onChange={onChange}
                  className='input-box fs-12'
                />
              </div>
            </div>

            <div className='flex-row jc-se mt-20'>
              <div className='slidecontainer form-group mr-10'>
                <label>
                  Taux d'intérêt :{" "}
                  {Math.round((interet * 100 + Number.EPSILON) * 100) / 100} %
                </label>
                <input
                  type='range'
                  name='interet'
                  value={interet}
                  onChange={onChange}
                  min='0'
                  max='0.04'
                  step='0.001'
                  className='slider mt-5'
                />
              </div>

              <div className='slidecontainer form-group ml-10'>
                <label>
                  Taux d'assurance :{" "}
                  {Math.round((assurance * 100 + Number.EPSILON) * 100) / 100} %
                </label>
                <input
                  type='range'
                  name='assurance'
                  value={assurance}
                  onChange={onChange}
                  min='0'
                  max='0.01'
                  step='0.0001'
                  className='slider fs-12'
                />
              </div>
            </div>
          </section>

          {/*****************************************************************************************/
          /* Revenu */}
          <section
            id='Revenu'
            ref={revenuRef}
            // style={{
            //   display: !apportCheck && "none",
            // }}
          >
            <h3 className='form-header mt-20'>
              <i className='fas fa-hand-holding-usd header-i'></i>
              &nbsp;&nbsp;Revenu annuel d'exploitation
            </h3>
            <div className='flex-row jc-se mt-10'>
              <div className='slidecontainer form-group'>
                <label>Loyer mensuel : {sepSpace(loyer)} €</label>
                <input
                  type='range'
                  name='loyer'
                  value={loyer}
                  onChange={onChange}
                  min='0'
                  max='10000'
                  step='20'
                  className='slider mt-5'
                />
              </div>
            </div>

            <div className='flex-row jc-se mt-20'>
              <div className='slidecontainer form-group mr-10'>
                <label>Charges locataires : {sepSpace(chargesLoc)} €</label>
                <input
                  type='range'
                  name='chargesLoc'
                  value={chargesLoc}
                  onChange={onChange}
                  min='0'
                  max='10000'
                  step='20'
                  className='slider mt-5'
                />
              </div>

              <div className='flex-row jc-sb ai-fc form-group ml-10'>
                <label>Taux d'occupation : </label>
                <select
                  type='select'
                  name='occupation'
                  value={occupation}
                  onChange={onChange}
                  className='input-box fs-12'
                >
                  {optionsOccupation.map((option) => (
                    <option key={option} value={option}>
                      {option} mois
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/*****************************************************************************************/
          /* Charges */}
          <section
            id='Charges'
            ref={chargesRef}
            // style={{
            //   display: !loyerCheck && "none",
            // }}
          >
            <h3 className='form-header mt-20'>
              <i className='fas fa-weight-hanging header-i'></i>
              &nbsp;&nbsp;Charges annuelles d'exploitation
            </h3>
            <div className='flex-row jc-se mt-10'>
              <div className='slidecontainer form-group mr-10'>
                <label>Taxe foncière : {sepSpace(fonciere)} €</label>
                <input
                  type='range'
                  name='fonciere'
                  value={fonciere}
                  onChange={onChange}
                  min='0'
                  max='10000'
                  step='20'
                  className='slider mt-5'
                />
              </div>

              <div className='slidecontainer form-group ml-10'>
                <label>Gestion locative : {sepSpace(gestion)} €</label>
                <input
                  type='range'
                  name='gestion'
                  value={gestion}
                  onChange={onChange}
                  min='0'
                  max='10000'
                  step='20'
                  className='slider mt-5'
                />
              </div>
            </div>

            <div className='flex-row jc-se mt-20'>
              <div className='slidecontainer form-group mr-10'>
                <label>Charges courantes : {sepSpace(charges)} €</label>
                <input
                  type='range'
                  name='charges'
                  value={charges}
                  onChange={onChange}
                  min='0'
                  max='10000'
                  step='20'
                  className='slider mt-5'
                />
              </div>

              <div className='slidecontainer form-group ml-10'>
                <label>Assurance PNO : {sepSpace(pno)} €</label>
                <input
                  type='range'
                  name='pno'
                  value={pno}
                  onChange={onChange}
                  min='0'
                  max='5000'
                  step='10'
                  className='slider mt-5'
                />
              </div>
            </div>
          </section>

          {/*****************************************************************************************/
          /* Foyer */}
          <section
            id='Foyer'
            ref={foyerRef}
            // style={{
            //   display: !chargesCheck && "none",
            // }}
          >
            <h3 className='form-header mt-20'>
              <i className='fas fa-house-user header-i'></i>&nbsp;&nbsp;Foyer
              fiscal
            </h3>
            <div className='form-group mt-10'>
              <h3>Investisseur N° 1 :</h3>
              <div className='flex-row ai-fc mt-10'>
                <div className='slidecontainer mr-5'>
                  <div className='flex-row jc-sb'>
                    <label>
                      Revenu net avant impôts : {sepSpace(revInvest1)} €
                    </label>
                    <label>Augmentation annuelle moyenne :</label>
                  </div>
                  <div>
                    <input
                      type='range'
                      name='revInvest1'
                      value={revInvest1}
                      onChange={onChange}
                      min='0'
                      max='100000'
                      className='slider mt-5'
                    />
                  </div>
                </div>
                <div className='w-15 ml-10'>
                  <select
                    type='select'
                    name='augInvest1'
                    value={augInvest1}
                    onChange={onChange}
                    className='input-box-2 fs-12'
                  >
                    {optionsAugmentation.map((option) => (
                      <option key={option} value={option / 100}>
                        {option}%
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='form-group mt-20'>
              <div className='flex-row jc-sb'>
                <h3>Investisseur N° 2 :</h3>
                {parseInt(revInvest2) !== 0 ? (
                  <div className='flex-row  mt-5'>
                    <label className='mr-10 bold'>
                      Investisseurs membres du même foyer fiscal
                    </label>
                    <input
                      type='checkbox'
                      name='invCouple'
                      defaultChecked={invCouple}
                      onChange={onChangeRegime}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className='flex-row ai-fc mt-10'>
                <div className='slidecontainer mr-5'>
                  <div className='flex-row jc-sb'>
                    <label>
                      Revenu net avant impôts : {sepSpace(revInvest2)} €
                    </label>
                    <label>Augmentation annuelle moyenne :</label>
                  </div>
                  <div>
                    <input
                      type='range'
                      name='revInvest2'
                      value={revInvest2}
                      onChange={onChange}
                      min='0'
                      max='100000'
                      className='slider mt-5'
                    />
                  </div>
                </div>
                <div className='w-15 ml-10'>
                  <select
                    type='select'
                    name='augInvest2'
                    value={augInvest2}
                    onChange={onChange}
                    className='input-box-2 fs-12'
                  >
                    {optionsAugmentation.map((option) => (
                      <option key={option} value={option / 100}>
                        {option}%
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* {invCouple ? ( */}
            <div className='form-group mt-20'>
              <div className='flex-row ai-fc mt-10'>
                <div className='flex-column w-35 mr-20'>
                  <label>Part(s) Fiscale(s)</label>
                  <select
                    type='select'
                    name='partFisc'
                    onChange={onChange}
                    className='input-box-2 fs-12'
                    disabled={!invCouple}
                  >
                    {optionsPartFisc.map((optionPartFisc) => (
                      <option key={optionPartFisc}>{optionPartFisc}</option>
                    ))}
                  </select>
                </div>
                <p className='fs-12 w-75'>
                  En France, l'impôt sur le revenu est calculé au niveau du
                  foyer fiscal. Les invdividus composant le foyer fiscal sont
                  appelées parts fiscales. Le nombre de parts fiscales est une
                  notion clé pour le calcul de l’impôt sur le revenu lorsque le
                  foyer fiscal est composé de plusieurs individus.
                </p>
              </div>
              {!invCouple ? (
                <p className='fs-12 orange'>
                  <i class='fas fa-exclamation-circle mr-5'></i>
                  Les parts fiscales ne seront pas prises en compte si les
                  investisseurs ne sont pas rattachés au même foyer fiscal.
                </p>
              ) : (
                ""
              )}
            </div>
            {/* ) : (
              ""
            )} */}
          </section>

          {/*****************************************************************************************/
          /* Régime */}
          <section
            id='Regime'
            ref={regimeRef}
            // style={{
            //   display: !foyerCheck && "none",
            // }}
          >
            <h3 className='form-header mt-20'>
              <i className='fas fa-balance-scale header-i'></i>
              &nbsp;&nbsp;Régime fiscal
            </h3>
            <div className='flex-column jc-sb ai-fc form-group mt-10'>
              <label>
                Le régime fiscal est déterminé par le mode de détention (en
                direct ou via une société) et d'exploitation (location vide ou
                meublée) du bien, le revenu généré par le bien et les revenus de
                l’investisseurs ou encore la composition de son foyer fiscal.
                Certains régimes fiscaux dépendent du seul choix de
                l’investisseur, d’autre lui sont imposés par la situation de son
                foyer fiscal.
              </label>
              <div className='flex-row jc-fs mt-10 mb-10 flex-wrap bold fs-12'>
                {checkboxes.map((item) => (
                  <div className='flex-row ai-fc mr-20' key={item.key}>
                    <input
                      className='mr-5'
                      type='checkbox'
                      name={item.name}
                      onChange={onChangeRegime}
                    />
                    <label>{item.label}</label>
                  </div>
                ))}
              </div>
              <small>
                Une modélisation sera calculée pour chaque régime fiscal
                sélectionné
              </small>
            </div>

            <div className='flex-row jc-se mt-20'>
              <div className='slidecontainer form-group flex-row jc-sb ai-fc'>
                <p className='w-55 fs-12 mr-10'>
                  L'indice de référence des loyers (IRL) calculé par l'INSEE est
                  le taux applicable pour augmenter le loyer d'un bail d'une
                  année sur l'autre.
                </p>
                <div className='w-45 ml-10'>
                  <label>
                    Indice de référence des loyers :{" "}
                    {Math.round((irl * 100 + Number.EPSILON) * 100) / 100} %
                  </label>
                  <input
                    type='range'
                    name='irl'
                    value={irl}
                    onChange={onChange}
                    min='0'
                    max='0.03'
                    step='0.001'
                    className='slider mt-5'
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/*****************************************************************************************/
        /* SideNav */}
        <nav className='side-column-nav mr-20 ml-20 mt-50'>
          <h3>
            <i className='fas fa-directions header-i'></i>&nbsp;&nbsp;Navigation
          </h3>
          <div className='side-column-box-nav flex-column mt-10 flex-column jc-se ai-fc'>
            <button
              type='button'
              className='nav-link side-nav-text radius-top border-bottom'
              onClick={() => {
                scrollTo(projetRef.current);
              }}
              style={{
                backgroundColor: netVendeurCheck && "#016fc9",
                color: netVendeurCheck && "#fff",
              }}
            >
              {!netVendeurCheck ? (
                <div className='flex-row jc-fc ai-fc'>
                  <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
                  Projet
                </div>
              ) : (
                <div className='flex-row jc-fc ai-fc'>
                  Projet&nbsp;&nbsp;<i className='far fa-check-circle'></i>
                </div>
              )}
            </button>
            <button
              type='button'
              className='nav-link side-nav-text border-bottom'
              onClick={() => {
                scrollTo(financementRef.current);
              }}
              style={{
                backgroundColor: apportCheck && "#016fc9",
                color: apportCheck ? "#fff" : "#333",
              }}
            >
              {!apportCheck ? (
                <div className='flex-row jc-fc ai-fc'>
                  <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
                  Financement
                </div>
              ) : (
                <div className='flex-row jc-fc ai-fc'>
                  Financement&nbsp;&nbsp;<i className='far fa-check-circle'></i>
                </div>
              )}{" "}
            </button>
            <button
              type='button'
              className='nav-link side-nav-text border-bottom'
              onClick={() => {
                scrollTo(revenuRef.current);
              }}
              style={{
                backgroundColor: loyerCheck && "#016fc9",
                color: loyerCheck && "#fff",
              }}
            >
              {!loyerCheck ? (
                <div className='flex-row jc-fc ai-fc'>
                  <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
                  Revenu
                </div>
              ) : (
                <div className='flex-row jc-fc ai-fc'>
                  Revenu&nbsp;&nbsp;<i className='far fa-check-circle'></i>
                </div>
              )}{" "}
            </button>
            <button
              type='button'
              className='nav-link side-nav-text border-bottom'
              onClick={() => {
                scrollTo(chargesRef.current);
              }}
              style={{
                backgroundColor: chargesCheck && "#016fc9",
                color: chargesCheck && "#fff",
              }}
            >
              {!chargesCheck ? (
                <div className='flex-row jc-fc ai-fc'>
                  <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
                  Charges
                </div>
              ) : (
                <div className='flex-row jc-fc ai-fc'>
                  Charges&nbsp;&nbsp;<i className='far fa-check-circle'></i>
                </div>
              )}{" "}
            </button>
            <button
              type='button'
              className='nav-link side-nav-text border-bottom'
              onClick={() => {
                scrollTo(foyerRef.current);
              }}
              style={{
                backgroundColor: foyerCheck && "#016fc9",
                color: foyerCheck && "#fff",
              }}
            >
              {!foyerCheck ? (
                <div className='flex-row jc-fc ai-fc'>
                  <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
                  Foyer
                </div>
              ) : (
                <div className='flex-row jc-fc ai-fc'>
                  Foyer&nbsp;&nbsp;<i className='far fa-check-circle'></i>
                </div>
              )}{" "}
            </button>
            <button
              type='button'
              className='nav-link side-nav-text radius-bottom'
              onClick={() => {
                scrollTo(regimeRef.current);
              }}
              style={{
                backgroundColor: regimeCheck && "#016fc9",
                color: regimeCheck && "#fff",
              }}
            >
              {!regimeCheck ? (
                <div className='flex-row jc-fc ai-fc'>
                  <i className='far fa-times-circle'>&nbsp;&nbsp;</i>
                  Régime
                </div>
              ) : (
                <div className='flex-row jc-fc ai-fc'>
                  Régime&nbsp;&nbsp;<i className='far fa-check-circle'></i>
                </div>
              )}{" "}
            </button>
          </div>
          <button
            type='submit'
            className='button-model'
            onClick={onSubmit}
            disabled={!formCheck}
            style={{
              backgroundColor: !formCheck && "#a8a8a8",
              color: !formCheck && "#dfe3da",
              cursor: !formCheck && "not-allowed",
            }}
          >
            Modélisation Fiscale &nbsp;&nbsp;
            <span
              style={{
                display: !formCheck && "none",
              }}
            >
              <i className='fas fa-forward'></i>
            </span>
          </button>
        </nav>
      </div>
      {/* Footer */}
      <div className='footer'>
        <h4>© 2020 ACH. All rights reserved</h4>
        <div className='footer-email'>
          <h4>Être informé(e) des nouvelles fonctionnalités :</h4>
          <input type='email' placeholder='Saisir Email' name='email' />
          <button>Valider</button>
        </div>
      </div>
    </div>
  );
};

// declare/define the type of props
InputKpi.propTypes = {
  postInputForm: PropTypes.func.isRequired,
};

export default connect(null, { postInputForm })(InputKpi);
