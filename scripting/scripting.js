// page generator
import * as page_generation from "./generate-page-content.js"

// specific pages
import * as home_page from './pages/home-page.js'
import * as df_docs_home_page from './pages/dragon-forge/dragon-forge-language.js'
import * as anvil_pages from './pages/anvil-language/anvil-language.js'
import * as anvil_left_links from './pages/anvil-language/anvil-language-left-links.js'

// pages & links
let json_pages = {
    empty: {
        name: "empty",
        left_links: "empty",
        content: [
            {
                type: "text",
                data: "Page not found.",
            }
        ]
    },
    home: home_page.json.page,
    anvil_docs_home: anvil_pages.json.page,
    df_docs_home: df_docs_home_page.json.page,
};
let left_links = {
    empty: {
        name: "empty",
        json: []
    },
    anvil_language: anvil_left_links.json.left_links
}
let top_links = {
    empty: {
        content: [
            {
                "text": "Internal Error!",
                "page": "empty"
            }
        ]
    },
    normal: {
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
function search_for_top_link_set(name) {
    // check to see if name is in list
    if (name in top_links) {
        return top_links[name];
    // link set not found
    } else {
        return top_links.empty;
    }
}

// search for a left link set by name in the left links options
function search_for_left_link_set(name) {
    // search for link set
    if (name in left_links) {
        return left_links[name];
    // link set not found
    } else {
        return left_links.empty;
    }
}

// set the page body and navigation to fit the user's request
export function goto_page(page_name) {
    var page_document_div = document.getElementById("page_document_container");
    var page_top_links_div = document.getElementById("page_top_links");
    var page_left_links_div = document.getElementById("page_left_links");

    // get page json data
    var page_json = search_for_page(page_name);
    var page_json_top_links = search_for_top_link_set("normal");
    var page_json_left_links = search_for_left_link_set(page_json.left_links);

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
