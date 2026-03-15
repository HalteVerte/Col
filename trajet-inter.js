/* trajet-inter.js — Inter-boucles
   INTER_BOUCLE_POINTS + INTER_BOUCLE_SEGMENTS
*/

window.INTER_BOUCLE_POINTS = [

  // -- LIAISON ALLER — Artemps → Creuse (mi-mai, ~13 jours) ------
  { id:'ib_01', nom:"Laon — collines du Laonnois", type:'bivouac', lat:49.576, lng:3.622, mois:[5], segment:'liaison_aller',
    desc:"Première étape depuis Artemps. Collines calcaires, forêts peu fréquentées. Bivouac en lisière. Asperges sauvages sur les coteaux exposés sud dès mi-mai.", alerte:null },
  { id:'ib_02', nom:"Épernay — bords de Marne", type:'ravitaillement', lat:48.973, lng:4.364, mois:[5], segment:'liaison_aller',
    desc:"Ravitaillement. Piste cyclable continue le long de la Marne. Sureau en fleurs sur les berges (mai). Marché le samedi matin.", alerte:null },
  { id:'ib_03', nom:"Troyes — canal Haute-Seine", type:'ravitaillement', lat:48.299, lng:4.074, mois:[5], segment:'liaison_aller',
    desc:"Canal de la Haute-Seine cyclable, ombragé. Ravitaillement complet. Ail des ours encore présent dans les sous-bois humides de l'Aube.", alerte:null },
  { id:'ib_04', nom:"Auxerre — EV6, bords d'Yonne", type:'ravitaillement', lat:47.798, lng:3.567, mois:[5,6], segment:'liaison_aller',
    desc:"EV6 — piste cyclable continue longeant l'Yonne. Ravitaillement. Forêts de la Puisaye — premières girolles début juin après pluies.", alerte:null },
  { id:'ib_05', nom:"Nevers — confluence Loire / Allier", type:'bivouac', lat:47.003, lng:3.161, mois:[5,6], segment:'liaison_aller',
    desc:"Piste cyclable Loire à vélo depuis Nevers. Bivouac sur les îles de Loire (légal, zone naturelle). Pêche aux écrevisses signal dans l'Allier dès ce point.", alerte:null },
  { id:'ib_06', nom:"Montluçon — entrée Creuse", type:'ravitaillement', lat:46.341, lng:2.601, mois:[5,6], segment:'liaison_aller',
    desc:"Dernier grand ravitaillement avant la Creuse. Supermarché, pharmacie, borne de recharge vélo électrique. Forêt de Tronçais à 30 km au nord-est — noter pour le retour.", alerte:null },

  // -- CREUSE / MILLEVACHES (fin mai → début août, ~70 jours) ----
  { id:'ib_07', nom:"Guéret — ravitaillement & eau", type:'ravitaillement', lat:46.168, lng:1.871, mois:[6,7,8], segment:'creuse',
    desc:"Préfecture de la Creuse. Supermarché, pharmacie, fontaines publiques. Borne de recharge à la médiathèque. Point de base pour rayonner sur le plateau.", alerte:null },
  { id:'ib_08', nom:"Rivière Creuse — écrevisses signal", type:'peche', lat:46.120, lng:1.870, mois:[6,7], segment:'creuse',
    desc:"Pacifastacus leniusculus — invasive, pêche libre sans quota toute l'année. Gorges entre Fresselines et Crozant, eau claire, fond de graviers. Pêche de nuit à la lampe torche et épuisette.", alerte:null },
  { id:'ib_09', nom:"Gorges de la Sédelle — truites & isolement", type:'peche', lat:46.234, lng:1.762, mois:[6,7], segment:'creuse',
    desc:"Affluent sauvage de la Creuse. Truites fario dans les zones calmes. Sentier très peu fréquenté. Girolles dès mi-juin sur les talus moussus. Bivouac forêt domaniale.", alerte:"Vérifier réglementation pêche 1ère catégorie (truites)." },
  { id:'ib_10', nom:"Forêt de Chabrières — girolles & cèpes d'été", type:'champignon', lat:45.933, lng:2.016, mois:[6,7], segment:'creuse',
    desc:"Forêt domaniale sur sol granitique acide. Girolles dès mi-juin après pluies, cèpes d'été en juillet. Quasi aucun ramasseur. Chemin forestier accessible à vélo chargé.", alerte:null },
  { id:'ib_11', nom:"Plateau de Millevaches — myrtilles", type:'cueillette', lat:45.716, lng:1.983, mois:[7,8], segment:'creuse',
    desc:"Plus grand gisement de myrtilles sauvages de France métropolitaine. Landes acides 700-900m. Pic début juillet. Quasi aucun cueilleur professionnel. Faire des cuirs pour stock longue durée.", alerte:null },
  { id:'ib_12', nom:"Lac de Vassivière — bivouac & pêche", type:'bivouac', lat:45.712, lng:1.929, mois:[6,7,8], segment:'creuse',
    desc:"1000 ha, berges nord très peu fréquentées hors juillet-août. Pêche au brochet et perche. Eau potable. Forêt de pins domaniale — bivouac discret.", alerte:"Éviter rives sud (camping, baignade) en juillet-août." },
  { id:'ib_13', nom:"Aubusson — recharge & passage", type:'recharge', lat:45.957, lng:2.170, mois:[6,7,8], segment:'creuse',
    desc:"Borne de recharge vélo électrique en centre-ville (vérifier OpenChargeMap). Marché le mercredi. Axe de passage vers Millevaches par la D982.", alerte:null },

  // -- REMONTÉE — Tronçais → Artemps (début août, ~12 jours) -----
  { id:'ib_14', nom:"Forêt de Tronçais — noisettes & pêche", type:'cueillette', lat:46.637, lng:2.975, mois:[8], segment:'remontee',
    desc:"La plus belle chênaie de France — 10 600 ha. Premières noisettes mi-août en lisière. Étangs avec pêche autorisée (carpes, brèmes). Bivouac forêt domaniale sans restriction.", alerte:null },
  { id:'ib_15', nom:"Decize — canal du Nivernais", type:'bivouac', lat:47.382, lng:3.288, mois:[8], segment:'remontee',
    desc:"Jonction Canal du Nivernais / Loire. Piste cyclable continue vers le nord. Mûres sauvages sur toutes les berges en août. Bivouac îles de Loire.", alerte:null },
  { id:'ib_16', nom:"Épernay — sureau & Marne", type:'cueillette', lat:48.973, lng:4.364, mois:[8], segment:'remontee',
    desc:"Sureau noir en baies mûres sur les berges de Marne (début août). Houblon sauvage sur les haies. Bivouac bord de Marne. Même étape qu'à l'aller — repères connus.", alerte:null },
  { id:'ib_17', nom:"Soissons — vallée de l'Aisne", type:'ravitaillement', lat:49.354, lng:3.325, mois:[8], segment:'remontee',
    desc:"Dernière étape avant Artemps. Houblon sauvage sur les bords d'Aisne — récolte possible août. Ravitaillement. 45 km d'Artemps.", alerte:null },
  { id:'ib_18', nom:"Artemps — re-départ boucle 2", type:'bivouac', lat:49.797, lng:3.199, mois:[8], segment:'remontee',
    desc:"Retour mi-août. Sureau noir sur les berges de Somme. Recalage calendrier saisonnier. Re-départ immédiat pour la grande boucle 2 — même logique, même timing.", alerte:"Être de retour avant le 20 août pour respecter la fenêtre de départ saisonnière." },
];

