// write header
function generate_header(text) {
    // build code
    return ("<div class=\"page_document_text_header\">" + text + "</div>");
}

// write text
function generate_text(text) {
    // build code
    return ("<div class=\"page_document_text\">" + text + "</div>");
}

// write code block
function generate_code_block(text) {
    // build code
    return ("<div class=\"page_document_code_block_container\"><div class=\"page_document_code_block\"><pre class=\"page_document_code_block_pre\">" + text + "</pre></div></div>");
}

// write external link
function generate_external_link(text, link) {
    // build code
    return ("<div class=\"page_document_text\"><a class=\"page_document_link\" href=\"" + link + "\">" + text + "</a></div>");
}

// write side navigation link
function generate_side_link(text, link) {
    // build code
    return ("<div class=\"page_side_navigation_link\" onclick=\"goto_page('" + link + "')\">" + text + "</div>");
}

// write top navigation link
function generate_top_link(text, link) {
    // build code
    return ("<div class=\"page_top_link\" onclick=\"goto_page('" + link + "')\">" + text + "</div>");
}

// write internal image
function generate_internal_image(link) {
    // build code
    return ("<div class=\"page_document_text\"><img class=\"page_document_image\"src=\"" + link + "\"></img></div>");
}

// write internal video
function generate_internal_video(link) {
    // build code
    return ("<div class=\"page_document_text\"><video class=\"page_document_video\"src=\"" + link + "\"controls></video></div>");
}

function generate_dragon_function_call_arguments(function_arguments) {
    // setup output
    text = "(";

    // for each argument
    for (let index = 0; index < function_arguments.length; index++) {
        // check for comma
        if (index > 0) {
            // add comma
            text += ", ";
        }

        // add argument
        text += function_arguments[index];
    }

    // append closing bracket
    text += ")";

    return text;
}

// write a dragon function call
function generate_dragon_function_call(json_data) {
    // setup text
    text = "";

    // write name
    text += json_data.name;

    // write arguments
    text += generate_dragon_function_call_arguments(json_data.inputs);
    text += generate_dragon_function_call_arguments(json_data.outputs);

    // assemble and return code
    return generate_code_block(text);
}

// generate main document
function generate_main_text(content) {
    var output = "";
    var current_content;

    // write pieces in order
    for (var i = 0; i < content.length; i++) {
        // get content
        current_content = content[i];

        // write html
        switch (current_content.type) {
        case "header":
            output += generate_header(current_content.data);

            break;
        case "text":
            output += generate_text(current_content.data);

            break;
        case "function_documentation":
            output += generate_dragon_function_call(current_content.data);

            break;
        case "code_block":
            output += generate_code_block(current_content.data);

            break;
        case "external_link":
            output += generate_external_link(current_content.data, current_content.link);

            break;
        case "internal_image":
            output += generate_internal_image(current_content.link);

            break;
        case "internal_video":
            output += generate_internal_video(current_content.link);
    
            break;
        }
    }

    return output;
}

// generate website
export function generate_document(json) {
    return generate_main_text(json.content);
}

// generate top navigation
export function generate_top_links(json) {
    var output = "";

    // write pieces in order
    for (var i = 0; i < json.content.length; i++) {
        // get content
        output += generate_top_link(json.content[i].text, json.content[i].page);
    }

    return output;
}

// generate top navigation
export function generate_side_links(json) {
    var output = "";

    // write pieces in order
    for (var i = 0; i < json.length; i++) {
        // get content
        output += generate_side_link(json[i].text, json[i].page);
    }

    return output;
}
