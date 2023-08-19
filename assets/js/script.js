'use strict';



/**
 * addEvent on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/** SCRIPT GOOGLE SHEETS */
async function fetchSheetData() {
  try {
      const apiKey = 'AIzaSyAVNZSNEjtaRQ1Rv_bzIU-yG7DuUOfJnOk';
      const spreadsheetId = '11Y4A_BNlSjrxyGV7L_bRbBWzkhpkvSu-Hmk4PHAK_ac';
      const sheetName = 'dados';

      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`);
      const data = await response.json();

      const desiredID = document.getElementById('empresaID').textContent; // Pega o ID desejado do seu HTML
      let nomeEmpresa, informacao;

      for (let row of data.values) {
          if (row[0] == desiredID) { // empresaID na primeira coluna
              nomeEmpresa = row[1]; // nome da empresa na segunda coluna
              informacao = row[2]; // informação na terceira coluna
              break; // sair do loop assim que encontrar
          }
      }

      document.body.innerHTML = document.body.innerHTML.replace(/NOME DA EMPRESA/g, nomeEmpresa);
      document.body.innerHTML = document.body.innerHTML.replace(/INFORMAÇÃO/g, informacao);

  } catch (error) {
      console.error('There was a problem:', error);
  }
}

window.onload = fetchSheetData;






/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
}

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNav);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});