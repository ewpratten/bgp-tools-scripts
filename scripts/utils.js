// Gets the ul object controlling the top tabs
function get_top_tabs() {
    return document.getElementsByClassName("section-tabs")[0].getElementsByTagName("ul")[0];
}

// Add an item to the top tab bar
function add_top_tab_item(name, url, newtab = false) {
    get_top_tabs().innerHTML += `<li class="custom-top-tab-item"><a href="${url}"${newtab ? `target="_blank" rel="noreferrer"` : ''}>${name}</a></li>`;
}

// Get the page id (This is an ASN or prefix)
function get_page_id() {
    var path_parts = document.location.pathname.split("/");
    if (path_parts.length == 3) { return path_parts[2]; }
    if (path_parts.length >= 4) { return path_parts[2] + "/" + path_parts[3]; }
    return null;
}