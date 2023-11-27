// ==UserScript==
// @name         BGP.tools Peering Capacity Display
// @namespace    http://kjartan.io/
// @version      0.2
// @updateURL    https://raw.githubusercontent.com/ewpratten/bgp-tools-scripts/master/scripts/ixp-peering-capacity.js
// @downloadURL  https://raw.githubusercontent.com/ewpratten/bgp-tools-scripts/master/scripts/ixp-peering-capacity.js
// @description  Displays the total IX peering capacity of any given network on BGP.tools
// @author       Kjartan Hrafnkelsson <kjh14@hi.is>
// @match        https://bgp.tools/as/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bgp.tools
// @grant        none
// ==/UserScript==

function formatBps(bps, decimals = 2) {
  const sizes = ['bps', 'kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps'];
  const i = Math.floor(Math.log(+bps) / Math.log(1000));
  return `${((+bps / Math.pow(1000, i)).toFixed(Math.max(0, decimals)))} ${sizes[i]}`;
}

function parseBps(text) {
  if (text == 'n/a') return 0;

  const [s, u] = text.split(' ');
  const unit = u.toLowerCase();
  const sizes = ['bps', 'kbps', 'mbps', 'gbps', 'tbps', 'pbps', 'ebps', 'zbps', 'ybps'];
  if (!sizes.includes(unit) || !+s) return 0;
  return s * Math.pow(1000, sizes.indexOf(unit));
}

function getOrCreateField() {
  const field = document.querySelector('#peering-capacity');
  if (field) return field;

  const p = document.createElement('p');
  p.style.marginTop = 0;
  p.innerText = 'IX Peering Capacity ';

  const strong = document.createElement('strong');
  strong.id = 'peering-capacity';
  p.appendChild(strong);

  document.querySelector('#network-number').style.marginBottom = 0;
  document.querySelector('.network-header').appendChild(p);
  return strong;
}

(function () {
  let capacity = 0;
  document.querySelector('#ix-page').querySelectorAll('table tr').forEach(e => {
    const speed = e.querySelectorAll('td')[4];
    if (speed) capacity += parseBps(speed.textContent);
  });
  getOrCreateField().innerText = formatBps(capacity);

  console.log('[ixp-capacity-plugin] calculated peering capacity (inital page load).');
})();
