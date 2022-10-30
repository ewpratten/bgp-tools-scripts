// ==UserScript==
// @name         BGP.tools Peering Capacity Display
// @namespace    http://kjartan.io/
// @version      0.1
// @description  Displays the total IX peering capacity of any given network on BGP.tools
// @author       Kjartan Hrafnkelsson
// @match        https://bgp.tools/as/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bgp.tools
// @grant        none
// ==/UserScript==

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1000
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['bps', 'kbps', 'mbps', 'gbps', 'tbps', 'pbps', 'ebps', 'zbps', 'ybps']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

(function() {
    'use strict';
	let _s = [];
	let _c = 0;
	document.querySelector('#ix-page').querySelectorAll('table').forEach(e => e.querySelectorAll('tr').forEach(b => b.querySelectorAll('td')[4] !== undefined ? _s.push(b.querySelectorAll('td')[4].textContent) : null));
	_s.forEach(e => {
		let _e = e.split(' ')
		if (_e[1] === "mbps") _c = _c + parseInt(_e[0])
		else if (_e[1] === "gbps") _c = _c + parseInt(_e[0]) * 1000
		else if (_e[1] === "tbps") _c = _c + parseInt(_e[0]) * 1000000
	});
	let _f = formatBytes(_c * 1000000);
	if (document.querySelector('#peering-capacity')) document.querySelector('#peering-capacity').innerHTML = _f
	else {
		document.querySelector('#network-number').style.marginBottom = "0px";
		document.querySelector('.network-header').innerHTML = document.querySelector('.network-header').innerHTML + "<p style='margin-top:0;'>IX Peering Capacity <strong id='peering-capacity'>" + _f + "</strong></p>";
	}
        console.log('[ixp-capacity-plugin] calculated peering capacity (inital page load).');
})();
