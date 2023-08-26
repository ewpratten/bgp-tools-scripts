// ==UserScript==
// @name         BGP.tools NLNOG Looking Glass button
// @namespace    https://ewpratten.com
// @version      1.0
// @description  NLNOG Looking Glass button for BGP.tools
// @author       Evan Pratten <ewpratten@gmail.com>
// @match        https://bgp.tools/prefix/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bgp.tools
// @require      https://raw.githubusercontent.com/Ssmidge/bgp-tools-scripts/master/scripts/utils.js
// ==/UserScript==

// Entry
(function() {
    'use strict';
    
    // Get the prefix
    var prefix = get_page_id();
    var prefix_urlencode = encodeURI(prefix);

    // Add NLNOG button
    add_top_tab_item("NLNOG LG", `https://lg.ring.nlnog.net/prefix?q=${prefix_urlencode}&match=exact&peer=all`);
})();
