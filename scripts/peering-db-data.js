// ==UserScript==
// @name         BGP.tools - PeeringDB Integration
// @namespace    https://ewpratten.com
// @version      1.0
// @description  PeeringDB integration for BGP.tools
// @author       Evan Pratten <ewpratten@gmail.com>
// @match        https://bgp.tools/as/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bgp.tools
// @requires     https://raw.githubusercontent.com/Ewpratten/bgp-tools-scripts/master/scripts/utils.js
// ==/UserScript==

const PEERINGDB_API_KEY = "<your_api_key>";

// Entry
(function () {
    'use strict';

    // Inject custom styles
    document.head.innerHTML += `
    <style>
        .section-tabs ul li a {
            padding: 11px 11px 9px 9px;
        }
    </style>`;
    document.head.innerHTML += `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
    `;

    // Add PeeringDB button
    add_top_tab_item(`<img src="https://www.google.com/s2/favicons?sz=64&domain=peeringdb.com" style="width:16px;">`, `https://peeringdb.com/asn/${get_page_id()}`);

    // Handle adding a domain query button
    var asn_info_text = document.getElementById("network-number").innerText;
    if (asn_info_text.includes("Website")) {
        console.log("Attempting to patch domain query button");
        var url = asn_info_text.match(/^Website (?<url>.*)$/m).groups.url;
        var domain = (new URL(url)).hostname;
        document.getElementById("network-number").innerHTML += ` <strong>(<a href="/dns/${domain}">Query</a>)</strong>`;
    }

    // Move the network name to above the image and info
    document.getElementById("network-name").parentElement.parentElement.prepend(document.getElementById("network-name"));
    document.getElementsByClassName("network-header")[0].prepend(document.createElement("br"));
    document.getElementsByClassName("network-header")[0].prepend(document.createElement("hr"));

    // In-fill data from PeeringDB
    fetch(
        `https://www.peeringdb.com/api/net?asn=${get_page_id()}`,
        {
            headers: {
                'Authorization': `Api-Key ${PEERINGDB_API_KEY}`
            }
        }
    ).then(
        resp => resp.json().then(
            data => {
                // Skip if there is no result for this asn
                if (data.data.length == 0) { return; }
                var asn_info = data.data[0];
                console.log(asn_info);

                // Substitute the network name
                var existing_name = document.getElementById("network-name").innerText;
                if (existing_name != asn_info.name) {
                    document.getElementById("network-name").innerText = asn_info.name;
                    document.getElementById("network-name").title = `Community submission: ${existing_name}`;
                    document.getElementById("network-name").style.borderBottom = "3px dashed #e3e3e3";
                    document.getElementById("network-name").style.width = "max-content";
                    document.getElementById("network-name").style.cursor = "help";
                    document.head.getElementsByTagName("title")[0].innerText = `AS${get_page_id()} ${asn_info.name} - bgp.tools`;
                }

                // Add extra info from PDB
                if (asn_info.info_traffic) {
                    document.getElementById("network-number").innerHTML += `<br>Traffic <strong>${asn_info.info_traffic}</strong>`;
                    if (asn_info.info_ratio) {
                        document.getElementById("network-number").innerHTML += ` <strong>(${asn_info.info_ratio})</strong>`;
                    }
                }
                if (asn_info.policy_general) {
                    document.getElementById("network-number").innerHTML += `<br>Peering <strong>${asn_info.policy_general}</strong>`;
                }
                if (asn_info.irr_as_set) {
                    document.getElementById("network-number").innerHTML += `<br>Default as-set <strong><a href="https://irrexplorer.nlnog.net/as-set/${asn_info.irr_as_set}">${asn_info.irr_as_set}</a></strong>`;
                }

                // Add network link buttons
                if (asn_info.looking_glass) {
                    add_top_tab_item(`<i class="fa-solid fa-magnifying-glass"></i>`, asn_info.looking_glass);
                }
                if (asn_info.route_server) {
                    add_top_tab_item(`<i class="fa-solid fa-server"></i>`, asn_info.route_server);
                }
                if (asn_info.status_dashboard) {
                    add_top_tab_item(`<i class="fa-solid fa-circle-info"></i>`, asn_info.status_dashboard);
                }

                // Add even more data using the org info
                fetch(
                    `https://www.peeringdb.com/api/org/${asn_info.org_id}`,
                    {
                        headers: {
                            'Authorization': `Api-Key ${PEERINGDB_API_KEY}`
                        }
                    }
                ).then(
                    resp => resp.json().then(
                        data => {
                            document.getElementById("network-number").innerHTML += `<br>Operated by <strong>${data.data[0].name}</strong`;

                        }
                    )
                )
            }
        )
    );

})();
