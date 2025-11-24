//   QUANTUM EDGE v4.6

// ----- Navigation -----
function showSection(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add("active");
  localStorage.setItem("lastSection", id);
}

// ----- Simple Calculator -----
const simpleDisplay = document.getElementById("simple-display");
function appendToSimple(v){ simpleDisplay.value += v; }
function clearSimple(){ simpleDisplay.value = ""; }
function calculateSimple(){
  try{ simpleDisplay.value = eval(simpleDisplay.value); }
  catch{ simpleDisplay.value = "Error"; }
}

// ----- Scientific Calculator -----
const sciDisplay = document.getElementById("scientific-display");
function appendToScientific(v){ sciDisplay.value += v; }
function clearScientific(){ sciDisplay.value = ""; }
function calculateScientific(){
  try{ sciDisplay.value = eval(sciDisplay.value.replace("^","**")); }
  catch{ sciDisplay.value = "Error"; }
}
function sciFunc(f){
  const val = parseFloat(sciDisplay.value); if(isNaN(val)) return;
  const d = Math.PI/180;
  const ops = {
    sin: Math.sin(val*d), cos: Math.cos(val*d),
    tan: Math.tan(val*d), sqrt: Math.sqrt(val), log: Math.log10(val)
  };
  sciDisplay.value = ops[f];
}

// ----- Converters -----
const rates={USD:{USD:1,EUR:.85,RWF:1300,KES:110},EUR:{USD:1.18,EUR:1,RWF:1534,KES:130},RWF:{USD:.00077,EUR:.00065,RWF:1,KES:.084},KES:{USD:.0091,EUR:.0077,RWF:11.9,KES:1}};
function convertMoney(){
  const a=parseFloat(document.getElementById("money-input").value),
        f=document.getElementById("from-currency").value,
        t=document.getElementById("to-currency").value;
  if(isNaN(a))return;
  const r=a*rates[f][t];
  document.getElementById("money-result").textContent=`${a} ${f} = ${r.toFixed(2)} ${t}`;
}
const unitFactors={m:1,km:1000,cm:.01};
function convertUnit(){
  const v=parseFloat(document.getElementById("unit-input").value),
        f=document.getElementById("from-unit").value,
        t=document.getElementById("to-unit").value;
  if(isNaN(v))return;
  const r=(v*unitFactors[f])/unitFactors[t];
  document.getElementById("unit-result").textContent=`${v} ${f} = ${r.toFixed(2)} ${t}`;
}

// ----- Theme & Language -----
const translations={
  English:{menu:{home:"Home",money:"Money Converter",unit:"Unit Converter",calc:"Calculators",simple:"Simple",scientific:"Scientific",about:"About",contact:"Contact",settings:"Settings"},
           about:"About Us",contact:"Contact Us",footer:"All rights reserved © 2025"},
  French:{menu:{home:"Accueil",money:"Convertisseur d'argent",unit:"Convertisseur d'unités",calc:"Calculatrices",simple:"Simple",scientific:"Scientifique",about:"À propos",contact:"Contact",settings:"Paramètres"},
          about:"À propos de nous",contact:"Contactez-nous",footer:"Tous droits réservés © 2025"},
  Swahili:{menu:{home:"Nyumbani",money:"Kibadilisha Pesa",unit:"Kibadilisha Vipimo",calc:"Kikokotoo",simple:"Rahisi",scientific:"Kisayansi",about:"Kuhusu",contact:"Wasiliana",settings:"Mipangilio"},
           about:"Kuhusu Sisi",contact:"Wasiliana Nasi",footer:"Haki zote zimehifadhiwa © 2025"},
  Kinyarwanda:{menu:{home:"Ahabanza",money:"Guhindura Ifaranga",unit:"Guhindura Ibipimo",calc:"Mubazi",simple:"Yoroshye",scientific:"Y'Ubushakashatsi",about:"Ibyerekeye",contact:"Tuvugishe",settings:"Amagenamiterere"},
               about:"Ibyerekeye Twebwe",contact:"Tuvugishe",footer:"Uburenganzira bwose burabitswe © 2025"},
  Arabic:{menu:{home:"الرئيسية",money:"محول العملات",unit:"محول الوحدات",calc:"الآلات الحاسبة",simple:"بسيطة",scientific:"علمية",about:"معلومات عنا",contact:"اتصل بنا",settings:"الإعدادات"},
          about:"معلومات عنا",contact:"اتصل بنا",footer:"© 2025 جميع الحقوق محفوظة"}
};

function changeLanguage(lang){
  const select=document.getElementById("language-select");
  const chosen=lang||select.value||"English";
  const t=translations[chosen]; if(!t)return;
  // Titles
  document.getElementById("about-title").textContent=t.about;
  document.getElementById("contact-title").textContent=t.contact;
  document.getElementById("footer-text").textContent=t.footer;
  // Menu
  document.getElementById("menu-home").textContent=t.menu.home;
  document.getElementById("menu-money").textContent=t.menu.money;
  document.getElementById("menu-unit").textContent=t.menu.unit;
  document.getElementById("menu-calculators").textContent=t.menu.calc;
  document.getElementById("menu-simple").textContent=t.menu.simple;
  document.getElementById("menu-scientific").textContent=t.menu.scientific;
  document.getElementById("menu-about").textContent=t.menu.about;
  document.getElementById("menu-contact").textContent=t.menu.contact;
  document.getElementById("menu-settings").textContent=t.menu.settings;
  // Save
  localStorage.setItem("language",chosen);
}
function saveSettings(){
  const theme=document.getElementById("theme-select").value,
        lang=document.getElementById("language-select").value;
  document.body.className=`theme-${theme}`;
  localStorage.setItem("theme",theme);
  localStorage.setItem("language",lang);
  changeLanguage(lang);
}
function applySettings(){
  const th=localStorage.getItem("theme")||"default",
        lg=localStorage.getItem("language")||"English";
  document.body.className=`theme-${th}`;
  document.getElementById("theme-select").value=th;
  document.getElementById("language-select").value=lg;
  changeLanguage(lg);
}

// ----- Init -----
window.addEventListener("DOMContentLoaded",()=>{
  applySettings();
  const last=localStorage.getItem("lastSection")||"home";
  showSection(last);
});
