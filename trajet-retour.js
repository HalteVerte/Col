/* trajet-retour.js — Lagos -> Artemps
   TRAJET_RETOUR · 6 phases · ~4600km
*/

window.TRAJET_RETOUR = {
  titre: 'Lagos → Artemps',
  sous_titre: 'Retour côtier · Janvier → Mai · ~4 600 km · Portugal · Espagne · France',
  km_total: 4600,
  logique: 'Nourri au frais jour par jour — côtes, fleuves, marais · 5 must toujours en sacoche',
  must: ['Faînes torréfiées', 'Champignons séchés', 'Cynorrhodons séchés', 'Farine de gland', 'Algues séchées (iode)'],
  phases: [

    /* ---------------------------------------------
       PHASE R1 — ALGARVE → LISBONNE → PORTO
       Mi-janvier → mi-février · ~520 km · mode slow
       Fil : Côte Vicentine → Tage → Douro
    --------------------------------------------- */
    {
      num: 1,
      label: 'PHASE R1 — ALGARVE & CÔTE VICENTINE',
      mois: 'Mi-janvier → mi-février',
      pays: '🇵🇹',
      color: '#2c7a3a',
      zone: 'Lagos → Sagres → Côte Vicentine → Lisbonne → Porto',
      km: '~520 km',
      jours: '14 à 18 jours (mode slow)',
      intro: 'Remonter sans se presser le long de la côte atlantique portugaise. Janvier-février : 14-16°C, ciel souvent dégagé. Asperges sauvages au pic en Alentejo litoral. Côte Vicentine quasi-déserte — algues et percebes à volonté. Les premières pousses printanières apparaissent en Alentejo dès février.',
      etapes: [
        { nom: 'Lagos — Ria de Alvor (DÉPART)', lat: 37.11057, lng: -8.66787, type: 'depart', km: 0,
          ressources: ['Palourdes ★★★★★ (Ria de Alvor)', 'Oranges ★★★★★', 'Amandiers en fleurs ★★★★★ (mi-jan)', 'Caroube ★★★★', 'Percebes ★★★ (côte rocheuse)', 'Figues de Barbarie ★★★ (raquettes cuites)'],
          note: 'DÉPART RETOUR. Mode slow — profiter encore de l\'Algarve avant de remonter. Amandiers en fleurs mi-janvier : blanc et rose partout. Ria de Alvor : palourdes à marée basse, sans matériel. Figues de Barbarie : découper les raquettes avec des gants, cuire comme légume.' },
        { nom: 'Vila do Bispo — Côte Vicentine', lat: 37.08, lng: -8.91, type: 'cueillette', km: 45,
          ressources: ['Percebes ★★★★★ (rochers exposés Atlantique)', 'Algues ★★★★★ (Laminaria, Porphyra, Chondrus)', 'Moules ★★★★', 'Salicorne ★★'],
          note: '⭐ SPOT ALGUES & PERCEBES. Côte Vicentine sauvage — faire le plein d\'algues séchées ici : Porphyra (nori portugais), Laminaria (iode), Chondrus. Sécher sur le vélo en roulant. Ces algues sont les must du retour.' },
        { nom: 'Santiago do Cacém — Asperges Alentejo', lat: 37.99, lng: -8.69, type: 'cueillette', km: 150,
          ressources: ['Asperges sauvages ★★★★★ (Asparagus aphyllus — pic février)', 'Caroube ★★★★ (gousses au sol)', 'Oranges ★★★★', 'Bette maritime ★★★ (Beta vulgaris maritima — premières feuilles)'],
          note: '⭐⭐ SPOT ASPERGES. Février = pic absolu des asperges sauvages en Alentejo. Chercher en lisière de garrigue sur sol sableux. Bette maritime : premières grandes feuilles vert foncé — cuire comme épinards, très reminéralisantes.' },
        { nom: 'Setúbal — Sado', lat: 38.52, lng: -8.89, type: 'cueillette', km: 270,
          ressources: ['Huîtres ★★★★★ (glanage zones libres)', 'Palourdes ★★★★★', 'Salicorne ★★★ (estuaire — tendre en févr)', 'Algues ★★★', 'Bette maritime ★★★'],
          note: 'Estuaire du Sado — dernière grande halte protéines avant Lisbonne. Salicorne très tendre en février dans les estuaires.' },
        { nom: 'Lisbonne — Tage', lat: 38.72, lng: -9.14, type: 'halte', km: 340,
          ressources: ['Palourdes ★★★★ (estuaire Tage)', 'Oranges ★★★★ (en ville)', 'Marché da Ribeira', 'Eau potable'],
          note: 'Grande halte logistique. Réviser le vélo. Marché da Ribeira : provisions fraîches et fruits de mer locaux.' },
        { nom: 'Nazaré — Côte rocheuse', lat: 39.60, lng: -9.07, type: 'cueillette', km: 410,
          ressources: ['Moules ★★★★★ (rochers — énormes en eau froide)', 'Algues ★★★★ (Fucus, Ulva, Porphyra)', 'Percebes ★★★ (caps rocheux)', 'Orties ★★★ (lisières — premières de l\'année)'],
          note: 'Côte rocheuse exposée — moules géantes en eau froide de février. Premières orties de l\'année dans les lisières abritées : jeunes feuilles tendres, très riches en fer et vitamine C.' },
        { nom: 'Aveiro — Ria', lat: 40.64, lng: -8.65, type: 'cueillette', km: 460,
          ressources: ['Palourdes ★★★★★ (Ria d\'Aveiro)', 'Anguilles ★★★ (chenaux)', 'Algues ★★★', 'Salicorne ★★★'],
          note: 'La Ria d\'Aveiro en remontant — même spot exceptionnel qu\'à l\'aller, toujours aussi productif en février.' },
        { nom: 'Porto — Douro', lat: 41.15, lng: -8.61, type: 'halte', km: 520,
          ressources: ['Marché Bolhão (percebes, palourdes)', 'Orties ★★★ (berges Douro)', 'Cresson ★★★ (sources)', 'Eau potable'],
          note: 'Porto : révision vélo, provisions. Orties au bord du Douro — premières pousses de l\'année, très tendres.' },
      ]
    },

    /* ---------------------------------------------
       PHASE R2 — GALICE (ESPAGNE)
       Mi-février → mi-mars · ~400 km
       Fil : Côte Cantabrique → Rias Baixas → Vigo → Pontevedra
       Zone souvent oubliée — exceptionnelle
    --------------------------------------------- */
    {
      num: 2,
      label: 'PHASE R2 — GALICE 🦪 RIAS BAIXAS',
      mois: 'Mi-février → mi-mars',
      pays: '🇪🇸',
      color: '#1a6e8a',
      zone: 'Porto → Vigo → Pontevedra → Saint-Jacques-de-Compostelle → côte',
      km: '~400 km',
      jours: '10 à 12 jours',
      intro: 'La Galice est une des zones les plus riches en coquillages sauvages d\'Europe — quasi inconnue des randonneurs non-espagnols. Les Rias Baixas sont des fjords peu profonds : huîtres, moules sur bouchots sauvages, percebes, coques en masse. Côte venteuse et pluvieuse en février mais très productive. Les premières pousses printanières apparaissent à l\'abri des vallées.',
      etapes: [
        { nom: 'Vigo — Ria de Vigo', lat: 42.24, lng: -8.72, type: 'cueillette', km: 0,
          ressources: ['Moules ★★★★★ (bouchots sauvages Ria de Vigo)', 'Huîtres ★★★★★ (zones libres marée basse)', 'Palourdes ★★★★', 'Algues ★★★★', 'Percebes ★★★ (caps)'],
          note: '⭐⭐⭐ SPOT EXCEPTIONNEL GALICE. La Ria de Vigo est une des plus grandes zones de production de moules et huîtres d\'Europe. À marée basse, les zones non-concédées offrent une abondance incroyable. Moules sur les rochers affleurants, huîtres plates sur les vasières.' },
        { nom: 'Pontevedra — Ria de Pontevedra', lat: 42.43, lng: -8.65, type: 'cueillette', km: 60,
          ressources: ['Moules ★★★★★', 'Coques ★★★★ (sable vasières)', 'Orties ★★★ (vallées abritées)', 'Ail des ours ★★ (sous-bois humides — début)', 'Cresson ★★★ (ruisseaux)'],
          note: 'Ria de Pontevedra — même richesse que Vigo. Dans les vallées abritées de l\'intérieur : ail des ours qui commence à pointer, cresson dans les ruisseaux. Le contraste côte/intérieur est frappant.' },
        { nom: 'Saint-Jacques — Arrière-pays', lat: 42.88, lng: -8.54, type: 'halte', km: 130,
          ressources: ['Ail des ours ★★★ (forêts de chênes humides)', 'Orties ★★★★', 'Cresson ★★★ (ruisseaux)', 'Champignons de printemps ★★ (Calocybe gambosa — début)'],
          note: 'L\'arrière-pays galicien est couvert de forêts de chênes humides — ail des ours en colonies, orties tendres. Calocybe gambosa (mousseron de Saint-Georges) : premier champignon de printemps, apparaît en mars dans les prairies.' },
        { nom: 'La Corogne — Cap Finisterre', lat: 43.37, lng: -8.40, type: 'cueillette', km: 210,
          ressources: ['Percebes ★★★★★ (caps rocheux exposés)', 'Moules ★★★★★', 'Algues ★★★★★ (côte très exposée)', 'Orties ★★★★'],
          note: '⭐⭐ SPOT PERCEBES. Les caps rocheux entre Finisterre et La Corogne sont les meilleurs spots à percebes d\'Espagne. Exposition maximale à l\'Atlantique = percebes énormes. Récolter à marée basse seulement, par mer calme.' },
        { nom: 'Ribadeo — Entrée Asturies', lat: 43.54, lng: -7.04, type: 'bivouac', km: 320,
          ressources: ['Moules ★★★★ (côte cantabrique)', 'Orties ★★★★★ (haies humides)', 'Ail des ours ★★★★ (forêts chênes)', 'Pissenlit ★★★ (prairies)'],
          note: 'Entrée dans les Asturies — côte cantabrique plus abritée. Végétation printanière en avance par rapport à la France. Pissenlits en fleurs dans les prairies : feuilles en salade, fleurs en beignets.' },
        { nom: 'Gijón — Côte asturienne', lat: 43.53, lng: -5.66, type: 'cueillette', km: 390,
          ressources: ['Moules ★★★★★ (rochers côte asturienne)', 'Percebes ★★★★ (caps rocheux)', 'Ail des ours ★★★★★ (forêts humides Asturies)', 'Orties ★★★★★'],
          note: 'Côte asturienne en mars : forêts de chênes humides — ail des ours en masse. Rochers atlantiques avec moules et percebes. Les Asturies ont les forêts les plus denses en ail des ours de toute la péninsule ibérique.' },
        { nom: 'Santander — Baie de Biscaye', lat: 43.46, lng: -3.80, type: 'cueillette', km: 470,
          ressources: ['Huîtres ★★★★ (baie de Santander)', 'Moules ★★★★★', 'Ail des ours ★★★★ (forêts Cantabrie)', 'Cresson ★★★ (ruisseaux)'],
          note: 'La baie de Santander : zones de glanage d\'huîtres sauvages accessibles à marée basse. Ail des ours dans les forêts humides de Cantabrie — pic mars.' },
        { nom: 'Bilbao — Ría del Nervión', lat: 43.26, lng: -2.93, type: 'halte', km: 530,
          ressources: ['Marché couvert (derniers achats ibériques)', 'Moules ★★★★ (côte proche)', 'Recharge batterie', 'Eau potable'],
          note: 'Bilbao : dernière grande halte espagnole. Marché couvert — moules et coquillages à prix basques. Recharger la batterie avant le Pays Basque français.' },
        { nom: 'San Sebastián — Pays Basque espagnol', lat: 43.32, lng: -1.98, type: 'halte', km: 400,
          ressources: ['Moules ★★★★ (rochers)', 'Ail des ours ★★★★ (forêts basques)', 'Orties ★★★★★', 'Pissenlit ★★★★', 'Marché (pintxos aux herbes sauvages)'],
          note: 'Pays Basque espagnol — forêts de chênes pédonculés très humides : ail des ours en masses. Marchés locaux avec herbes sauvages en vente. Avant la frontière française.' },
      ]
    },

    /* ---------------------------------------------
       PHASE R3 — CÔTE BASQUE & LANDES
       Mi-mars → début avril · ~300 km
       Fil : Adour → côte landaise → Bassin d'Arcachon
    --------------------------------------------- */
    {
      num: 3,
      label: 'PHASE R3 — CÔTE BASQUE & LANDES',
      mois: 'Mi-mars → début avril',
      pays: '🇫🇷',
      color: '#3a7a5a',
      zone: 'Hendaye → Bayonne → Landes → Bassin d\'Arcachon',
      km: '~300 km',
      jours: '7 à 9 jours',
      intro: 'Retour en France. Mars : explosion des pousses printanières dans les Landes et le Pays Basque. Ail des ours au pic dans les forêts de chênes. Côte atlantique landaise longue et sauvage — quasi-déserte, dunes et forêts de pins. Le Bassin d\'Arcachon en avril : huîtres + ail des ours + orties = festin.',
      etapes: [
        { nom: 'Hendaye — Retour France', lat: 43.36, lng: -1.77, type: 'halte', km: 0,
          ressources: ['Moules ★★★★ (rochers côte basque)', 'Ail des ours ★★★★★ (forêts Nivelle)', 'Orties ★★★★★ (haies)', 'Cresson ★★★★ (Nivelle)'],
          note: 'Retour en France. Les forêts le long de la Nivelle sont exceptionnelles pour l\'ail des ours en mars — grandes feuilles vert tendre, odeur aillée puissante. Vérifier : feuille brillante dessus, mate dessous (éviter confusion avec le muguet — toujours inodore).' },
        { nom: 'Bayonne — Adour', lat: 43.49, lng: -1.48, type: 'cueillette', km: 40,
          ressources: ['Ail des ours ★★★★★ (forêts Adour)', 'Orties ★★★★★', 'Pissenlit ★★★★ (prairies)', 'Cardamine ★★★ (berges Adour — saveur cresson)', 'Moules ★★★ (côte)'],
          note: 'Berges de l\'Adour — cardamine des prés (Cardamine pratensis) : petites fleurs violettes, feuilles à saveur de cresson, très tendre en mars. Pissenlits partout dans les prairies humides.' },
        { nom: 'Côte Landaise — Dunes sauvages', lat: 44.20, lng: -1.25, type: 'bivouac', km: 120,
          ressources: ['Oyats (jeunes pousses ★★ — cuire)', 'Cynorrhodons séchés sur arbustes ★★★ (restants hiver)', 'Pignons ★★★ (pins maritimes — différents des parasols)', 'Orties ★★★ (lisières)'],
          note: 'Côte landaise : 200km de dunes et pinèdes quasi-désertes. Les pins maritimes produisent de petits pignons — moins gros que les parasols, mais comestibles. Cynorrhodons d\'hiver encore sur les arbustes des dunes : concentrés en vitamine C après les gelées.' },
        { nom: 'Arcachon — Bassin', lat: 44.65, lng: -1.17, type: 'cueillette', km: 200,
          ressources: ['Huîtres ★★★★★ (zones libres bassin)', 'Palourdes ★★★★ (sable)', 'Salicorne ★★★★ (estuaires — très tendre avril)', 'Algues ★★★ (passes)', 'Ail des ours ★★★★ (forêts berges)'],
          note: '⭐⭐ SPOT ARCACHON PRINTEMPS. Même spot qu\'à l\'aller mais maintenant avec salicorne tendre (commence avril), ail des ours dans les forêts du pourtour. Salicorne très jeune = croquante et saline, parfaite crue. Huîtres + salicorne + ail des ours = le meilleur repas du retour.' },
        { nom: 'Bordeaux — Garonne', lat: 44.84, lng: -0.58, type: 'halte', km: 270,
          ressources: ['Ail des ours ★★★★ (forêts Garonne)', 'Orties ★★★★', 'Pissenlit ★★★★', 'Marché (légumes de saison)', 'Eau potable'],
          note: 'Grande halte. Marché de Bordeaux : légumes de saison locaux. Les berges de la Garonne en forêt : ail des ours en masse.' },
        { nom: 'Royan — Estuaire de la Gironde', lat: 45.62, lng: -1.02, type: 'cueillette', km: 300,
          ressources: ['Moules ★★★★★ (rochers Gironde)', 'Huîtres ★★★★ (Marennes-Oléron proches)', 'Salicorne ★★★★ (estuaire — pic avril)', 'Oseille sauvage ★★★ (prairies)', 'Orties ★★★★'],
          note: 'Estuaire de la Gironde — jonction Atlantique et eaux douces. Salicorne au pic en avril : croquante, saline, parfaite crue en salade. Oseille sauvage dans les prairies humides.' },
      ]
    },

    /* ---------------------------------------------
       PHASE R4 — VENDÉE & LOIRE-ATLANTIQUE
       Avril · ~280 km
       Fil : Côte vendéenne → Marais poitevin → Loire
    --------------------------------------------- */
    {
      num: 4,
      label: 'PHASE R4 — VENDÉE & MARAIS POITEVIN',
      mois: 'Avril',
      pays: '🇫🇷',
      color: '#5a8a2a',
      zone: 'Royan → Île de Ré → Marais Poitevin → Noirmoutier → Nantes',
      km: '~280 km',
      jours: '7 à 9 jours',
      intro: 'Avril : explosion printanière complète. Le Marais Poitevin est une des zones humides les plus riches de France — plantes de marais, grenouilles, anguilles. La côte vendéenne offre huîtres de Noirmoutier et moules de bouchot. C\'est le mois le plus facile à nourrir du retour : tout pousse, tout est disponible.',
      etapes: [
        { nom: 'Île de Ré — Marais salants', lat: 46.20, lng: -1.40, type: 'cueillette', km: 0,
          ressources: ['Salicorne ★★★★★ (marais salants — pic avril)', 'Huîtres ★★★★★ (zones libres)', 'Algues ★★★★ (côte exposée)', 'Oseille sauvage ★★★★', 'Orties ★★★★'],
          note: '⭐⭐ SPOT SALICORNE. L\'île de Ré est le meilleur spot de salicorne de France en avril — marais salants abandonnés colonisés naturellement. Salicorne jeune : croquante, fraîche, saline. Couper juste les pointes tendres des tiges.' },
        { nom: 'La Rochelle — Pertuis charentais', lat: 46.16, lng: -1.15, type: 'halte', km: 50,
          ressources: ['Huîtres Marennes ★★★★★', 'Moules de bouchot ★★★★★', 'Palourdes ★★★★', 'Salicorne ★★★★'],
          note: 'Marennes-Oléron : capitale mondiale de l\'huître. Zones de glanage légal sur les estrans libres à marée basse. Moules de bouchot sur les pieux des pertuis.' },
        { nom: 'Marais Poitevin — Venise verte', lat: 46.37, lng: -0.73, type: 'cueillette', km: 110,
          ressources: ['Cresson ★★★★★ (canaux marais — eau courante propre)', 'Oseille sauvage ★★★★★', 'Cardamine ★★★★', 'Pissenlit ★★★★', 'Massette ★★★ (pousses tendres — cuire)', 'Anguilles ★★★ (ligne)'],
          note: '⭐⭐⭐ SPOT EXCEPTIONNEL PLANTES DE MARAIS. Le Marais Poitevin en avril : canaux couverts de cresson sauvage (eau courante = propre, consommable sans cuisson), oseille partout sur les berges, massette avec jeunes pousses tendres. Zone très sauvage et peu fréquentée.' },
        { nom: 'Noirmoutier — Marais et côte', lat: 46.99, lng: -2.25, type: 'cueillette', km: 175,
          ressources: ['Moules ★★★★★ (bouchots Baie de Bourgneuf)', 'Huîtres ★★★★ (zones libres)', 'Salicorne ★★★★★ (marais salants île)', 'Orties ★★★★★ (dunes intérieures)', 'Samphire ★★★ (criste marine — début)'],
          note: '⭐ SPOT NOIRMOUTIER. Île reliée par route submersible — marais salants riches en salicorne, bouchots en baie, criste marine (fenouil de mer) qui commence sur les rochers. Saveur iodée et anisée unique.' },
        { nom: 'Saint-Nazaire — Estuaire de la Loire', lat: 47.27, lng: -2.21, type: 'bivouac', km: 230,
          ressources: ['Orties ★★★★★ (berges Loire)', 'Ail des ours ★★★★ (forêts alluviales)', 'Massette ★★★★ (rives)', 'Oseille ★★★★', 'Moules ★★★ (côte)'],
          note: 'Estuaire de la Loire — forêts alluviales riches en ail des ours. Les massettes en bord de Loire : jeunes pousses de printemps tendres comme des poireaux.' },
        { nom: 'Guérande — Marais salants', lat: 47.33, lng: -2.43, type: 'cueillette', km: 0,
          ressources: ['Salicorne ★★★★★ (marais salants de Guérande)', 'Oseille sauvage ★★★★', 'Pissenlit ★★★★★', 'Orties ★★★★★', 'Huîtres ★★★★ (Croisic)'],
          note: '⭐⭐ SPOT SALICORNE. Marais salants de Guérande — salicorne dans les bassins abandonnés ou en lisière. Les marais de Guérande en mai : biodiversité exceptionnelle, plantes halophytes partout.' },
        { nom: 'Nantes — Loire', lat: 47.22, lng: -1.55, type: 'halte', km: 280,
          ressources: ['Orties ★★★★★', 'Ail des ours ★★★★ (bois de Nantes)', 'Pissenlit ★★★★', 'Marché', 'Eau potable'],
          note: 'Nantes : grande halte. Bois autour de la ville : ail des ours encore présent début avril. Marché — compléments frais.' },
      ]
    },

    /* ---------------------------------------------
       PHASE R5 — BRETAGNE
       Avril (fin) → début mai · ~500 km
       Fil : Côte sauvage bretonne — la plus belle du retour
    --------------------------------------------- */
    {
      num: 5,
      label: 'PHASE R5 — BRETAGNE 🌊 APOGÉE',
      mois: 'Fin avril → début mai',
      pays: '🇫🇷',
      color: '#1a5a8a',
      zone: 'Nantes → Guerande → Quiberon → Lorient → Finistère → Saint-Malo',
      km: '~500 km',
      jours: '12 à 15 jours',
      intro: 'L\'apogée du retour. La Bretagne en mai est la région la plus productive de tout le trajet printanier : moules et huîtres sur toute la côte, algues comestibles en masse, criste marine sur les rochers, ajoncs en fleurs (sirop, tisane), orties et ail des ours dans les vallons intérieurs. Le GR34 longe la côte — sauvage, spectaculaire, peu habité.',
      etapes: [
        { nom: 'Quiberon — Presqu\'île', lat: 47.49, lng: -3.11, type: 'cueillette', km: 120,
          ressources: ['Moules ★★★★★ (côte sauvage Côte Sauvage Quiberon)', 'Criste marine ★★★★ (Crithmum maritimum — rochers)', 'Algues ★★★★★ (Laminaria, Fucus, Dulse)', 'Percebes ★★★ (pointes)', 'Ajoncs ★★★★ (fleurs — sirop, tisane)'],
          note: '⭐⭐⭐ SPOT BRETON MAJEUR. La Côte Sauvage de Quiberon est une des plus belles côtes de France — battue par l\'Atlantique, quasi-inaccessible par la route. Criste marine (fenouil de mer) : plante succulente des rochers, goût anisé-iodé unique, riche en vitamine C. Ajoncs en fleurs : infuser les fleurs (miel floral), ne pas manger les tiges piquantes.' },
        { nom: 'Lorient — Ria d\'Étel', lat: 47.75, lng: -3.36, type: 'cueillette', km: 170,
          ressources: ['Huîtres ★★★★★ (ria d\'Étel — production locale)', 'Moules ★★★★★', 'Orties ★★★★★ (vallons Scorff)', 'Ail des ours ★★★★ (forêts Scorff — encore présent)', 'Cresson ★★★★ (sources)'],
          note: 'Ria d\'Étel — zone de production d\'huîtres avec glanage libre sur estrans non-concédés. La vallée du Scorff : ail des ours encore en feuilles début mai dans les forêts fraîches.' },
        { nom: 'Concarneau — Finistère sud', lat: 47.87, lng: -3.92, type: 'cueillette', km: 240,
          ressources: ['Moules ★★★★★', 'Algues ★★★★★ (Bretagne = capitale algues France)', 'Criste marine ★★★★★', 'Dulse ★★★★ (Palmaria palmata — rouge, goût noix)', 'Varech ★★★ (Ascophyllum — iode)'],
          note: '⭐⭐⭐ SPOT ALGUES. La Bretagne est la 1ère région d\'Europe pour la diversité des algues comestibles. Dulse (Palmaria palmata) : algue rouge, goût de noisette, très protéinée. Sécher pour les semaines à venir.' },
        { nom: 'Crozon — Presqu\'île (Finistère)', lat: 48.25, lng: -4.49, type: 'bivouac', km: 320,
          ressources: ['Moules ★★★★★ (rade de Brest)', 'Huîtres ★★★★ (rade de Brest)', 'Algues ★★★★★', 'Criste marine ★★★★★', 'Ajoncs ★★★★★ (en pleine floraison)'],
          note: 'Presqu\'île de Crozon — un des endroits les plus sauvages de Bretagne, classé Grand Site de France. Ajoncs en pleine floraison en mai : fleurs jaunes partout, parfum de noix de coco. Bivouac sur les falaises.' },
        { nom: 'Brest — Rade', lat: 48.39, lng: -4.49, type: 'halte', km: 360,
          ressources: ['Marché (algues fraîches locales)', 'Moules ★★★★', 'Eau potable', 'Révision vélo'],
          note: 'Grande halte avant la remontée vers la Manche. Marché de Brest : algues fraîches, fruits de mer locaux.' },
        { nom: 'Saint-Brieuc — Côte du Goélo', lat: 48.51, lng: -2.76, type: 'cueillette', km: 430,
          ressources: ['Moules ★★★★★ (baie de Saint-Brieuc)', 'Huîtres ★★★★ (Paimpol)', 'Orties ★★★★★', 'Sureau (premières fleurs ★★★ — début mai)', 'Pissenlit ★★★★★'],
          note: 'Baie de Saint-Brieuc — très grands gisements de moules. Premières fleurs de sureau noir début mai : beignets de sureau, sirop, tisane. Les pissenlits sont encore en fleurs — beignets frits dans la farine de gland.' },
        { nom: 'Saint-Malo — Rance', lat: 48.65, lng: -2.02, type: 'halte', km: 500,
          ressources: ['Moules ★★★★★ (côte)', 'Huîtres ★★★★ (Cancale proche)', 'Orties ★★★★★', 'Criste marine ★★★★', 'Marché (Cancale — fruits de mer)'],
          note: 'Saint-Malo : halte avant la Normandie. Cancale à 15km : capitale française de l\'huître — glanage sur le GR34 à marée basse sur l\'estran public. Marché dominical : huîtres vendues directement par les ostréiculteurs.' },
      ]
    },

    /* ---------------------------------------------
       PHASE R6 — NORMANDIE → BAIE DE SOMME → ARTEMPS
       Mai · ~400 km
       Fil : Manche → Somme → Oise → Artemps
    --------------------------------------------- */
    {
      num: 6,
      label: 'PHASE R6 — NORMANDIE & BAIE DE SOMME 🏁',
      mois: 'Mai',
      pays: '🇫🇷',
      color: '#5a6a3a',
      zone: 'Saint-Malo → Mont-Saint-Michel → Normandie → Baie de Somme → Oise → Artemps',
      km: '~400 km',
      jours: '10 à 12 jours',
      intro: 'La dernière ligne droite. Mai en Normandie et en Baie de Somme : aster maritime (épinard de mer) au pic dans les prés salés, moules et huîtres jusqu\'au bout, sureau en fleurs, orties partout. Remonter l\'Oise vers Artemps — la boucle se referme sur les mêmes haies qu\'au départ, mais maintenant couvertes de pousses printanières fraîches.',
      etapes: [
        { nom: 'Mont-Saint-Michel — Baie', lat: 48.64, lng: -1.51, type: 'cueillette', km: 0,
          ressources: ['Moules ★★★★★ (bouchots Mont-Saint-Michel — AOC)', 'Agneau de pré-salé (laine) ★★ (pas de cueillette mais laine comestible !)', 'Aster maritime ★★★★ (prés salés — début)', 'Salicorne ★★★★★ (estuaire — mai = pic)', 'Orties ★★★★★'],
          note: '⭐⭐ SPOT MONT-SAINT-MICHEL. Les prés salés de la baie : aster maritime (Aster tripolium, dit "épinard de mer") très tendre en mai — goût entre épinard et betterave, très reminéralisant. Salicorne au pic absolu. Les bouchots de la baie produisent les meilleures moules de France.' },
        { nom: 'Granville — Côte des Havres', lat: 48.84, lng: -1.60, type: 'cueillette', km: 60,
          ressources: ['Moules ★★★★★ (havres normands)', 'Huîtres ★★★★ (Côte Ouest Cotentin)', 'Criste marine ★★★★ (falaises)', 'Sureau ★★★★ (fleurs — tisane, beignets)', 'Orties ★★★★★'],
          note: 'Les havres de la Côte Ouest du Cotentin — petits estuaires sauvages avec gisements de coquillages. Sureau en pleine floraison : beignets de ombelles dans la farine de gland.' },
        { nom: 'Cherbourg — Cap de la Hague', lat: 49.65, lng: -1.62, type: 'cueillette', km: 160,
          ressources: ['Algues ★★★★★ (Cap de la Hague — courants forts = algues géantes)', 'Moules ★★★★★', 'Orties ★★★★★', 'Sureau ★★★★ (fleurs)', 'Pissenlit ★★★★★ (falaises)'],
          note: 'Cap de la Hague — les courants très forts créent une richesse exceptionnelle en algues (Laminaria géantes). Zone très peu fréquentée. Reconstituer ici les stocks d\'algues séchées pour le retour final.' },
        { nom: 'Dieppe — Côte d\'Albâtre', lat: 49.92, lng: 1.08, type: 'cueillette', km: 260,
          ressources: ['Moules ★★★★ (galets côte d\'albâtre)', 'Criste marine ★★★★ (falaises crayeuses)', 'Orties ★★★★★', 'Sureau ★★★★', 'Gesses sauvages ★★★ (Lathyrus — début mai)'],
          note: 'Côte d\'Albâtre — falaises crayeuses blanches. Criste marine sur les falaises calcaires. Gesses sauvages (Lathyrus sylvestris) dans les ourlets des falaises : jeunes pousses comestibles.' },
        { nom: 'Baie de Somme — Saint-Valery', lat: 50.18, lng: 1.63, type: 'cueillette', km: 330,
          ressources: ['Aster maritime ★★★★★ (prés salés — pic mai)', 'Salicorne ★★★★★ (estuaire)', 'Moules ★★★★ (bouchots)', 'Orties ★★★★★', 'Sureau ★★★★ (fleurs)', 'Obione ★★★ (Halimione portulacoides — feuilles salines)'],
          note: '⭐⭐⭐ SPOT FINAL EXCEPTIONNEL. La Baie de Somme en mai : prés salés couverts d\'aster maritime (épinard de mer) et de salicorne au pic absolu. L\'obione (arroche des marais salants) : feuilles gris-argent charnues, très salines et iodées. C\'est le dernier grand spot sauvage avant Artemps.' },
        { nom: 'Abbeville — Vallée de la Somme', lat: 50.10, lng: 1.83, type: 'bivouac', km: 360,
          ressources: ['Orties ★★★★★ (berges Somme)', 'Ail des ours ★★★ (forêts alluviales — fin saison)', 'Cresson ★★★★ (fossés à courant)', 'Sureau ★★★ (fleurs)', 'Pissenlit ★★★★★'],
          note: 'Vallée de la Somme — retour aux paysages du départ. Orties partout sur les berges. Ail des ours encore possible dans les forêts alluviales fraîches. Cresson dans les fossés à courant.' },
        { nom: 'Péronne — Canal de la Somme', lat: 49.93, lng: 2.93, type: 'bivouac', km: 390,
          ressources: ['Orties ★★★★★', 'Cresson ★★★★ (canaux)', 'Pissenlit ★★★★', 'Mûres (premières fleurs — blanc)', 'Sureau (fleurs fin)'],
          note: 'Canal de la Somme — berges riches. Les mûriers commencent à fleurir : noter les haies pour le retour de l\'automne prochain.' },
        { nom: 'Artemps — RETOUR 🏁', lat: 49.76492, lng: 3.199, type: 'arrivee', km: 400,
          ressources: ['Orties ★★★★★ (haies des marais — pic mai)', 'Sureau ★★★★ (fleurs en pleine floraison)', 'Pissenlit ★★★★★ (prairies)', 'Cresson ★★★★ (fossés)', 'Premières fleurs de mûrier — baies en juillet'],
          note: '🏁 RETOUR À ARTEMPS. Les mêmes haies qu\'au départ — mais maintenant vertes et en fleurs. Mai à Artemps : orties au pic, sureau en fleurs, pissenlits partout. La boucle est bouclée. Les mûres seront mûres dans 2 mois — exactement pour repartir.' },
      ]
    }

  ] // fin phases retour
};
