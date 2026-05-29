import * as page_generation from "./generate-page-content.js"

let site_json = {
    top_links: [
        {
            name: "empty",
            content: []
        },
        {
            name: "normal",
            content: [
                {
                    text: "Welcome",
                    page: "home"
                },
                {
                    text: "Anvil",
                    page: "anvil_docs_home"
                },
                {
                    text: "DragonForge",
                    page: "df_docs_home"
                }
            ]
        }
    ],
    left_links: [
        {
            name: "empty",
            content: []
        }
    ]
};

import * as empty_page from './pages/empty-page.js'
import * as home_page from './pages/home-page.js'
import * as links_page from './pages/links-page.js'
import * as df_docs_home_page from './pages/dragon-forge/dragon-forge-language.js'
import * as anvil_pages from './pages/anvil-language/anvil-language.js'

let json_pages = {
    empty: empty_page.json.page,
    home: home_page.json.page,
    links: links_page.json.page,
    df_docs_home: df_docs_home_page.json.page,
    anvil_docs_home: anvil_pages.json.page
};

// search for a page by name in the site json
function search_for_page(name) {
    // check to see if page is in list
    if (name in json_pages) {
        return json_pages[name];
    // page not found
    } else {
        return json_pages.empty;
    }
}

// search for a top link set by name in the site json
function search_for_top_link_set(json, name) {
    // search for page
    for (var i = 0; i < json.top_links.length; i++) {
        // check if correct page
        if (json.top_links[i].name == name) {
            // return correct page
            return json.top_links[i];
        }
    }

    // page not found
    return json.top_links[0];
}

// search for a left link set by name in the site json
function search_for_left_link_set(json, name) {
    // search for page
    for (var i = 0; i < json.left_links.length; i++) {
        // check if correct page
        if (json.left_links[i].name == name) {
            // return correct page
            return json.left_links[i];
        }
    }

    // page not found
    return json.left_links[0];
}

// set the page body and navigation to fit the user's request
export function goto_page(page_name) {
    var page_document_div = document.getElementById("page_document_container");
    var page_top_links_div = document.getElementById("page_top_links");
    var page_left_links_div = document.getElementById("page_left_links");
    var page_json;
    var page_json_top_links;
    var page_json_left_links;

    // get page json data
    page_json = search_for_page(page_name);
    page_json_top_links = search_for_top_link_set(site_json, page_json.top_links);
    page_json_left_links = search_for_left_link_set(site_json, page_json.left_links);

    // setup page document contents to requested information
    page_document_div.innerHTML = page_generation.generate_document(page_json);
    page_top_links_div.innerHTML = page_generation.generate_top_links(page_json_top_links);
    page_left_links_div.innerHTML = page_generation.generate_side_links(page_json_left_links);
    
    return;
}

// load page on site load
window.addEventListener("load", () => {
    // goto page
    goto_page("home");
});

// expose goto_page globally
window.goto_page = goto_page;