window.INTER_BOUCLE_SEGMENTS = [
  {
    id:'liaison_aller', emoji:'🛤️', label:"Liaison Artemps → Creuse",
    mois:"Mi-mai (13 jours)", km:'~550 km', jours:'12 à 14 jours', color:'#5a3e1a',
    objectif_principal:"Rejoindre la Creuse par l'est de Paris — Champagne → Berry",
    ressources:["Asperges sauvages (Laonnois)","Ail des ours (Yonne)","Sureau en fleurs (Marne)","Écrevisses dès Nevers"],
    alerte:"Rester à l'est de 2.8°E pour éviter Paris — axe Laon → Reims → Épernay → Troyes → Auxerre → Nevers.",
  },
  {
    id:'creuse', emoji:'🌲', label:"Creuse & Millevaches",
    mois:"Fin mai → début août (70 jours)", km:'~300 km de boucle intérieure', jours:'65 à 75 jours', color:'#2c3e1a',
    objectif_principal:"Protéines fraîches (écrevisses, truites) · Myrtilles · Girolles · Isolement total",
    ressources:["Écrevisses signal (libre)","Truites fario","Girolles","Myrtilles Millevaches","Cèpes d'été","Brochet / perche Vassivière"],
    alerte:"Vérifier réglementation pêche 1ère catégorie pour les truites.",
  },
  {
    id:'remontee', emoji:'🏔️', label:"Tronçais → Artemps",
    mois:"Début août (12 jours)", km:'~550 km', jours:'11 à 13 jours', color:'#9abf6a',
    objectif_principal:"Retour Artemps · Tronçais (noisettes) · Sureau Marne · Houblon Aisne",
    ressources:["Noisettes (Tronçais)","Mûres sauvages","Sureau baies (Marne)","Houblon sauvage (Aisne)","Carpes / brèmes"],
    alerte:"Être à Artemps avant le 20 août — fenêtre de re-départ boucle 2.",
  },
];
