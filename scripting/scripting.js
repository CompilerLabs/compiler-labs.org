import * as page_generation from "./generate-page-content.js"

let site_json = {
    pages: [
        {
            name: "empty",
            top_links: "normal",
            left_links: "empty",
            content: [
                {
                    type: "text",
                    data: "Page not found.",
                }
            ]
        }
    ],
    top_links: [
        {
            name: "empty",
            content: []
        },
        {
            name: "normal",
            content: [
                {
                    text: "Welcome!",
                    page: "welcome.home"
                },
                {
                    text: "Links",
                    page: "links",
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

import * as home_page from './pages/home-page.js'

// search for a page by name in the site json
function search_for_page(json, name) {
    // search for page
    for (var i = 0; i < json.pages.length; i++) {
        // check if correct page
        if (json.pages[i].name == name) {
            // return correct page
            return json.pages[i];
        }
    }

    // page not found
    return json.pages[0];
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
    page_json = home_page.json.page;
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
    goto_page("welcome.home");
});
