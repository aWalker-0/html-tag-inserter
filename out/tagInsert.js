"use strict";
// Tag-inserter/extension.ts
// Author: Szymon 'l7ssha' Uglis
// Updated By: Aaron 'awalker-0' Walker
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsertText = exports.insertTag = void 0;
const vscode = require("vscode");
async function insertTag() {
    // Get input from user
    const tag = await vscode.window.showInputBox();
    // If tag is null or is empty, throw error
    if (tag === null || tag === "") {
        error("No empty tags permitted!");
    }
    // Grab what the user has selected 
    let selection = vscode.window.activeTextEditor.selection;
    // If the selection is not empty, replace selection with generated HTML tag and text that was inside
    if (!selection.isEmpty) {
        vscode.window.activeTextEditor.edit(builder => {
            builder.replace(selection, getInsertText(vscode.window.activeTextEditor.document.getText(selection), tag));
        });
    }
    else {
        error("Your selection is empty!");
    }
}
exports.insertTag = insertTag;
// Generate and return tag with selected text inside
function getInsertText(selection, tag) {
    // Define a regex patter
    const regexPattern = /(\w+).([A-Za-z])\w+=\"([^"]*)\"/;
    // Test pattern against the tag given
    if (regexPattern.test(tag)) {
        const t = tag.split(" ", 1);
        return "<" + tag + ">" + selection + "</" + t[0] + ">";
    }
    else {
        return "<" + tag + ">" + selection + "</" + tag + ">";
    }
}
exports.getInsertText = getInsertText;
// Error function
function error(text) {
    vscode.window.showErrorMessage(text);
}
//# sourceMappingURL=tagInsert.js.map