const modalInfo = [
  // formulaire
  {
    id: "info-net-vendeur",
    titre: "Net Vendeur",
    texte:
      "<p>Prix payé au vendeur du bien lors de l’acquisition. Les frais de notaire et d’agence ne doivent pas être inclus dans le net vendeur. <p>En fonction du régime fiscal d’exploitation du bien, il est possible de constater la perte de la valeur comptable de ce dernier liée à l’usure du temps, c'est l'amortissement. L’amortissement permet la répartition de la perte de valeur du bien pour chaque exercice, tout le long de la durée d’usage du bien.</p> <p>L’avantage est que la dotation aux amortissements est qu'elle équivaut à une charge dans le compte de résultat de l’exercice de l'activité locative. La dotation est déductible du résultat imposable et vient baisser le montant de l’impôt à payer par l’entreprise.</p>",
  },
  {
    id: "info-travaux",
    titre: "Travaux",
    texte:
      "<p>Travaux préliminaires à la mise en exploitation du bien (rénovation, agrandissement, ou encore changement d'usage). <p>En fonction du régime fiscal d’exploitation du bien, il est possible de constater la perte de la valeur comptable des travaux liée à l’usure du temps, c'est l'amortissement. L’amortissement permet la répartition de la perte de valeur des travaux pour chaque exercice, tout le long de la durée d’usage du bien.</p> <p>L’avantage est que la dotation aux amortissements est qu'elle équivaut à une charge dans le compte de résultat de l’exercice de l'activité locative. La dotation est déductible du résultat imposable et vient baisser le montant de l’impôt à payer par l’entreprise.</p>",
  },
  {
    id: "info-ammeublement",
    titre: "Ammeublement",
    texte:
      "<p>Dépenses engagées pour équiper le bien dans le cadre d’une location meublée. Une liste de meubles et d’équipements est prévue par la loi afin de pouvoir louer en meublé. Les dépenses d’ameublement peuvent être passées en charges (si inférieur à 500 €) ou en amortissements (sur une durée de 7 ans) ce qui permet également de réduire le revenu imposable. Retrouvez cette liste sur site <a href='https://www.pap.fr/locataire/vide-meuble-colocation/liste-des-meubles-obligatoires-pour-une-location-meublee/a18106' target='_blank' rel='noopener noreferrer'>pap.fr</a></p>",
  },
  {
    id: "info-notaire",
    titre: "Frais de notaire",
    texte:
      "<p>Lors d’une transaction immobilière, le notaire établit les actes et les authentifie (compromis de vente et acte de vente), rédige les contrats et accompagne ses clients tout au long de la procédure de vente immobilière. Lorsque le bien est neuf (première vente depuis la construction) les frais de notaires représentent environ 3% du net vendeur. Lorsqu’on achète un bien ancien, ces frais s’élèvent à environ 7,5% du net vendeur.</p> <p>Les taxes sur la transaction immobilière sont inclues dans les frais de notaire qui se charge de les reverser à l’Etat. En fonction du régime fiscal d’exploitation du bien, les frais de notaire sont amortissables et permettent donc de réduire le revenu imposable. Retrouver toutes les informations sur les frais de notaire sur le site <a href='https://www.pap.fr/acheteur/frais-notaire/les-frais-de-notaire/a1307' target='_blank'>pap.fr </a></p>",
  },
  {
    id: "info-agence",
    titre: "Frais d'agence",
    texte:
      "<p>Certaines acquisitions se font par le biais d’agences immobilières mandatées par un acquéreur pour rechercher un bien et jouer le rôle d’intermédiaire dans la transaction. Cette rémunération de l’agence est généralement à la charge de l’acquéreur mais peut également être à la charge du vendeur (ex : zone géographique avec peu d’acheteur et beaucoup de biens à vendre). En fonction du régime fiscal d’exploitation du bien, les frais d’agence seront considérés comme des charges déductibles du revenu imposable. En fonction du régime fiscal d’exploitation du bien, les frais d'agence sont amortissables et permettent donc de réduire le revenu imposable.</p>",
  },
  {
    id: "info-duree",
    titre: "Durée d'emprunt",
    texte:
      "<p>Durée du prêt immobilier. C’est l’un des facteurs déterminant le montant de la mensualité d’emprunt. Plus l’emprunt s’étalera sur une durée longue, plus le taux d’intérêt sera élevé. En revanche, augmenter la durée d’emprunt réduit le montant de la mensualité ce qui rend plus facile l'auto-financement de l'investissement par les loyers encaissés.</p>",
  },
  {
    id: "info-apport",
    titre: "Apport",
    texte:
      "<p>La somme d’argent apportée en cash par l’investisseur afin de financer une partie du projet. Le reste du projet est financé par la banque. En général, la banque exige que l’investisseur apporte au minimum une somme égale aux frais de notaires. En tant qu’investisseur, l’objectif est de faire financer la plus grande partie du projet par la banque.</p>",
  },
  {
    id: "info-interet",
    titre: "Taux d'intérêt",
    texte:
      "<p>Les intérêts d’emprunt sont l’un des modes de rémunération de la banque. Ils se matérialisent sous la forme du versement d’une somme mensuelle qui est inclue dans la mensualité. </p><p>Les intérêts d’emprunt sont calculés en fonction du taux d'intérêt du prêt et du capital restant dû à la banque. Au début des remboursements le capital restant dû est élevé, le montant des intérêts le sera également. A cause de ce mécanisme, un prêt immobilier coûte cher au début de son remboursement car la banque prélèvera une part plus importe de la mensualité pour se rémunérer plutôt que pour rembourser le capital emprunté.</p>",
  },
  {
    id: "info-assurance",
    titre: "Taux d'assurance",
    texte:
      "<p>Les frais d’assurance sont l’un des modes de rémunération de la banque. L'emprunteur verse chaque année une somme égale au taux d'assurance multiplier par le capital initialement emprunté. Il ne varie pas durant toute la durée de l’emprunt et les versements sont inclus dans la mensualité. Le taux d’assurance est déterminé par le profil de l’emprunteur (âge, fumeur ou non, statut professionnel …). Les frais d’assurance sont des charges déductibles permettant de réduire le revenu imposable.</p>",
  },
  {
    id: "info-loyer",
    titre: "Loyer mensuel",
    texte:
      "<p>C'est le(s) loyer(s) versé(s) par le locataire(s) du bien. Le revenu annuel est calculé en multipliant le loyer mensuel par le taux d’occupation. C’est sur cette base que sera calculé le revenu imposable.</p>",
  },
  {
    id: "info-locataire",
    titre: "Charges locataires",
    texte:
      "<p>Charges payées annuellement par le propriétaire pour les services de gardiennage, nettoyage ou/et autres. Ces charges sont récupérables auprès des locataires. De ce fait, elles ne font augmenter ni le revenu annuel, ni le revenu imposable. Enfin, il est interdit de les déduire du revenu imposable.</p> <p>Attention, lorsque le bien est exploité en location meublée, le seuil de revenu conditionnant la qualification de l’activité en professionnelle / non-professionnelle est de 23 000 € charges locataires comprises. Le site <a href='https://www.service-public.fr/particuliers/vosdroits/F947' target='_blank' rel='noopener noreferrer'>service-public.fr</a> dresse la liste des charges récupérables auprès du locataire</p>",
  },
  {
    id: "info-occupation",
    titre: "Taux d'occupation",
    texte:
      "<p>Estimation du nombre de mois durant lesquels le bien sera occupé à l’année. Dans les zones où la demande locative est forte, les périodes de vacances locatives seront faibles et vice versa. De plus, prévoir que la fréquence de rotation des locataires est plus élevée en location meublée qu’en location nue. Ceci peut entrainer des périodes de vacances locatives supplémentaires si le bien est loué en meublé.</p>",
  },
  {
    id: "info-fonciere",
    titre: "Taxe foncière",
    texte:
      "<p>Taxe annuelle s’appliquant à tout propriétaire d'un bien immobilier en France. Elle n'est pas récupérable sur le locataire mais c'est une charge déductible permettant de réduire le revenu imposable.</p>",
  },
  {
    id: "info-gestion",
    titre: "Gestion locative",
    texte:
      "<p>Frais de gestion du bien par une agence immobilière. Les frais de gestion locative ne peuvent être récupérés sur les locataires mais ils représentent des charges déductibles permettant de réduire le revenu imposable. Ces frais sont généralement compris entre 5% et 10% des loyers annuels. L’investisseur peut également choisir de gérer son bien lui-même pour augmenter le rendement de l'investissement.</p>",
  },
  {
    id: "info-charges",
    titre: "Charges courantes",
    texte:
      "<p>Provisions pour charges d’entretien et de rénovation du bien. Le montant de ces charges pourra varier chaque année. Il est recommandé de mettre de côté une somme fixe chaque année pour ne pas être à cours de liquidités le moment venu. Les charges courantes sont des charges déductibles permettant de réduire le revenu imposable.</p>",
  },
  {
    id: "info-pno",
    titre: "Assurrances PNO & GLI",
    texte:
      "<p>Assurance propriétaire non-occupant & garantie loyers impayés. Ces deux types d'assurances peuvent être prises indépendemment l'une de l'autre. Elles sont considérées commes des charges déductibles permettant de réduire le revenu imposable.</p><p>Assurance PNO (propriétaire non-occupant) : assurance permettant d'assurer le bien en cas de sinistre. Le détenteur d’un bien immobilier mis en location n’est, en principe, pas obligé de l’assurer, sauf dans le cadre d’une copropriété.</p><p>GLI (assurance loyés impatés) : assurance qui protège le propriétaire contre les impayés et les dégradations et qui prend en charge l'éventuelle action en justice à engager contre le locataire. Un nouveau dispositif de sécurisation des loyers impayés existe depuis le 20 janvier 2016 : VISALE (Visa pour le Logement et l'Emploi). Financé et géré par Action Logement (l'ex « 1% logement), Visale permet aux propriétaires qui choisissent comme locataire un salarié précaire ou un jeune de 30 ans au plus d'être remboursé des impayés de loyers. Visale est 100 % gratuit.</p>",
  },
  {
    id: "info-investisseur",
    titre: "Revenu(s) du foyer fiscal",
    texte:
      "<p>Lorsqu’un bien immobilier est détenu en direct (à la différence d’une détention via une société) les revenus fonciers viennent s’ajouter aux revenus d’activité(s) salariée(s) du/des investisseur(s). La somme des revenus sera taxée selon le barème de l’impôt sur le revenu.</p><p>La modélisation fiscale doit prendre en compte les autres revenus (d’activité salariée, locatifs ...) du/des investisseur(s) pour déterminer la rentabilité de l’investissement. Il faut donc renseigner à minima le salaire de chaque investisseur avant impôt sur le revenu. Sur la fiche de paie, la ligne à prendre en compte est : « Net à payer avant impôt sur le revenu ».</p><p>Si l’investissement est réalisé avec le conjoint, il est essentiel d’indiquer les revenus de chacun des investisseurs ainsi que le nombre de parts fiscales pour permettre la prise en compte le quotient familial dans le calcul de l’impôt sur les revenus locatifs. </p><p>Enfin, l’augmentation annuelle des revenus d’activité du/des investisseur(s) est un facteur déterminant l’évolution de la pression fiscale sur les revenus locatifs. Si les revenus d’activité augmentent rapidement au cours de la durée de détention du bien, les revenus fonciers seront imposés dans une tranche marginale supérieure. Ceci peut rendre un investissement déficitaire après plusieurs années de cash-flow positif.</p>",
  },
  {
    id: "info-partfisc",
    titre: "Parts Fiscales",
    texte:
      "<p>En France, l'impôt sur le revenu est calculé au niveau du foyer fiscal. Les invdividus composant le foyer fiscal sont appelées parts fiscales ou parts de quotien familial. Le nombre de parts fiscales est une notion clé pour le calcul de l’impôt sur le revenu car permet de bénéficier d'une réduction d'impôts.</p><p>Pour calculer le nombre de parts fiscales, il faut prendre en compte les représentants du foyer (généralement les parents qui octroient une part fiscal chacun) ainsi que les personnes à charge (enfants, personnes âgées ou invalides...) qui donnent droit à un certain nombre de parts supplémentaires selon un barème prévu par la loi (exemple : les 2 premiers enfants donnent droit à 0.5 part chacun et le 3ième enfant à 1 part supplémentaire).</p></p> Le site <a href='http://impotsurlerevenu.org/fonctionnement-de-l-impot/54-calcul-de-l-impot.php' target='_blank' rel='noopener noreferrer'>impotsurlerevenu.org</a> explique en détails la prise en compte des parts fiscales dans le calcul de l'impôt sur le revenu.</p>",
  },
  {
    id: "info-irl",
    titre: "Indice de référence des loyers",
    texte:
      "<p>L'inflation mesure l'évolution du prix des biens et services consommés par les ménages. L'IRL correspond à une moyenne de l'inflation sur les quatre derniers trimestres glissants. L’inflation servant de base de calcul à l’IRL, leur attribuer la même valeur est une approche acceptable pour représenter ce paramètre dans une modélisation. Ils doivent être nécessairement pris en compte afin d’effectuer une modélisation du revenu et des charges d'exploitation d'un bien immobilier sur plusieurs années.</p>",
  },
  // indicateurs
  {
    id: "info-projet",
    titre: "Coût du projet",
    texte:
      "<p>Coûts engagés pour l’acquisition et la mise en exploitation du bien. <p>Formule : Net vendeur + Travaux + Ameublement + Frais de Notaire + Frais d’agence.</p>",
  },
  {
    id: "info-emprunt",
    titre: "Emprunt",
    texte:
      "<p>Capital à emprunter pour financer le projet d'investissement locatif. Contracter un emprunt auprès d’une banque nécessite de monter un dossier prouvant la viabilité du projet. Une modélisation fiscale et comptable du projet d'investissement locatif durant toute la durée de l’emprunt est un argument de poids à l’heure de négocier un prêt immobilier avec une banque. <p>Formule : Coût du projet – Apport</p>",
  },
  {
    id: "info-mensualite",
    titre: "Mensualité",
    texte:
      "<p>Somme d'argent remboursée par l’emprunteur à la banque chaque mois. Elle est composée de capital, d’intérêts d’emprunt et de frais d’assurance. Le montant de la mensualité est généralement fixe. Parmi ses composantes, le coûts de l’assurance reste fixe sur toutes les mensualités tandis que les parts d'intérêts et de capital varieront au cours du temps.</p></p> <p>Les intérêts d’emprunt sont calculés en fonction du taux d'intérêt du prêt et du capital restant dû à la banque. Au début des remboursements le capital restant dû est élevé, le montant des intérêts le sera également. A cause de ce mécanisme, un prêt immobilier coûte cher au début de son remboursement car la banque prélèvera une part plus importe de la mensualité pour se rémunérer plutôt que pour rembourser le capital emprunté.</p> <p>Le tableau d'amortissement est le document rattaché à l'offre de prêt qui indique, sous forme d'échéancier, la somme liée par l'emprunteur à chaque échéance en développant la répartition du remboursement entre le capital, les intérêts, la prime relative aux assurances éventuelles et le capital restant dû après chaque mensualité. Il est établi pour les prêts personnels classiques et les crédits classiques.</p>",
  },
  {
    id: "info-revenu",
    titre: "Revenu annuel",
    texte:
      "<p>Chiffre d’affaire annuel généré par l’activité de location.</p><p>Formule : loyer mensuel * taux d’occupation.</p><p>Le taux d'occupation représente le nombre de mois au cours d'une année durant lesquels le bien sera loué. Le revenu annuel n’inclut pas les charges locataires car elles sont payés par ces derniers. De ce fait, elles ne font ni augmenter le chiffre d’affaire, ni le revenu imposable. Il est d'ailleurs interdit de réduire le revenu imposable avec les charges locataires.</p>",
  },
  {
    id: "info-rentabrute",
    titre: "Rendement brut",
    texte:
      "<p>Indicateur exprimant le revenu annuel en pourcentage du coût du projet.</p><p>Formule : revenu annuel / coût du projet * 100</p> <p>Cet indicateur ne prend en compte ni les charges financières, ni les charges d’exploitation, ni l’impôt sur le revenu ou les cotisations sociales dus au titre de l'activité locative. Ce premier indicateur permet d’évaluer de manière approximative l’attractivité d’un investissement locatif.</p>",
  },
  {
    id: "info-rentanet",
    titre: "Rendement net",
    texte:
      "<p>Indicateur exprimant la création de richesse annuelle moyenne (cash-flow avant impôts et actif remboursé) en pourcentage du coût du projet.</p> <p>Formule : (cash-flow avant impôt + valeur du bien) / cout du projet * 100. <ul><li>- Cash-flow avant impôts : revenu annuel - charges annuelles (financières et d'exploitation)</li><li>- Valeur du bien : (vendeur + travaux) / nombre année d’emprunt</li></ul></p> <p>Cet indicateur ne prend en compte ni l’imposition liée au régime fiscal d’exploitation du bien, ni la situation personnelle du/des investisseur(s), ni le taux d’inflation annuel. Ces paramètres permettent de calculer le rendement net d'impôt qui pourra être amené à varier d'une année sur l'autre. C’est pour cela qu’il est nécessaire d’effectuer une modélisation au pas annuel du rendement net d'impôt et ce, durant toute la durée de l’emprunt, ou du moins, la durée de détention prévue par l’investisseur.</p> ",
  },
  {
    id: "info-cashflow",
    titre: "Cash-flow brut",
    texte:
      "<p>Cash-flow annuel avant impôt généré par le bien. <p>Formule : revenu annuel - charges annuelles (financières et d'exploitation)</p><p>Il est important de comprendre qu’un cash-flow brut positif ne garantit pas un cash-flow net d’impôt positif. En effet, le revenu imposable sera composé du revenu annuel – (charges déductibles + amortissements). Si le montant de l’impôt à payer est supérieur au cash-flow généré durant l’année, le cash-flow net sera négatif et l’investisseur devra payer de sa poche la différence.</p>",
  },
];

export default modalInfo;
