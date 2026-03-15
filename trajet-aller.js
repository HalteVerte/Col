/* trajet-aller.js — Artemps -> Lagos (Tracé A)
   TRAJET_COMPLET · 8 phases · ~5400km
*/

window.TRAJET_COMPLET = {
  titre: 'Artemps → Lagos',
  sous_titre: 'Vélo chargé · Mi-août → Janvier · ~5 400 km · France · Espagne · Portugal',
  km_total: 5400,
  logique: 'Fil de l\'eau + forêts sauvages + zéro trafic + constitution de stocks hivernaux progressifs',
  phases: [

    /* ---------------------------------------------
       PHASE 1 — ARDENNES → MEUSE → MOSELLE → SAÔNE
       Mi-août → fin août · ~480 km · 10-12 jours
       Fil : Oise → Canal des Ardennes → Meuse → Moselle → Voie Bleue
       Zéro trafic, forêts immenses, cueillette exceptionnelle
    --------------------------------------------- */
    {
      num: 1,
      label: 'PHASE 1 — ARDENNES & VALLÉES DE LA MEUSE ET MOSELLE',
      mois: 'Mi-août → fin août',
      pays: '🇫🇷',
      color: '#5a8a3a',
      zone: 'Artemps → Canal des Ardennes → Charleville → Verdun → Metz → Épinal → Vesoul → Chalon',
      km: '~480 km',
      jours: '10 à 12 jours',
      intro: 'Mi-août : plutôt que de foncer sur Paris/Fontainebleau (zones périurbaines denses), on remonte vers les Ardennes — forêt immense, quasi-déserte, zéro trafic, cueillette parmi les meilleures de France. Le Canal des Ardennes depuis l\'Oise mène directement à Charleville sans quitter les berges. Descente par la Meuse (piste cyclable continue) jusqu\'à Verdun, puis Moselle jusqu\'à Épinal, jonction avec la Voie Bleue via le Canal des Vosges. Détour réel de ~100 km mais qualité de roulage et de cueillette sans commune mesure.',
      stocks: 'Myrtilles séchées · Faînes torréfiées · Premières noisettes · Cuirs de mûres · Champignons séchés',
      etapes: [
        { nom: 'Artemps — Cimetière (DÉPART)', lat: 49.76492, lng: 3.199, type: 'depart', km: 0,
          ressources: ['Mûres ★★★★★ (haies des marais — pic mi-août)', 'Noisettes ★★★ (début de chute)', 'Sureau noir ★★★ (baies mûres — cuire ou sécher)', 'Tilleul ★★ (fleurs tardives en lisière)', 'Cresson (fossés à courant — cuire)', 'Prunelles (début, encore acides)'],
          note: 'DÉPART MI-AOÛT. Les haies bocagères des marais de l\'Aisne sont saturées de mûres. Sureau noir : baies noires brillantes — faire des cuirs ou sécher. Direction nord-est vers le Canal de la Sambre à l\'Oise, puis Canal des Ardennes.' },
        { nom: 'Chauny — Canal latéral à l\'Oise', lat: 49.62, lng: 3.22, type: 'bivouac', km: 35,
          ressources: ['Mûres ★★★★ (berges canal)', 'Pleurotes ★★ (peupliers canal — après pluie)', 'Noisettes ★★★', 'Sureau ★★★'],
          note: 'Canal latéral à l\'Oise — voie verte plate et sauvage. Cap plein nord vers le Canal des Ardennes. Peupliers en berge : pleurotes en huître sur les troncs morts après les pluies d\'août.' },
        { nom: 'Rethel — Canal des Ardennes', lat: 49.51, lng: 4.36, type: 'bivouac', km: 120,
          ressources: ['Mûres ★★★★★ (haies ardennaises)', 'Noisettes ★★★★ (noisetiers abondants)', 'Sureau ★★★', 'Noix (très début)', 'Pleurotes (aulnes berge)'],
          note: 'Entrée dans les Ardennes par le canal. Paysage bocager dense, haies non traitées, noisetiers partout. Rythme : 40-45 km/jour avec les sacoches, laisser du temps pour cueillir. L\'est de la France est bien moins cueilli que l\'ouest.' },
        { nom: 'Charleville-Mézières — Confluence Meuse', lat: 49.77, lng: 4.72, type: 'halte', km: 175,
          ressources: ['Noisettes ★★★★★ (vallée Meuse)', 'Mûres ★★★★', 'Faînes de hêtre ★★★ (hêtraies Ardennes)', 'Noix (début)', 'Marché'],
          note: '⭐ SPOT NOISETTES. La vallée de la Meuse entre Charleville et Givet est bordée de noisetiers sauvages en profusion — parmi les meilleures zones noisettes de France. Début de chute en mi-août. Ravitaillement eau et provisions sèches à Charleville avant de plonger dans la forêt ardennaise.' },
        { nom: 'Forêt des Ardennes — Hêtraies du plateau', lat: 49.90, lng: 4.95, type: 'cueillette', km: 210,
          ressources: ['Faînes de hêtre ★★★★★ (hêtraies monumentales)', 'Myrtilles ★★★★★ (landes acides — pic mi-août)', 'Cèpes ★★★★ (sous hêtres — après orages)', 'Chanterelles ★★★★', 'Noisettes ★★★★★'],
          note: '⭐⭐⭐ SPOT EXCEPTIONNEL. Les Ardennes belges et françaises abritent les plus grandes hêtraies continues de France — vieux hêtres, litière épaisse, ZÉRO cueilleur. Myrtilles en landes acides : pic absolu mi-août, faire des cuirs de myrtilles (conservation 6 mois, anti-diarrhéique précieux sur la route). Faînes : torréfier sur place et stocker. Cèpes après les orages d\'août.' },
        { nom: 'Verdun — Vallée de la Meuse', lat: 49.16, lng: 5.38, type: 'halte', km: 300,
          ressources: ['Noix ★★★★ (coteaux Meuse — début chute)', 'Noisettes ★★★★', 'Cynorrhodons ★★★ (haies)', 'Prunelles ★★★', 'Cornouilles ★★★ (très mûres fin août)', 'Eau potable'],
          note: 'La Meuse entre Charleville et Verdun est l\'une des meilleures pistes cyclables continues de France — trafic quasi nul. Coteaux calcaires : noyers et noisetiers sur les pentes. Cornouilles (Cornus mas) très mûres fin août — sécher pour stocks vitamines C.' },
        { nom: 'Metz — Moselle', lat: 49.12, lng: 6.18, type: 'halte', km: 370,
          ressources: ['Noix ★★★★★ (vergers mosellans)', 'Quetsches ★★★★ (vergers abandonnés — fin août)', 'Mirabelles ★★★★ (Lorraine — pic mi-août)', 'Cynorrhodons ★★★', 'Marché'],
          note: '⭐⭐ SPOT FRUITS LORRAINE. La Lorraine est le pays de la mirabelle — mi-août c\'est le pic absolu. Vergers abandonnés le long de la Moselle, fruits au sol gratuits. Quetsches (prunes sauvages) : faire des cuirs de fruits ou sécher. Noyers sur les coteaux. Metz : marché central, provisions.' },
        { nom: 'Épinal — Canal des Vosges', lat: 48.18, lng: 6.45, type: 'cueillette', km: 440,
          ressources: ['Myrtilles ★★★★ (lisières vosgienne)', 'Champignons ★★★★ (forêts vosgiennes — orages fin août)', 'Noisettes ★★★★', 'Framboises ★★★ (lisières claires)', 'Cynorrhodons ★★★'],
          note: 'Jonction avec le Canal des Vosges — voie verte continue jusqu\'à la Saône. Les lisières vosgienness en fin août : framboises sauvages encore présentes, myrtilles en altitude, premiers champignons après orages. La forêt vosgienne est très peu cueillie à cette période.' },
        { nom: 'Vesoul — Jonction Voie Bleue', lat: 47.62, lng: 6.15, type: 'halte', km: 480,
          ressources: ['Noix ★★★★ (Haute-Saône)', 'Noisettes ★★★★', 'Cynorrhodons ★★★★', 'Prunelles ★★★', 'Marché'],
          note: 'Jonction avec la Voie Bleue (EV6) via la Saône. De Vesoul à Lyon : voie verte quasi-continue, trafic nul, berges riches. Ajuster les stocks ici — on entre dans la phase Bourgogne.' },
      ]
    },

    /* ---------------------------------------------
       PHASE 2 — DÉTOUR MORVAN (2 jours)
       Début septembre · ~160 km · 4-5 jours
       Fil : Canal de Bourgogne → Morvan → retour Saône
       PRIORITÉ : constitution stocks hivernaux
    --------------------------------------------- */
    {
      num: 2,
      label: 'PHASE 2 — DÉTOUR MORVAN ⭐ STOCKS HIVERNAUX',
      mois: 'Début septembre',
      pays: '🇫🇷',
      color: '#3a6e28',
      zone: 'Chalon-sur-Saône → Autun → Lac des Settons → Avallon → retour Chalon',
      km: '~160 km détour',
      jours: '4 à 5 jours',
      intro: 'On arrive à Chalon par la Voie Bleue depuis Vesoul. Le détour Morvan s\'effectue en aller-retour depuis Chalon — 160 km de boucle dans le granit. Le Morvan en septembre cumule tout ce dont on a besoin : faînes de hêtre dans les hêtraies monumentales, cèpes et girolles, noisettes en profusion, glands de chêne sessile peu tanniques. Zone très sauvage, quasi sans cueilleurs. Prévoir 2 jours de transformation sur place.',
      stocks: '⭐ HALTE DE CONSTITUTION · Faînes torréfiées · Farine de gland · Champignons séchés · Noisettes',
      etapes: [
        { nom: 'Vézelay — Colline aux hêtres', lat: 47.46, lng: 3.74, type: 'cueillette', km: 0,
          ressources: ['Faînes de hêtre ★★★★★ (hêtraies sacrées)', 'Cèpes ★★★★ (sous hêtres)', 'Noisettes ★★★★', 'Cynorrhodons ★★★', 'Tilleul ★★★ (bois de Vézelay)'],
          note: '⭐⭐ SPOT FAÎNES. Les hêtraies autour de Vézelay sont exceptionnelles — vieux hêtres, litière épaisse, faînes abondantes début septembre. Torréfier 10 min à sec (élimine la fagine), conserver en bocal hermétique : 6 mois de conservation. Richesse : 40% lipides, protéines complètes, très énergétiques.' },
        { nom: 'Avallon — Porte du Morvan', lat: 47.49, lng: 3.91, type: 'bivouac', km: 30,
          ressources: ['Cèpes ★★★★★ (forêts granit)', 'Chanterelles ★★★★', 'Faînes ★★★★★', 'Myrtilles ★★★', 'Noisettes ★★★★'],
          note: 'Entrée dans le Morvan granitique — sol acide, hêtraies et chênaies denses. Le granit crée des conditions idéales pour les cèpes. Début septembre après pluie = jackpot champignons. Zone quasiment sans cueilleurs.' },
        { nom: 'Lac des Settons — Morvan central', lat: 47.22, lng: 4.04, type: 'cueillette', km: 80,
          ressources: ['Cèpes ★★★★★ (hêtraies lac)', 'Chanterelles ★★★★★', 'Trompettes ★★★ (début)', 'Faînes ★★★★★', 'Myrtilles ★★★', 'Noisettes ★★★★★'],
          note: '⭐⭐⭐ SPOT EXCEPTIONNEL — HALTE 2 JOURS. Les forêts autour du lac des Settons sont la meilleure zone champignons du Morvan. Champignons : sécher au soleil ou sur grille au-dessus du feu (active la vitamine D). Faînes : torréfier et stocker. Glands : lixiviation 48h dans le lac (eau courante = rapide). PRÉVOIR ICI LA TRANSFORMATION DES STOCKS avant de repartir.' },
        { nom: 'Château-Chinon — Morvan profond', lat: 47.06, lng: 3.93, type: 'cueillette', km: 105,
          ressources: ['Châtaignes ★★★★ (premières — début sept)', 'Cèpes ★★★★', 'Trompettes ★★★', 'Glands de chêne sessile ★★★★ (peu tanniques)', 'Faînes'],
          note: 'Premières châtaignes du trajet — début de chute en altitude. Le chêne sessile du Morvan produit des glands peu tanniques, lixiviation réduite à 24-36h. Bien noter : les châtaigniers du Morvan sont souvent en forêt domaniale = cueillette libre.' },
        { nom: 'Autun — Retour vers la Saône', lat: 46.95, lng: 4.30, type: 'halte', km: 135,
          ressources: ['Châtaignes ★★★★', 'Noix ★★★', 'Cèpes ★★★', 'Marché Autun'],
          note: 'Autun : dernier point de ravitaillement avant de rejoindre la Saône. Vérifier les stocks : champignons séchés, faînes torréfiées, noisettes, farine de gland. Ajuster le chargement — ne garder que ce qui se conserve.' },
      ]
    },

    /* ---------------------------------------------
       PHASE 3 — SAÔNE & BEAUJOLAIS
       Septembre (fin) → début octobre · ~240 km · 6 jours
       Fil : Saône (voie verte) → Beaujolais → Lyon
    --------------------------------------------- */
    {
      num: 3,
      label: 'PHASE 3 — SAÔNE & BEAUJOLAIS',
      mois: 'Fin septembre → début octobre',
      pays: '🇫🇷',
      color: '#9e3f20',
      zone: 'Chalon-sur-Saône → Mâcon → Villefranche → Lyon',
      km: '~240 km',
      jours: '6 à 7 jours',
      intro: 'La Saône à vélo : voie verte plate, peupleraies immenses en berge, noyers omniprésents sur les coteaux. Fin septembre : raisin sauvage concentré en sucres sur les vignes haies, noix au pic, pleurotes sur les peupliers après les pluies. Le Beaujolais granitique offre les premières châtaignes des versants nord.',
      stocks: 'Noix (ramassage sol) · Raisin séché (cuirs) · Pleurotes séchés',
      etapes: [
        { nom: 'Chalon-sur-Saône — Îles de Saône', lat: 46.78, lng: 4.85, type: 'bivouac', km: 0,
          ressources: ['Pleurotes ★★★★ (peupleraies bras morts)', 'Noix ★★★★ (coteaux)', 'Raisin sauvage ★★★ (vignes haies)', 'Glands (chêne pédonculé)', 'Cresson (bras de Saône — cuire)'],
          note: '⭐ SPOT PLEUROTES. Les peupleraies des bras morts de Saône sont exceptionnelles pour les pleurotes en huître en septembre-octobre. Bivouac facile sur les berges de gravier des îles.' },
        { nom: 'Tournus — Abbaye et coteaux', lat: 46.57, lng: 4.90, type: 'cueillette', km: 55,
          ressources: ['Noix ★★★★★ (noyers coteaux — pic)', 'Raisin sauvage ★★★★ (vignes abandonnées)', 'Cornouilles ★★★ (sécher)', 'Cynorrhodons ★★★'],
          note: 'Coteaux entre Saône et plateau — noyers partout, ramassage au sol. Les cornouilles séchées sont excellentes en hiver comme concentré de vitamine C.' },
        { nom: 'Mâcon — Porte du Beaujolais', lat: 46.31, lng: 4.83, type: 'halte', km: 120,
          ressources: ['Noix ★★★★', 'Raisin sauvage ★★★ (Beaujolais haies)', 'Marché', 'Eau potable'],
          note: 'Entrée dans le Beaujolais granitique — châtaigniers sur versants, vignes en haies. Marché : provisions sèches.' },
        { nom: 'Villefranche-sur-Saône — Beaujolais Vert', lat: 45.99, lng: 4.72, type: 'cueillette', km: 175,
          ressources: ['Châtaignes ★★★★ (versants granitiques)', 'Faînes de hêtre ★★★ (hêtraies Beaujolais vert)', 'Raisin sauvage ★★★', 'Trompettes ★★ (chênaies)', 'Noisettes ★★★'],
          note: '⭐⭐ SPOT CHÂTAIGNES & FAÎNES. Beaujolais Vert = granit = sol acide = châtaigniers et hêtres. Double récolte possible : châtaignes sur les versants + faînes dans les hêtraies d\'altitude. Trompettes dans les chênaies ombragées.' },
        { nom: 'Lyon — Confluence Rhône-Saône', lat: 45.75, lng: 4.83, type: 'halte', km: 240,
          ressources: ['Halles de Lyon (fruits de mer locaux)', 'Eau potable', 'Révision vélo'],
          note: 'Grande halte logistique. Réviser le vélo, recharger, réorganiser les stocks. Halles de Lyon : fruits de mer pour protéines avant la montée vers l\'Ardèche.' },
      ]
    },

    /* ---------------------------------------------
       PHASE 4 — CÉVENNES & PÉRIGORD NOIR
       Octobre · ~420 km · 10-12 jours
       Fil : Rhône → Ardèche (gorges) → Lot → Dordogne
       PRIORITÉ : châtaignes + noix + stocks lourds
    --------------------------------------------- */
    {
      num: 4,
      label: 'PHASE 4 — CÉVENNES & PÉRIGORD NOIR ⭐ STOCKS LOURDS',
      mois: 'Octobre',
      pays: '🇫🇷',
      color: '#7a4a20',
      zone: 'Lyon → Valence → Ardèche → Cévennes → Lot → Dordogne → Bergerac',
      km: '~420 km',
      jours: '10 à 12 jours',
      intro: 'Octobre est le mois des stocks lourds. Les châtaignes des Cévennes et de l\'Ardèche sont au pic absolu — ce sont les calories de base pour passer l\'hiver. Les noix du Périgord Noir sont parmi les meilleures de France. La Dordogne à vélo est une des plus belles rivières sauvages du pays. Prévoir du temps de transformation : séchage châtaignes, farine, cuirs.',
      stocks: '⭐ HALTE CRITIQUE · Châtaignes séchées/farine · Noix en coque · Farine de gland · Trompettes séchées',
      etapes: [
        { nom: 'Valence — Rhône et Vercors', lat: 44.93, lng: 4.89, type: 'bivouac', km: 0,
          ressources: ['Cynorrhodons ★★★★ (talus Rhône)', 'Noix ★★★ (début)', 'Glands de chêne vert ★★★ (peu tanniques)', 'Arbouses (début)', 'Romarin ★★'],
          note: 'Premiers chênes verts — glands doux, peu tanniques, lixiviation rapide (24h). Cynorrhodons sur tous les talus du Rhône. Arbousiers qui commencent à rougir.' },
        { nom: 'Aubenas — Ardèche centrale', lat: 44.62, lng: 4.39, type: 'cueillette', km: 90,
          ressources: ['Châtaignes ★★★★★ (châtaigneraies monumentales — forêts domaniales)', 'Arbouses ★★★★ (Arbutus unedo)', 'Cèpes tardifs ★★★', 'Trompettes ★★★', 'Cynorrhodons ★★'],
          note: '⭐⭐⭐ SPOT CHÂTAIGNES MAJEUR — FORÊTS DOMANIALES. L\'Ardèche produit plus de la moitié des châtaignes françaises. IMPORTANT : rester dans les forêts domaniales (panneaux ONF) — la cueillette y est libre. Arbouses : fruits orange-rouge à saveur de fraise, très sucrés en octobre, riches en vitamine C.' },
        { nom: 'Vallon-Pont-d\'Arc — Gorges sauvages', lat: 44.40, lng: 4.39, type: 'bivouac', km: 130,
          ressources: ['Arbouses ★★★★★ (gorges calcaires)', 'Glands chêne vert ★★★★ (doux)', 'Thym ★★★', 'Cynorrhodons ★★★', 'Olives sauvages ★★ (début)'],
          note: 'Micro-climat très doux des gorges. Bivouac sous les falaises — abris naturels. Arbousiers partout : récolte abondante. Chênes verts : glands peu amers = farine facile.' },
        { nom: 'Alès — Porte des Cévennes', lat: 44.12, lng: 4.08, type: 'cueillette', km: 185,
          ressources: ['Châtaignes ★★★★★ (Cévennes — forêts domaniales)', 'Trompettes de la mort ★★★★', 'Cèpes ★★★ (tardifs)', 'Faînes de hêtre ★★★ (hêtraies d\'altitude)', 'Noix ★★'],
          note: '⭐⭐⭐ SPOT CÉVENNES — HALTE 2 JOURS. Cévennes = châtaigneraies monumentales + hêtraies d\'altitude = double stock calorique. Trompettes de la mort en colonies sous les hêtres. Prévoir transformation : séchage châtaignes sur clayette (3-4 jours), farine de gland en parallèle.' },
        { nom: 'Millau — Causse du Larzac', lat: 44.10, lng: 3.08, type: 'cueillette', km: 260,
          ressources: ['Cynorrhodons ★★★★★ (causses calcaires)', 'Genièvre ★★★ (baies aromatiques)', 'Prunelles ★★★ (après gelée)', 'Thym ★★★', 'Glands de chêne pubescent ★★★'],
          note: 'Causses calcaires — flore très différente du reste du trajet. Cynorrhodons exceptionnels sur les causses secs : concentrés en vitamine C (20x plus qu\'un citron). Genévrier commun : baies séchées = condiment hivernal et antiseptique naturel.' },
        { nom: 'Figeac — Vallée du Lot', lat: 44.61, lng: 2.03, type: 'halte', km: 310,
          ressources: ['Noix ★★★★★ (Lot = zone mondiale)', 'Châtaignes tardives ★★★', 'Trompettes ★★★', 'Truffes (début décembre)', 'Eau'],
          note: 'Entrée dans la capitale mondiale de la noix. La vallée du Lot est jalonnée de noyers sur des kilomètres — ramassage au sol, entièrement gratuit et légal. La truffe noire commence en décembre : chercher au pied des chênes sur sol calcaire nu.' },
        { nom: 'Sarlat — Périgord Noir', lat: 44.89, lng: 1.22, type: 'cueillette', km: 380,
          ressources: ['Noix ★★★★★ (noyeraies immenses)', 'Trompettes ★★★★ (chênaies)', 'Cèpes tardifs ★★ (forêts domaniales)', 'Cynorrhodons ★★★', 'Truffes (début)'],
          note: '⭐⭐⭐ SPOT PÉRIGORD — HALTE TRANSFORMATION. Le Périgord Noir : noyeraies + forêts de chênes truffiers + trompettes tardives. HALTE LONGUE ICI : casser les noix et les mettre en sac hermétique (plus léger), sécher les derniers champignons, préparer la farine de gland pour les mois à venir. C\'est ici qu\'on finit de remplir les réserves avant les Pyrénées.' },
        { nom: 'Bergerac — Dordogne & Jonction sud', lat: 44.85, lng: 0.48, type: 'jonction', km: 420,
          ressources: ['Noix ★★★★★', 'Kaki abandonné ★★★ (très sucré oct)', 'Cynorrhodons ★★★', 'Cresson (Dordogne)', 'Raisin gelé ★★ (vignobles)'],
          note: '🔀 JONCTION PHASE 5. Bergerac : dernier bilan des stocks avant Pyrénées. Kakis abandonnés sur arbres oubliés — fruits ultra-sucrés en octobre. Vignobles : raisin gelé concentré sur les ceps. Préparer les sacoches pour 3 semaines sans cueillette dense.' },
      ]
    },

    /* ---------------------------------------------
       PHASE 5 — GASCOGNE, ARCACHON & PYRÉNÉES
       Fin octobre → début novembre · ~320 km · 8-9 jours
       Fil : Garonne → Bassin d'Arcachon → Adour → Pyrénées
       PRIORITÉ : protéines côtières avant l'Espagne
    --------------------------------------------- */
    {
      num: 5,
      label: 'PHASE 5 — GASCOGNE & ARCACHON 🦪 PROTÉINES',
      mois: 'Fin octobre → début novembre',
      pays: '🇫🇷',
      color: '#2d6e7a',
      zone: 'Bergerac → Marmande → Agen → Arcachon → Bayonne → St-Jean-Pied-de-Port',
      km: '~320 km',
      jours: '8 à 9 jours',
      intro: 'La phase la plus critique nutritionnellement. Avant d\'entrer en Espagne pour 3 semaines de Meseta sans protéines animales disponibles, il faut faire le plein au Bassin d\'Arcachon : huîtres, moules, palourdes. C\'est le seul point de protéines complètes gratuites entre le Périgord et le Portugal. Le détour vaut absolument le coup — 2 jours au bassin suffisent. Avant ça : kiwis abandonnés à Marmande et pleurotes sur les peupleraies de la Garonne.',
      stocks: 'Huîtres & moules (protéines immédiates) · Kiwis (vitamine C) · Pleurotes séchés',
      etapes: [
        { nom: 'Eymet — Dropt et peupleraies', lat: 44.67, lng: 0.39, type: 'cueillette', km: 0,
          ressources: ['Pleurotes ★★★★ (peupleraies Dropt)', 'Noix ★★★★', 'Prunelles ★★★ (après gelée — douces)', 'Cynorrhodons ★★★', 'Cornouilles séchées'],
          note: 'Peupleraies de la vallée du Dropt — pleurotes en huître sur troncs morts en octobre-novembre. Prunelles après la première gelée : l\'amertume disparaît, goût de pruneau concentré.' },
        { nom: 'Marmande — Kiwis de la Garonne', lat: 44.50, lng: 0.16, type: 'cueillette', km: 40,
          ressources: ['Kiwis abandonnés ★★★★★ (vergers semi-sauvages)', 'Noix ★★★', 'Pleurotes ★★★ (Garonne)', 'Cynorrhodons ★★'],
          note: '🔥 SPOT MÉCONNU MAJEUR. Marmande = 1ère région de France pour le kiwi. Vergers abandonnés ou glanage bords de route légal. Kiwis ultra-mûrs et sucrés en octobre-novembre : vitamine C concentrée + stockage possible 3 semaines à frais.' },
        { nom: 'Agen — Peupleraies de la Garonne', lat: 44.20, lng: 0.62, type: 'cueillette', km: 75,
          ressources: ['Pleurotes ★★★★★ (peupleraies Garonne)', 'Trompettes ★★★ (chênaies)', 'Noix ★★★', 'Cynorrhodons ★★'],
          note: '⭐ SPOT PLEUROTES. Les peupleraies alluviales de la Garonne à Agen sont exceptionnelles pour les pleurotes en huître en novembre froid et humide. Sécher ce qu\'on ne mange pas immédiatement.' },
        { nom: 'Bassin d\'Arcachon — HALTE PROTÉINES', lat: 44.65, lng: -1.17, type: 'cueillette', km: 165,
          ressources: ['Huîtres ★★★★★ (tables d\'ostréiculture abandonnées + zones libres)', 'Moules ★★★★★ (rochers Atlantique)', 'Palourdes ★★★★ (sable à marée basse)', 'Algues ★★★ (Fucus, Ulva)', 'Salicorne ★★★ (estuaires)'],
          note: '🌟 HALTE PROTÉINES INDISPENSABLE — 2 JOURS. Le Bassin d\'Arcachon est la seule source de protéines animales complètes gratuites entre le Périgord et le Portugal. À marée basse : huîtres sur les rochers et zones non-concédées (légal), palourdes dans le sable des zones classées libres, moules sur les pieux. Zinc, B12, fer, iode — tout ce dont le corps a besoin pour l\'hiver. Manger à satiété et sécher quelques algues.' },
        { nom: 'Bayonne — Côte basque', lat: 43.49, lng: -1.48, type: 'halte', km: 230,
          ressources: ['Moules ★★★★ (rochers côte basque)', 'Algues ★★★', 'Cynorrhodons ★★★ (haies basques)', 'Eau potable', 'Marché'],
          note: 'Côte basque — rochers à moules abondants. Réviser le vélo avant les Pyrénées. Cap sur Valcarlos puis descente directe vers Donostia et la côte cantabrique.' },
        { nom: 'Oloron-Sainte-Marie — Piémont pyrénéen', lat: 43.19, lng: -0.61, type: 'cueillette', km: 265,
          ressources: ['Cynorrhodons ★★★★★ (versants pyrénéens)', 'Châtaignes ★★★ (versants basques sous 600m)', 'Cresson ★★★ (sources montagne)', 'Noisettes (fin)'],
          note: 'Les Pyrénées béarnaises en novembre : versants couverts de cynorrhodons éclatants après les premières gelées. Châtaignes encore disponibles sous 600m côté basque (plus humide). Cresson dans les sources de montagne — eau propre ici, cuisson non nécessaire.' },
        { nom: 'Saint-Jean-Pied-de-Port — Roncevaux', lat: 43.16, lng: -1.24, type: 'halte', km: 320,
          ressources: ['Châtaignes ★★★ (versant basque)', 'Pommes sauvages ★★', 'Cynorrhodons ★★★', 'Albergue pèlerins (10€)', 'Route Valcarlos (col Ibañeta 1000m — ouverte toute l\'année)'],
          note: 'ROUTE PAR VALCARLOS — ROUTE PAR DÉFAUT. Avec les haltes de transformation en Cévennes et Périgord, on arrive ici en novembre : prendre la voie Valcarlos (col d\'Ibañeta, 1 000m), ouverte toute l\'année, 2km plus courte que la voie haute. La voie haute (col de Lepoeder, 1 432m) est fermée du 1er novembre au 31 mars — ne pas tenter avec un vélo chargé en conditions hivernales. Le chemin napoléonien par Valcarlos est magnifique et historiquement le tracé original.' },
      ]
    },

    /* ---------------------------------------------
       PHASE 6 — CÔTE CANTABRIQUE & GALICE
       Novembre · ~750 km · 16-18 jours
       Fil : Côte basque → Cantabrie → Asturies → Galice → Portugal nord
       Protéines animales continues · Température clémente · EuroVelo 1
    --------------------------------------------- */
    {
      num: 6,
      label: 'PHASE 6 — CÔTE CANTABRIQUE & GALICE 🌊',
      mois: 'Novembre',
      pays: '🇪🇸',
      color: '#2d5c7a',
      zone: 'St-Jean-Pied-de-Port → Donostia → Bilbao → Santander → Oviedo → La Corogne → Vigo → Portugal',
      km: '~750 km',
      jours: '16 à 18 jours',
      intro: 'La côte cantabrique en novembre : 12-15°C le jour, pluie fréquente mais jamais de gel, mer forte et belle. EuroVelo 1 longe la côte avec des portions sur voies vertes (vías verdes espagnoles). Les rochers à moules et percebes se succèdent sans interruption — protéines animales complètes gratuites tous les jours. Les Asturies en novembre = châtaignes tardives + champignons de sous-bois. La Galice est l\'une des régions les plus riches en coquillages sauvages d\'Europe. Plus long que la Meseta (~190 km de plus) mais chaud, nourri, et beau.',
      stocks: 'Algues séchées (Porphyra = nori atlantique) · Noix galiciennes · Châtaignes asturiennes séchées · Percebes séchés',
      etapes: [
        { nom: 'Valcarlos — Col d\'Ibañeta (1 000m)', lat: 43.07, lng: -1.32, type: 'bivouac', km: 0,
          ressources: ['Pommes sauvages ★★★ (vergers abandonnés versant basque)', 'Châtaignes ★★★ (sous 700m)', 'Eau de source ★★★★★', 'Cynorrhodons ★★★'],
          note: 'Passage col d\'Ibañeta (1 000m) par Valcarlos. Dernier col, après c\'est la côte. Bivouac dans les hêtraies du versant espagnol juste après le col.' },
        { nom: 'Donostia (Saint-Sébastien) — Côte basque', lat: 43.32, lng: -1.98, type: 'cueillette', km: 50,
          ressources: ['Moules ★★★★★ (rochers — Mytilus galloprovincialis géants)', 'Percebes ★★★★ (rochers exposés — Pollicipes pollicipes)', 'Algues ★★★★ (Porphyra, Fucus, Ulva)', 'Cynorrhodons ★★★', 'Châtaignes ★★★ (collines basques)'],
          note: '⭐⭐ PREMIER CONTACT CÔTE CANTABRIQUE. Rochers à marée basse : moules géantes (eau froide atlantique = croissance maximale), percebes sur les rochers battus par les vagues. Porphyra umbilicalis (nori atlantique) sur les rochers — sécher pour stocks. Les Txangurros (araignées de mer) parfois accessibles dans les creux à marée basse.' },
        { nom: 'Bilbao — Estuaire de la Nervión', lat: 43.26, lng: -2.93, type: 'halte', km: 120,
          ressources: ['Moules ★★★★★ (Ría de Bilbao)', 'Palourdes ★★★★ (estuaire — marée basse)', 'Algues ★★★★', 'Marché de la Ribera (plus grand marché couvert d\'Europe)'],
          note: 'Marché de la Ribera — poissons et coquillages à prix basques (très bas). Estuaire de la Nervión à marée basse : palourdes accessibles. Halte technique : réviser le vélo avant la Cantabrie.' },
        { nom: 'Castro Urdiales — Côte cantabrique', lat: 43.38, lng: -3.22, type: 'cueillette', km: 165,
          ressources: ['Moules ★★★★★', 'Berniques ★★★★ (patelles — Patella vulgata)', 'Algues ★★★★ (Laminaria — kelp)', 'Ortie ★★★ (falaises)', 'Pommes sauvages ★★★ (vergers abandonnés)'],
          note: 'Berniques (patelles) : mollusques coniques sur les rochers, grattés avec un couteau. Goût intense d\'iode. Laminaria (kelp) : grandes lames brunes, source d\'iode n°1 — sécher et émietter sur les repas. Vías verdes cantabriques démarrent ici.' },
        { nom: 'Santander — Bahía', lat: 43.46, lng: -3.80, type: 'halte', km: 230,
          ressources: ['Huîtres ★★★★ (baie — zones non-concédées)', 'Moules ★★★★★', 'Coques ★★★★ (sable baie à marée basse)', 'Algues ★★★★★', 'Marché'],
          note: '⭐⭐ SPOT BAIE DE SANTANDER. La baie est une zone de production ostréicole — zones non-concédées accessibles à marée basse. Coques dans le sable à pied. Halte longue possible (ville agréable, bivouac sur la plage hors saison).' },
        { nom: 'Comillas — Percebes & châtaignes', lat: 43.39, lng: -4.29, type: 'cueillette', km: 295,
          ressources: ['Percebes ★★★★★ (rochers cap Comillas — les meilleurs de Cantabrie)', 'Moules ★★★★★', 'Algues ★★★★ (Porphyra, Fucus)', 'Châtaignes ★★★★ (premières Asturies)'],
          note: '⭐⭐ CAP À PERCEBES. Le cap de Comillas est réputé pour ses percebes — mollusques pédonculés sur les rochers les plus exposés. Cueillette à marée basse uniquement, rochers glissants, gants indispensables. Rentrer légèrement dans les terres vers Cabezón pour les premières châtaigneraies asturiennes.' },
        { nom: 'Cangas de Onís — Cœur des Asturies', lat: 43.35, lng: -5.13, type: 'cueillette', km: 340,
          ressources: ['Châtaignes ★★★★★ (Picos de Europa — pic absolu novembre)', 'Champignons ★★★★★ (Boletus, Cantharellus, Lactarius — chênaies humides)', 'Noix ★★★★ (vergers abandonnés)', 'Myrtilles ★★★ (landes altitude)', 'Eau de source ★★★★★'],
          note: '⭐⭐⭐ SPOT MAJEUR ASTURIES — HALTE 1 JOUR. Cangas de Onís est au cœur des châtaigneraies asturiennes centenaires. Novembre = pic absolu : châtaignes grosses et douces, au sol en quantité. Les chênaies humides des Asturies produisent des champignons tardifs en novembre (boletus, chanterelles, lactaires). Sécher châtaignes + champignons avant de redescendre vers la côte.' },
        { nom: 'Gijón — Retour côte', lat: 43.54, lng: -5.66, type: 'cueillette', km: 390,
          ressources: ['Moules ★★★★★ (rochers Gijón)', 'Oursins ★★★★ (début saison)', 'Algues ★★★★★ (Laminaria géant)', 'Eau potable', 'Marché'],
          note: 'Retour sur la côte après le détour asturien. Gijón : grande ville, halte technique. Les rochers de la côte asturienne entre Gijón et Luarca sont parmi les plus riches en moules sauvages de toute la cantabrique. Laminaria digitata (kelp géant) abondant à marée basse — source d\'iode ★★★★★.' },
        { nom: 'Luarca — Costa Verde', lat: 43.54, lng: -6.54, type: 'cueillette', km: 470,
          ressources: ['Moules ★★★★★', 'Oursins ★★★★ (Paracentrotus lividus — pic novembre-mars)', 'Percebes ★★★★★', 'Algues ★★★★★', 'Châtaignes ★★★★ (dernières)'],
          note: '⭐⭐⭐ SPOT OURSINS. Novembre = début de saison des oursins (gonades pleines). Paracentrotus lividus sur les rochers peu profonds — ramasser avec des gants épais, ouvrir avec des ciseaux. Goût intense, protéines + oméga 3. Les percebes de Luarca sont réputés dans toute l\'Espagne.' },
        { nom: 'La Corogne — Cap Finisterre', lat: 43.37, lng: -8.40, type: 'cueillette', km: 590,
          ressources: ['Moules ★★★★★ (Ría de La Coruña)', 'Huîtres sauvages ★★★★ (Ostrea edulis)', 'Algues ★★★★★ (Laminaria, Porphyra, Chondrus)', 'Noix ★★★★ (Galice)', 'Percebes ★★★★★'],
          note: '⭐⭐⭐ ENTRÉE EN GALICE. La Galice est la région de coquillages la plus riche d\'Europe par concentration et diversité. Rias : estuaires peu profonds = glanage facile. Porphyra umbilicalis (nori) abondant sur les rochers — sécher au vent (2-3h) pour stocks longs. Chondrus crispus (mousse irlandaise) : gélifiant naturel pour cuisiner.' },
        { nom: 'Vigo — Rías Baixas', lat: 42.24, lng: -8.72, type: 'cueillette', km: 700,
          ressources: ['Moules ★★★★★ (Mytilus galloprovincialis — plus grosses d\'Europe)', 'Huîtres ★★★★★ (Ostrea edulis sauvages)', 'Palourdes ★★★★★ (zones libres rias)', 'Algues ★★★★★', 'Percebes ★★★★★'],
          note: '🌟 SPOT EXCEPTIONNEL — MEILLEURE ZONE COQUILLAGES DU TRAJET. Les Rías Baixas (Vigo, Pontevedra) sont la zone de production mytilicole la plus dense au monde. Zones non-concédées à marée basse : moules géantes sur les rochers, palourdes (amêijoas) dans le sable. Faire le plein de protéines avant d\'entrer au Portugal.' },
        { nom: 'Viana do Castelo — Entrée Portugal', lat: 41.69, lng: -8.83, type: 'halte', km: 750,
          ressources: ['Moules ★★★★★ (Ría Lima)', 'Palourdes ★★★★ (estuaire)', 'Algues ★★★★', 'Arbouses ★★★★ (medronheiro — très mûres)', 'Pignons ★★★ (premiers)'],
          note: 'Franchissement de la frontière portugaise par la côte — pont piéton/vélo sur le Minho à Valença. Viana do Castelo : Ría Lima pour les moules et palourdes. Arbousiers en fleurs et fruits simultanément (phénomène unique) : fruit rouge foncé très mûr, goût de fraise/litchi. Les arbousiers portugais sont les plus généreux d\'Europe.' },
      ]
    },


    /* ---------------------------------------------
       PHASE 7 — PORTUGAL : CÔTE + DÉTOUR SERRA DA GARDUNHA
       Fin novembre → mi-décembre · ~590 km · 14-16 jours
       Fil : Porto → côte atlantique → détour est Serra da Gardunha
             → retour Tomar → Nazaré → Peniche → Lisbonne → Sado
    --------------------------------------------- */
    {
      num: 7,
      label: 'PHASE 7 — PORTUGAL CÔTE & SERRA DA GARDUNHA',
      mois: 'Fin novembre → mi-décembre',
      pays: '🇵🇹',
      color: '#2d7a5c',
      zone: 'Viana do Castelo → Porto → Aveiro → Figueira → Serra da Gardunha → Tomar → Nazaré → Peniche → Lisbonne → Sado → Comporta',
      km: '~590 km',
      jours: '14 à 16 jours',
      intro: 'Depuis Viana do Castelo on descend plein sud le long de la côte atlantique — Porto, Aveiro, Figueira da Foz — puis un détour vers l\'est à Coimbra permet d\'atteindre la Serra da Gardunha pour le jackpot pignons et châtaignes tardives. Retour vers la côte par Tomar (orangeraies), puis Nazaré, Peniche, Lisbonne, Setúbal. 12-15°C le jour, nuits fraîches. Protéines animales continues sur la côte, lipides denses dans les pinèdes de montagne.',
      stocks: 'Pignons torréfiés (lipides denses) · Algues séchées (iode) · Zestes d\'orange séchés (vitamine C) · Châtaignes tardives',
      etapes: [
        { nom: 'Viana do Castelo — Ría Lima', lat: 41.69, lng: -8.83, type: 'cueillette', km: 0,
          ressources: ['Moules ★★★★★ (Ría Lima)', 'Palourdes ★★★★ (estuaire)', 'Algues ★★★★ (Fucus, Porphyra)', 'Arbouses ★★★★ (medronheiro — très mûres fin novembre)'],
          note: 'Première étape Portugal. Ría Lima : estuaire peu profond, palourdes accessibles à marée basse. Arbousiers (medronheiro) partout sur les talus — fruits rouge foncé très mûrs, goût unique entre fraise et litchi. Sécher pour stocks.' },
        { nom: 'Porto — Douro', lat: 41.15, lng: -8.61, type: 'halte', km: 60,
          ressources: ['Marché Bolhão (percebes, palourdes — prix portugais imbattables)', 'Oranges ★★★★ (arbres ornementaux)', 'Moules ★★★★★ (côte nord)', 'Recharge batterie'],
          note: 'Porto : grande halte. Marché Bolhão — percebes (anatifes), amêijoas, berbigão à prix locaux (palourdes 3-5€/kg). Orangers ornementaux partout en ville — fruit gratuit légal. Réviser le vélo, recharger la batterie.' },
        { nom: 'Aveiro — Ria', lat: 40.64, lng: -8.65, type: 'cueillette', km: 120,
          ressources: ['Palourdes ★★★★★ (Ria d\'Aveiro — production officielle)', 'Anguilles ★★★ (pêche ligne dans les chenaux)', 'Algues ★★★★ (Fucus, Ulva)', 'Coques ★★★ (sable ria)', 'Salicorne ★★'],
          note: '🌟 SPOT EXCEPTIONNEL PROTÉINES. La Ria d\'Aveiro est la plus grande lagune salée du Portugal — palourdes (amêijoas) en zones non-concédées à marée basse, glanage facile. Anguilles à la ligne dans les chenaux (fin novembre = bonne période). Zinc, B12, fer.' },
        { nom: 'Figueira da Foz — Atlantique', lat: 40.15, lng: -8.86, type: 'cueillette', km: 175,
          ressources: ['Moules ★★★★★ (rochers Atlantique — énormes en eau froide)', 'Algues ★★★★ (Porphyra — nori atlantique)', 'Palourdes ★★★ (estuaire Mondego)', 'Salicorne ★★★'],
          note: 'Embouchure du Mondego — premier estran vraiment atlantique. Moules géantes sur les rochers : eau froide de décembre = croissance maximale. Porphyra umbilicalis (nori) sur les rochers — sécher au vent 3-4h, stocker en pochon hermétique pour les semaines à venir.' },
        { nom: 'Coimbra — Pivot vers l\'est', lat: 40.21, lng: -8.43, type: 'halte', km: 210,
          ressources: ['Oranges ★★★★★ (arbres ornementaux partout en ville)', 'Marché da Graça (fruits de mer)', 'Eau potable', 'Recharge batterie'],
          note: 'Coimbra : pivot vers l\'est pour le détour Serra da Gardunha. Orangers ornementaux partout — fruit gratuit et légal. Marché da Graça : moules, palourdes, percebes à prix portugais. Faire le plein d\'eau et recharger avant le détour intérieur.' },
        { nom: 'Serra da Gardunha — HALTE PIGNONS', lat: 40.05, lng: -7.49, type: 'cueillette', km: 290,
          ressources: ['Pignons de pin parasol ★★★★★ (Pinus pinea — tombés au sol en masse)', 'Châtaignes tardives ★★★★ (châtaigneraies sous 700m)', 'Lactaires délicieux ★★★★ (Lactarius deliciosus — sous pins)', 'Olives semi-sauvages ★★★', 'Arbouses ★★★'],
          note: '⭐⭐⭐ SPOT MAJEUR — HALTE 2 JOURS. Serra da Gardunha : jackpot hivernal triple. Pignons de pin parasol (Pinus pinea) tombés au sol en quantité — extraire des cônes fermés en les chauffant au feu ou au soleil. 600 kcal/100g, 14g protéines, 50g lipides = la meilleure ration de route du trajet. Châtaignes encore productives en décembre à cette altitude. Lactaires délicieux (champignons orange vif) en colonies denses sous les pins.' },
        { nom: 'Tomar — Retour côte par le Nabão', lat: 39.60, lng: -8.41, type: 'cueillette', km: 380,
          ressources: ['Oranges abandonnées ★★★★★ (orangeraies semi-sauvages vallée Nabão)', 'Citrons ★★★★', 'Pignons ★★★ (pinèdes Templiers)', 'Cresson ★★★ (rivière Nabão — eau claire)', 'Kaki abandonné ★★★★'],
          note: 'La vallée du Nabão est jalonnée d\'orangeraies semi-abandonnées — oranges amères (Citrus aurantium) tombées au sol librement. Zestes séchés = aromatisant hivernal et vitamine C concentrée. Kakis (plaqueminiers) sur les terrasses en pierre : fruits translucides ultra-sucrés en décembre.' },
        { nom: 'Nazaré — Côte rocheuse', lat: 39.60, lng: -9.07, type: 'cueillette', km: 435,
          ressources: ['Moules ★★★★★ (rochers Nazaré)', 'Percebes ★★★★ (cap rocheux)', 'Algues ★★★★★ (Laminaria, Chondrus)', 'Sardines ★★★ (pêche ligne — novembre-décembre)'],
          note: 'Retour sur la côte atlantique. Nazaré est réputée pour ses vagues géantes — la côte exposée est très riche en percebes et moules. Pêche à la ligne depuis les rochers : sardines et lieus en novembre-décembre à cette latitude.' },
        { nom: 'Peniche — Cap rocheux', lat: 39.36, lng: -9.38, type: 'cueillette', km: 470,
          ressources: ['Percebes ★★★★★ (Peniche = capitale portugaise des percebes)', 'Moules ★★★★★', 'Algues ★★★★★ (Laminaria géant)', 'Palourdes ★★★ (lagune Óbidos proche)'],
          note: '⭐⭐ SPOT PERCEBES. Peniche est la capitale portugaise des percebes — les meilleurs de toute la côte. Rochers très exposés à l\'Atlantique, percebes énormes. Laminaria digitata (kelp géant) en grande quantité à marée basse — sécher et émietter, source d\'iode pour les semaines suivantes.' },
        { nom: 'Lisbonne — Tage', lat: 38.72, lng: -9.14, type: 'halte', km: 545,
          ressources: ['Palourdes ★★★★★ (estuaire Tage — zones libres)', 'Oranges ★★★★ (arbres en ville)', 'Algues ★★★ (côte Cascais)', 'Marché da Ribeira', 'Recharge batterie'],
          note: 'Grande halte. Marché da Ribeira : percebes, amêijoas, berbigão à prix portugais. Estuaire du Tage : palourdes à marée basse sur les vasières non-concédées. Révision vélo et recharge complète avant l\'Alentejo.' },
        { nom: 'Setúbal — Estuaire du Sado', lat: 38.52, lng: -8.89, type: 'cueillette', km: 575,
          ressources: ['Huîtres ★★★★★ (Sado — glanage zones libres)', 'Palourdes ★★★★★ (Ria de Setúbal)', 'Algues ★★★★', 'Salicorne ★★★', 'Moules ★★★'],
          note: '🌟 SPOT EXCEPTIONNEL. L\'estuaire du Sado : huîtres et palourdes sur zones non-concédées à marée basse — la plus grande concentration de protéines animales gratuites de tout le trajet.' },
        { nom: 'Comporta — Pinèdes littorales', lat: 38.38, lng: -8.78, type: 'bivouac', km: 590,
          ressources: ['Pignons ★★★★★ (Pinus pinea littoraux — complement Serra da Gardunha)', 'Algues ★★★ (côte sauvage)', 'Palourdes ★★★', 'Oranges ★★★ (vergers proches)', 'Romarin en fleurs ★★★'],
          note: '⭐⭐ SPOT PIGNONS LITTORAUX. Comporta : immenses pinèdes de pin parasol sur sable — pignons au sol en complément de la Serra da Gardunha. Côte quasi-déserte en hiver, bivouac facile dans les pins. Porte de l\'Alentejo.' },
      ]
    },

    /* ---------------------------------------------
       PHASE 8 — PORTUGAL SUD : ALENTEJO & ALGARVE
       Mi-décembre → mi-janvier · ~260 km · mode slow
       Fil : Sado → Côte Vicentine → Lagos
    --------------------------------------------- */
    {
      num: 8,
      label: 'PHASE 8 — ALENTEJO & ALGARVE 🌸 ARRIVÉE',
      mois: 'Mi-décembre → mi-janvier',
      pays: '🇵🇹',
      color: '#2c5e2a',
      zone: 'Comporta → Santiago do Cacém → Côte Vicentine → Sagres → Lagos',
      km: '~260 km',
      jours: '10 à 14 jours (mode slow)',
      intro: 'Le paradis hivernal. 14-18°C le jour en décembre-janvier. Oranges et agrumes gratuits partout, asperges sauvages dès janvier, percebes et algues sur la Côte Vicentine sauvage. Lagos : amandiers en fleurs mi-janvier, Ria de Alvor pour les palourdes, mode slow mérité après 5 400 km.',
      stocks: 'Agrumes (vitamine C) · Algues séchées (iode, minéraux) · Caroube (calories sucrées)',
      etapes: [
        { nom: 'Comporta — Départ Alentejo', lat: 38.38, lng: -8.78, type: 'cueillette', km: 0,
          ressources: ['Pignons ★★★★★ (pinèdes Comporta)', 'Palourdes ★★★ (plage Tróia)', 'Oranges ★★★★ (vergers proches)', 'Romarin en fleurs ★★★'],
          note: 'Départ phase finale. Les pinèdes littorales de Comporta/Tróia prolongent les stocks de pignons de la Serra da Gardunha. Plage de Tróia : palourdes dans le sable à marée basse. Cap plein sud vers l\'Alentejo.' },
        { nom: 'Santiago do Cacém — Alentejo litoral', lat: 37.99, lng: -8.69, type: 'cueillette', km: 60,
          ressources: ['Asperges sauvages ★★★★★ (Asparagus aphyllus — dès janvier ici)', 'Caroube ★★★★★ (gousses séchées au sol — très caloriques)', 'Oranges ★★★★★', 'Olives abandonnées ★★★'],
          note: '⭐⭐ SPOT ASPERGES. L\'Alentejo litoral est le seul endroit du trajet où les asperges sauvages (Asparagus aphyllus) apparaissent dès décembre-janvier — uniques sur tout le parcours. Caroube en masse sur les chemins : gousses séchées au sol, 40% de sucres naturels, très caloriques, bonnes à croquer directement.' },
        { nom: 'Vila do Bispo — Côte Vicentine sauvage', lat: 37.08, lng: -8.91, type: 'cueillette', km: 225,
          ressources: ['Algues ★★★★★ (Laminaria, Fucus, Porphyra, Chondrus)', 'Percebes ★★★★★ (rochers Atlantique)', 'Moules ★★★★ (sauvages)', 'Salicorne ★★'],
          note: '🌟 SPOT EXCEPTIONNEL — CÔTE LA PLUS SAUVAGE DU TRAJET. Parc Naturel Côte Vicentine : côte rocheuse battue par l\'Atlantique, quasi-déserte en janvier. Algues en masse à marée basse : Chondrus crispus (mousse irlandaise — riche en carraghénanes et minéraux), Laminaria (kelp — iode ★★★★★), Porphyra (nori). Percebes (anatifes) sur les rochers exposés : protéines + iode + zinc concentrés.' },
        { nom: 'Sagres — Cap Saint-Vincent', lat: 37.01, lng: -8.94, type: 'cueillette', km: 242,
          ressources: ['Algues ★★★★★ (estran exceptionnel)', 'Percebes ★★★★', 'Moules ★★★★', 'Cynorrhodons ★★ (derniers, falaises)'],
          note: 'Pointe sud-ouest de l\'Europe — exposition maximale à l\'Atlantique, richesse de l\'estran exceptionnelle. Récolter et sécher des algues pour les semaines à venir : Porphyra séchée = chips iodées, Laminaria séchée = poudre d\'iode pour toute la saison.' },
        { nom: 'Lagos — ARRIVÉE 🏁', lat: 37.11057, lng: -8.66787, type: 'arrivee', km: 260,
          ressources: ['Palourdes ★★★★★ (Ria de Alvor — exceptionnelle)', 'Oranges ★★★★★', 'Caroube ★★★★', 'Figues de Barbarie ★★★ (raquettes cuites = légume)', 'Amandiers en fleurs ★★★★★ (mi-janvier — spectacle unique)', 'Percebes ★★★ (côte rocheuse)'],
          note: '🏁 ARRIVÉE. Lagos, Algarve rocheuse et ensoleillée. La Ria de Alvor à l\'ouest : zone de palourdes exceptionnelle, facile à pied. Amandiers en fleurs mi-janvier : le Portugal explose de blanc et de rose — un des plus beaux spectacles naturels d\'Europe. Mode slow ici — s\'installer quelques semaines, reconstituer les réserves, préparer la suite.' },
      ]
    }

  ] // fin phases
};
