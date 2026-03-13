/* stocks.js — Source unique pour les stocks La Boucle Sauvage
   Utilisé par carnet.html (inventaire) et 6bl.js (seuils)
   Total max ~9kg + 1kg marge = 10kg avec remorque-roue
*/
window.STOCKS_INITIAUX = [
  { id:"myrtilles",    icon:"🫐", name:"Myrtilles séchées",   max:500,  unit:"g" },
  { id:"faines",       icon:"🌰", name:"Faînes torréfiées",   max:1000, unit:"g" },
  { id:"noisettes",    icon:"🥜", name:"Noisettes",           max:800,  unit:"g" },
  { id:"champignons",  icon:"🍄", name:"Champignons séchés",  max:400,  unit:"g" },
  { id:"chataignes",   icon:"🌰", name:"Châtaignes séchées",  max:2000, unit:"g" },
  { id:"noix",         icon:"🪨", name:"Noix cerneaux",       max:1500, unit:"g" },
  { id:"pignons",      icon:"🌿", name:"Pignons torréfiés",   max:600,  unit:"g" },
  { id:"algues",       icon:"🌊", name:"Algues séchées",      max:300,  unit:"g" },
  { id:"cynorhodons",  icon:"🔴", name:"Cynorrhodons séchés", max:400,  unit:"g" },
  { id:"zestes",       icon:"🍊", name:"Zestes agrumes",      max:200,  unit:"g" },
  { id:"farine_gland", icon:"🌾", name:"Farine de gland",     max:1000, unit:"g" },
  { id:"caroube",      icon:"🟫", name:"Caroube",             max:500,  unit:"g" },
];

// Index rapide id → max (utilisé par 6bl.js)
window.STOCKS_MAX = Object.fromEntries(
  window.STOCKS_INITIAUX.map(s => [s.id, s.max])
);
