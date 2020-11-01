const modalInfo = [
  // formulaire
  {
    id: "info-net-vendeur",
    titre: "Net Vendeur",
    texte:
      "Prix payé au vendeur du bien lors de l’acquisition. Les frais de notaire et d’agence ne doivent pas être inclus dans le net vendeur. En fonction du régime fiscal d’exploitation du bien, ce dernier peut être amorti afin de réduire le revenu imposable. La valeur du bien à considérer pour l’amortissement (sur une durée de 25 ans) est le net vendeur. Si le projet immobilier inclut des travaux d’agrandissement, reconstruction ou d’amélioration du bien, la valeur de ces travaux devra être ajoutée au Net Vendeur afin de pouvoir les passer en amortissement lorsque le régime fiscal le permet.",
  },
  {
    id: "info-travaux",
    titre: "Travaux",
    texte:
      "Travaux de rénovation permettant de maintenir, remettre le bien en état d’exploitation. En fonction du régime fiscal d’exploitation du bien, les travaux de rénovation peuvent être passés en charges déductibles ou en amortissement afin de réduire le revenu imposable. Les travaux d’agrandissement, reconstruction ou d’amélioration du bien ne peuvent pas être passés en charges déductibles, la valeur de ces travaux devra être ajoutée au Net Vendeur afin de pouvoir les passer en amortissement (sur une durée de 25 ans) lorsque le régime fiscal le permet.",
  },
  {
    id: "info-ammeublement",
    titre: "Ammeublement",
    texte:
      "Dépenses engagées pour équiper le bien dans le cadre d’une location meublée. Une liste de meubles, d’équipements et d’objets est prévue par la loi afin de pouvoir louer en meublé. Les dépenses d’ameublement peuvent être passées en charges (si inférieur à 500 €) ou en amortissements (sur une durée de 7 ans) afin de réduire le revenu imposable. Retrouvez cette liste sur site pap.fr : https://www.pap.fr/locataire/vide-meuble-colocation/liste-des-meubles-obligatoires-pour-une-location-meublee/a18106.",
  },
  {
    id: "info-notaire",
    titre: "Frais de notaire",
    texte:
      "Lors d’une transaction immobilière, le notaire établit les actes et les authentifie (compromis de vente et acte de vente), rédige les contrats et accompagne ses clients tout au long de la procédure de vente immobilière. Lorsque le bien est neuf (première vente depuis la construction) les frais de notaires représentent environ 3% du net vendeur. Lorsqu’on achète un bien ancien, ces frais s’élèvent à environ 7,5% du net vendeur. Les taxes sur la transaction immobilière sont inclues dans les frais de notaire qui se charge de les reverser à l’Etat. En fonction du régime fiscal d’exploitation du bien, les frais de notaire peuvent être passés en charges déductibles ou en amortissements (sur une durée de 25 ans) afin de réduire le revenu imposable. Retrouver toutes les informations sur les frais de notaire sur le site pap.fr : https://www.pap.fr/acheteur/frais-notaire/les-frais-de-notaire/a1307",
  },
  {
    id: "info-agence",
    titre: "Frais d'agence",
    texte:
      "Certaines acquisitions se font par le biais d’agences immobilières mandatées par un acquéreur pour rechercher un bien et jouer le rôle d’intermédiaire dans la transaction. Cette rémunération de l’agence est généralement à la charge de l’acquéreur mais peut également être à la charge du vendeur (ex : zone géographique avec peu d’acheteur et beaucoup de biens à vendre). En fonction du régime fiscal d’exploitation du bien, les frais d’agence seront considérés comme des charges déductibles du revenu imposable. En fonction du régime fiscal d’exploitation du bien, les frais d’agence peuvent être passés en charges déductibles ou en amortissements (sur une durée de 25 ans) afin de réduire le revenu imposable.",
  },
  {
    id: "info-duree",
    titre: "Durée d'emprunt",
    texte:
      "Durée du prêt immobilier. C’est l’un des facteurs déterminant le montant de la mensualité d’emprunt. Plus l’emprunt s’étalera sur une durée longue, plus le taux d’intérêt sera élevé. Cependant, augmenter la durée d’emprunt permet de faire réduire le montant global de la mensualité afin de réaliser un investissement auto-financé par les loyers.",
  },
  {
    id: "info-apport",
    titre: "Apport",
    texte:
      "La somme d’argent apportée en cash par l’investisseur afin de financer le projet. Le reste du projet est financé par la banque. En général, la banque exige que l’investisseur apporte au minimum une somme égale aux frais de notaires. En tant qu’investisseur, l’objectif est de faire financer la plus grande partie du projet par la banque tant que les loyers couvrent le montant de la mensualité.",
  },
  {
    id: "info-interet",
    titre: "Taux d'intérêt",
    texte:
      "Les intérêts d’emprunt sont l’un des modes de rémunération de la banque. Ils se matérialisent sont la forme du versement d’une somme mensuelle qui est inclue dans la mensualité. Etant donné que le capital restant dû diminue après le paiement de chaque mensualité, le montant des intérêts à rembourser diminue également. Les intérêts payés à la banque sont des charges déductibles permettant de réduire le revenu imposable. Ce taux est l’un des facteurs déterminant le montant de la mensualité.",
  },
  {
    id: "info-assurance",
    titre: "Taux d'assurance",
    texte:
      "Les frais d’assurance sont l’un des modes de rémunération de la banque. Ils représentent un pourcentage du capital initial emprunté. Il ne varie donc pas durant toute la durée de l’emprunt. Le taux d’assurance est déterminé par le profil de l’emprunteur (âge, fumeur ou non, statut professionnel …). Les frais d’assurance sont des charges déductibles permettant de réduire le revenu imposable. Ce taux est l’un des facteurs déterminant le montant de la mensualité.",
  },
  {
    id: "info-loyer",
    titre: "Loyer mensuel",
    texte:
      "Le revenu mensuel espéré. Le chiffre d’affaire annuel est calculé en multipliant le loyer mensuel par le taux d’occupation. C’est sur cette base que sera calculé le revenu imposable.",
  },
  {
    id: "info-locataire",
    titre: "Charges locataires",
    texte:
      "Charges payées annuellement par le propriétaire pour les services de gardiennage, nettoyage ou/et autres. Ces charges sont récupérables auprès des locataires. De ce fait, elles ne font ni augmenter le chiffre d’affaire, ni le revenu imposable et ne sont pas déductibles du revenu imposable. Cependant, lorsque le bien est exploité en location meublée, le seuil de revenu conditionnant la qualification de l’activité en professionnelle / non-professionnelle est de 23 000 € charges locataires comprises. Le site service-public.fr dresse la liste des charges récupérables auprès du locataire : https://www.service-public.fr/particuliers/vosdroits/F947",
  },
  {
    id: "info-occupation",
    titre: "Taux d'occupation",
    texte:
      "Estimation du nombre de mois durant lesquels le bien sera occupé à l’année. Dans les zones où la demande locative est forte, les périodes de vacances locatives seront faibles et vice versa. De plus, prévoir que la fréquence de rotation des locataires est plus élevée en meublé qu’en location nue ce qui peut entrainer des périodes de vacances locatives supplémentaires si le bien est loué en meublé.",
  },
  {
    id: "info-fonciere",
    titre: "Taxe foncière",
    texte:
      "Taxe annuelle s’appliquant à tout détenteur de bien immobilier en France. La taxe foncière est une charge déductible permettant de réduire le revenu imposable.",
  },
  {
    id: "info-gestion",
    titre: "Gestion locative",
    texte:
      "Frais de gestion du bien par une agence immobilière. Ces frais sont généralement compris entre 5% et 10% des loyers annuels. L’investisseur peut également choisir de gérer son bien lui-même afin d’économiser les frais de gestion locative. Les frais de gestion locative sont des charges déductibles permettant de réduire le revenu imposable.",
  },
  {
    id: "info-charges",
    titre: "Charges courantes",
    texte:
      "Provisions pour charges d’entretien et de rénovation du bien. Le montant de ces charges pourra varier chaque année. Il est recommandé de mettre de côté une somme fixe chaque année pour ne pas être à cours de liquidités le moment venu. Les charges courantes sont des charges déductibles permettant de réduire le revenu imposable.",
  },
  {
    id: "info-pno",
    titre: "Assurrance PNO",
    texte:
      "Assurance propriétaire non-occupant. Elle sert à assurer le bien en cas de sinistre. L’assurance PNO est une charge déductible permettant de réduire le revenu imposable.",
  },
  {
    id: "info-investisseur",
    titre: "Revenu(s) du foyer fiscal",
    texte:
      "Lorsqu’un bien immobilier est détenu en direct (à la différence d’une détention via une société) les revenus fonciers viennent s’ajouter aux revenus d’activité(s) salariée(s) du/des investisseur(s). La somme des revenus sera taxée selon le barème de l’impôt sur le revenu. La modélisation fiscale doit prendre en compte les revenus d’activité(s) salariée(s) du/des investisseur(s) afin de déterminer la rentabilité de l’investissement. Il faut donc renseigner le salaire de chaque investisseur avant impôt sur le revenu. Sur la fiche de paie, la ligne à prendre en compte est : « Net à payer avant impôts sur le revenu ». Si l’investissement est réalisé avec le conjoint, il est essentiel d’indiquer les revenus de chacun des investisseurs ainsi que le nombre de parts fiscales pour permettre la prise en compte le quotient familial dans le calcul de l’impôt sur les revenus locatifs. Enfin, l’augmentation annuelle des revenus d’activité du/des investisseur(s) est un facteur déterminant l’évolution de la pression fiscale sur les revenus locatifs. Si les revenus d’activité augmentent rapidement au cours de la durée de détention du bien, les revenus fonciers seront imposés dans une tranche marginale supérieure. Ceci peut rendre déficitaire un investissement après plusieurs années de cash-flow positif, forçant le(s) investisseur à couvrir les pertes.",
  },
  {
    id: "info-partfisc",
    titre: "Parts Fiscales",
    texte:
      "En France, l'impôt sur le revenu est calculé au niveau du foyer fiscal. Les invdividus composant le foyer fiscal sont appelées parts fiscales. Le nombre de parts fiscales est une notion clé pour le calcul de l’impôt sur le revenu lorsque le foyer fiscal est composé de plusieurs individus. Pour calculer le nombre de parts fiscales, il faut prendre en compte les personnes représentantes du foyer ainsi que les personnes à charge (enfants, personnes âgées ou invalides...) qui donnent droit à un certain nombre de part selon un barème prévu par la loi (exemple : les 2 premiers enfants donnent droit à 0.5 part chacun et le 3ième à une part supplémentaire). Un mécanisme de plafonnement limite la réduction d'impôt liée à l'application du quotient familial. La réduction d'impôt liée au quotient familial est limitée à 1 567 € pour chaque demi-part supplémentaire (784 € pour chaque quart de part supplémentaire). Le site toutsurmesfinances.com explique en détail ces mécanisme : https://www.toutsurmesfinances.com/impots/parts-fiscales-du-foyer-comment-connaitre-et-calculer-leur-nombre.html.",
  },
  {
    id: "info-irl",
    titre: "Indice de référence des loyers",
    texte:
      "L'inflation mesure l'évolution du niveau moyen des prix des biens et services consommés par les ménages. L'IRL correspond à la moyenne de l'inflation sur les quatre derniers trimestres glissants. L’inflation servant de base de calcul à l’IRL, leur attribuer la même valeur est une approche acceptable pour représenter ce paramètre dans une modélisation. Ils doivent être nécessairement pris en compte afin d’effectuer une modélisation du revenu et des charges d'exploitation d'un bien immobilier sur plusieurs années.",
  },
  // indicateurs
  {
    id: "info-projet",
    titre: "Coût du projet",
    texte:
      "Coûts engagés pour l’acquisition et la mise route de l’exploitation du bien. Le coût du projet s’obtient en additionnant : Net vendeur + Travaux + Ameublement + Frais de Notaire + Frais d’agence.",
  },
  {
    id: "info-emprunt",
    titre: "Emprunt",
    texte:
      "Capital qu’il faudra emprunter à la banque pour financer le projet. Emprunt = Coût du projet – Apport. Contracter un emprunt auprès d’une banque nécessite de monter un dossier prouvant la viabilité du projet. Une modélisation fiscale et comptable du projet durant toute la durée de l’emprunt est un argument de poids à l’heure de négocier un prêt immobilier.",
  },
  {
    id: "info-mensualite",
    titre: "Mensualité",
    texte:
      "Somme remboursée par l’emprunteur à la banque tous les mois. Cette somme est composée de capital, d’intérêts d’emprunt et de frais d’assurance. Le montant de l’assurance reste fixe pour toutes les mensualités. Le ratio entre capital et intérêts évolue au fur et à mesure des mensualités : plus le temps passe, plus la part de capital augmente dans la composition de chaque mensualité.",
  },
  {
    id: "info-revenu",
    titre: "Revenu annuel",
    texte:
      "Chiffre d’affaire annuel généré par l’activité de location. Il est calculé en multipliant le loyer mensuel par le taux d’occupation. Il n’inclut pas les charges locataires car elles sont récupérables auprès des locataires. De ce fait, elles ne font ni augmenter le chiffre d’affaire, ni le revenu imposable et ne sont pas déductibles du revenu imposable.",
  },
  {
    id: "info-rentabrute",
    titre: "Rendement brut",
    texte:
      "Indicateur exprimant le revenu annuel brut en pourcentage du coût du projet. Rendement brut = revenu annuel (hors charges locataires) / coût du projet * 100. Cet indicateur ne prend en compte ni les charges financières, ni les charges d’exploitation, ni l’impôt sur le revenu généré par l’exploitation du bien immobilier ou encore les cotisations sociales. C’est un premier indicateur, bien qu’incomplet, permettant d’évaluer l’attractivité d’un investissement immobilier. Les charges locataires ne sont pas prises en compte dans le calcul de cet indicateur car elles ne représentent pas un revenu.",
  },
  {
    id: "info-rentanet",
    titre: "Rendement net",
    texte:
      "Indicateur permettant de calculer le retour sur investissement net annuel avant impôts : Il consiste à additionner la richesse crée pour l’investisseur : cash-flow annuel (positif ou négatif) + (valeur finale du bien / nombre année d’emprunt) et de le diviser par le coût du projet. Cet indicateur peut être négatif si les charges sont supérieures aux revenus. La valeur finale du bien est égale à : net vendeur + travaux et le coût du projet est égal à : net vendeur + travaux + ameublement + notaire + agence. Les charges locataires ne sont pas prises en compte dans le calcul de cet indicateur car elles ne représentent pas un revenu. Cet indicateur ne prend en compte ni l’imposition liée au régime fiscal d’exploitation du bien, ni la situation du foyer fiscal du/des l’investisseur(s), ni le taux d’inflation. Ces paramètres auront une grande influence sur la rentabilité de l’investissement, c’est pour cela qu’il est nécessaire d’effectuer une modélisation prenant ces facteurs en ligne de compte et ce, durant toute la durée de l’emprunt, ou tout du moins, la durée de détention prévue par l’investisseur.",
  },
  {
    id: "info-cashflow",
    titre: "Cash-flow brut",
    texte:
      "Cash-flow brut généré par le bien. Il est important de comprendre qu’un cash-flow brut positif ne garantit pas un cash-flow net d’impôts positif. En effet, le revenu imposable sera composé du revenu annuel – (capital remboursé + charges déductibles + amortissements). Si le montant de l’impôt à payer est supérieur au cash-flow généré durant l’année, le cash-flow net sera négatif et l’investisseur devra payer de sa poche la différence. Les charges locataires ne sont pas prises en compte dans le calcul de cet indicateur car elles ne représentent pas un revenu.",
  },
];

export default modalInfo;
