/* zones.js — Zones RPG La Boucle Sauvage */
window.ZONES_RPG = [
  {
    id:1, phase:"PHASE 1", pays:"🇫🇷",
    name:"Les Grandes Forêts du Nord",
    subtitle:"Ardennes · Meuse · Moselle · Voie Bleue",
    period:"Mi-août → fin août",
    color:"#5a8a3a",
    lore:"Les hêtraies monumentales des Ardennes gardent leurs secrets depuis des siècles. Peu de voyageurs s'aventurent dans ces forêts — les fruits y sont abondants, les champignons généreux, et les rivières poissonneuses.",
    quests_ids:[1,2,3,4,5,6],
    stocks:["Myrtilles séchées","Faînes torréfiées","Noisettes","Cuirs de mûres"],
    unlocked:true
  },
  {
    id:2, phase:"PHASE 2", pays:"🇫🇷",
    name:"Le Sanctuaire du Morvan",
    subtitle:"Vézelay · Lac des Settons · Château-Chinon",
    period:"Début septembre",
    color:"#3a6e28",
    lore:"Au cœur du granit bourguignon, le Morvan cache les plus grandes hêtraies de France centrale. C'est ici que les voyageurs avisés font halte pour constituer leurs réserves hivernales.",
    quests_ids:[7,8,9],
    stocks:["Faînes torréfiées","Farine de gland","Champignons séchés","Noisettes"],
    unlocked:true
  },
  {
    id:3, phase:"PHASE 3", pays:"🇫🇷",
    name:"La Vallée d'Or & le Pilat",
    subtitle:"Saône · Beaujolais · Lyon · Parc du Pilat",
    period:"Fin septembre → mi-octobre",
    color:"#9e3f20",
    lore:"Le tournant de la boucle. L'été se ferme ici — les dernières mûres, les premiers noyers qui lâchent, les pleurotes sur les peupliers morts. À Lyon, le rythme change. Puis le Pilat : un massif forestier dense à deux heures de pédalage, avec ses châtaigneraies et ses cèpes d'octobre. C'est ici que se constituent les premiers stocks lourds avant la descente vers les Cévennes.",
    quests_ids:[10,11,12,13,14],
    stocks:["Noix","Raisin séché","Pleurotes séchés","Châtaignes Pilat","Cèpes séchés Pilat"],
    unlocked:true
  },
  {
    id:4, phase:"PHASE 4", pays:"🇫🇷",
    name:"Les Terres Sombres",
    subtitle:"Cévennes · Ardèche · Périgord Noir",
    period:"Octobre",
    color:"#7a4a20",
    lore:"Les Cévennes en octobre : châtaigniers centenaires, trompettes de la mort dans les chênaies, noix à profusion dans le Périgord. C'est la grande halte de transformation — on remplit les sacoches pour l'hiver.",
    quests_ids:[15,16,17],
    stocks:["Châtaignes séchées","Trompettes séchées","Noix","Farine de châtaigne"],
    unlocked:false
  },
  {
    id:5, phase:"PHASE 5", pays:"🇫🇷",
    name:"La Côte des Huîtres",
    subtitle:"Gascogne · Arcachon · Côte Basque",
    period:"Fin octobre → début novembre",
    color:"#2d6e7a",
    lore:"Avant d'affronter les Pyrénées, le voyageur doit faire le plein de protéines. Le Bassin d'Arcachon offre à marée basse ce que nulle forêt ne peut donner.",
    quests_ids:[18,19],
    stocks:["Algues séchées","Huîtres (frais)","Moules (frais)"],
    unlocked:false
  },
  {
    id:6, phase:"PHASE 6", pays:"🇪🇸",
    name:"La Côte des Tempêtes",
    subtitle:"Cantabrique · Asturies · Galice",
    period:"Novembre",
    color:"#2d5c7a",
    lore:"La côte cantabrique en novembre : vent dans le dos, mer démontée, rochers couverts de percebes et de moules géantes. Les Asturies cachent les dernières châtaignes et les meilleurs champignons d'automne tardif.",
    quests_ids:[20,21,22],
    stocks:["Algues Porphyra séchées","Châtaignes asturiennes","Percebes séchés"],
    unlocked:false
  },
  {
    id:7, phase:"PHASE 7", pays:"🇵🇹",
    name:"Le Royaume Vert",
    subtitle:"Porto · Aveiro · Serra da Gardunha · Lisbonne",
    period:"Fin novembre → mi-décembre",
    color:"#2d7a5c",
    lore:"Le Portugal côtier en décembre : orangers abandonnés, palourdes dans les rias, et le détour vers la Serra da Gardunha pour le jackpot de pignons. La terre devient plus généreuse à mesure qu'on descend.",
    quests_ids:[23,24,25],
    stocks:["Pignons torréfiés","Zestes d'orange séchés","Algues séchées","Kaki séché"],
    unlocked:false
  },
  {
    id:8, phase:"PHASE 8", pays:"🇵🇹",
    name:"Le Bout du Monde",
    subtitle:"Alentejo · Côte Vicentine · Lagos",
    period:"Mi-décembre → mi-janvier",
    color:"#2c5e2a",
    lore:"Lagos en janvier : amandiers en fleurs, palourdes dans la Ria de Alvor, soleil de 14 heures. Le voyage touche à sa première moitié. Le mode slow s'installe. La boucle commence à se refermer en pensée.",
    quests_ids:[26,27,28],
    stocks:["Caroube","Algues Laminaria séchées","Percebes séchés","Asperges sauvages"],
    unlocked:false
  },
  // == RETOUR ==
  {
    id:9, phase:"PHASE R1", pays:"🇵🇹",
    name:"Le Chemin du Retour",
    subtitle:"Côte Vicentine · Lisbonne · Porto · Galice",
    period:"Mi-janvier → mi-février",
    color:"#2d7a7a",
    lore:"Le retour commence à Lagos. La Côte Vicentine en janvier est la plus sauvage d'Europe. En remontant vers Porto, les rías galiciennes offrent leurs trésors. Les asperges sauvages surgissent dans l'Alentejo dès février.",
    quests_ids:[29,30,31],
    stocks:["Asperges sauvages","Percebes séchés","Algues Porphyra"],
    unlocked:false
  },
  {
    id:10, phase:"PHASE R2", pays:"🇪🇸",
    name:"Les Rías du Retour",
    subtitle:"Galice · Cantabrique · Pays Basque",
    period:"Mi-février → mi-mars",
    color:"#2d5c8a",
    lore:"La Galice en février : oursins au pic, moules géantes, ail des ours dans les forêts humides. La côte cantabrique vers l'est avec le vent dans le dos — la traversée la plus douce du retour.",
    quests_ids:[32,33,34],
    stocks:["Ail des ours","Orties séchées","Algues séchées"],
    unlocked:false
  },
  {
    id:11, phase:"PHASE R3", pays:"🇫🇷",
    name:"La Côte des Vents",
    subtitle:"Landes · Arcachon · Gironde · Vendée",
    period:"Mi-mars → début avril",
    color:"#2d6e5a",
    lore:"Retour en France. Les Landes en mars : premières orties, ail des ours dans les sous-bois de pins. Arcachon pour les dernières huîtres. La salicorne commence à pointer dans les marais charentais.",
    quests_ids:[35,36],
    stocks:["Salicorne","Huîtres (frais)","Ail des ours"],
    unlocked:false
  },
  {
    id:12, phase:"PHASE R4", pays:"🇫🇷",
    name:"Les Marais Verts",
    subtitle:"Vendée · Marais Poitevin · Loire-Atlantique",
    period:"Avril",
    color:"#3a7a3a",
    lore:"Avril en Vendée et Marais Poitevin : explosion du printemps. Cresson dans les canaux, oseille sauvage, ail des ours à son pic. Les bouchots de Noirmoutier et les huîtres de Marennes : meilleures protéines du retour français.",
    quests_ids:[37,38],
    stocks:["Cresson","Oseille","Salicorne confite"],
    unlocked:false
  },
  {
    id:13, phase:"PHASE R5", pays:"🇫🇷",
    name:"L'Apogée Bretonne",
    subtitle:"Quiberon · Finistère · Brest · Saint-Malo",
    period:"Fin avril → début mai",
    color:"#2a4a6a",
    lore:"La Bretagne en mai : l'apogée absolue de la boucle. Criste marine sur les falaises, algues en masse, moules et araignées de mer. Les forêts résonnent d'ail des ours. La plus belle étape du retour.",
    quests_ids:[39,40,41],
    stocks:["Criste marine séchée","Algues Bretagne","Ail des ours"],
    unlocked:false
  },
  {
    id:14, phase:"PHASE R6", pays:"🇫🇷",
    name:"Le Retour aux Sources",
    subtitle:"Normandie · Baie de Somme · Artemps",
    period:"Mai",
    color:"#4a6a3a",
    lore:"Les derniers kilomètres. L'aster maritime de la Baie de Somme en mai. Les orties et les fleurs de sureau des haies picardes. Artemps au loin. La boucle se referme.",
    quests_ids:[42,43],
    stocks:["Fleurs de sureau","Aster maritime","Orties"],
    unlocked:false
  },
  // == INTER-BOUCLES ==
    {
    id:15, phase:"INTER", pays:"🇫🇷",
    name:"L'Inter-Boucles",
    subtitle:"Bretagne · Suisse Normande · Marquenterre · Somme",
    period:"Mai → mi-août (entre deux boucles)",
    color:"#6a5a2a",
    lore:"La boucle est bouclée — mais le nomade ne s'arrête pas. Trois mois selon une logique simple : protéines fraîches sur la côte tant qu'elle est accessible, repli vers l'intérieur à mi-juin, remontée douce vers Artemps par la Somme.",
    quests_ids:[44,45,46,47,48,49],
    stocks:["Laminaria poudre","Algues séchées","Moules séchées","Millepertuis","Sureau baies"],
    unlocked:false
  },
  {
    id:16, phase:"CYCLE", pays:"🌙",
    name:"La Roue de l'Année",
    subtitle:"Sorcières des haies · Cycles du vivant · 8 fêtes",
    period:"Toute l'année — fêtes déclenchables",
    color:"#8840c8",
    lore:"Huit nœuds dans l'année. Solstices, équinoxes, quarts. Chaque fête tombe dans une zone différente selon le calendrier de la boucle. Quêtes débloquées automatiquement à la bonne date.",
    quests_ids:[51,52,53,54,55,56,57,58],
    stocks:[],
    unlocked:true
  }
];
