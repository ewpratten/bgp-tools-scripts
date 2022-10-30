// ==UserScript==
// @name         BGP.tools NLNOG Looking Glass button
// @namespace    https://ewpratten.com
// @version      1.0
// @description  NLNOG Looking Glass button for BGP.tools
// @author       Evan Pratten <ewpratten@gmail.com>
// @match        https://bgp.tools/prefix/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bgp.tools
// ==/UserScript==


// Gets the ul object controlling the top tabs
function get_top_tabs() {
    return document.getElementsByClassName("section-tabs")[0].getElementsByTagName("ul")[0];
}

// Add an item to the top tab bar
function add_top_tab_item(name, url) {
    get_top_tabs().innerHTML += `<li class="custom-top-tab-item"><a href="${url}" target="_blank" rel="noreferrer">${name}</a></li>`;
}

// Get the page id (This is an ASN or prefix)
function get_page_id() {
    var path_parts = document.location.pathname.split("/");
    if (path_parts.length == 3) { return path_parts[2]; }
    if (path_parts.length >= 4) { return path_parts[2] + "/" + path_parts[3]; }
    return null;
}
// Entry
(function() {
    'use strict';
    
    // Get the prefix
    var prefix = get_page_id();
    var prefix_urlencode = encodeURI(prefix);

    // Add NLNOG button
    add_top_tab_item("NLNOG LG", `https://lg.ring.nlnog.net/prefix?q=${prefix_urlencode}&match=exact&peer=all`);
})();
