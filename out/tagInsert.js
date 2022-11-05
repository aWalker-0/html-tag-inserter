"use strict";
// Tag-inserter/extension.ts
// Author: Szymon 'l7ssha' Uglis
// Updated By: Aaron 'awalker-0' Walker
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsertText = exports.insertTag = void 0;
const vscode = require("vscode");
async function insertTag() {
    // Get input from user
    const tag = await vscode.window.showInputBox({ prompt: "Enter in HTML tag" });
    // If tag is null or is empty, throw error
    if (tag === null || tag === undefined || tag === "") {
        error("No empty tags permitted!");
        return;
    }
    // Grab what the user has selected 
    let selection = vscode.window.activeTextEditor.selection;
    vscode.window.activeTextEditor.edit(builder => {
        builder.replace(selection, getInsertText(vscode.window.activeTextEditor.document.getText(selection), tag));
    });
    // Move cursor to the end of the selected text
    moveCursor(tag);
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
function moveCursor(tag) {
    // Define variable to store length of tag
    let tagLength = tag?.length ?? 0;
    // Unselect all pasted text
    vscode.commands.executeCommand("cursorMove", {
        to: "right",
        by: "wrappedLine",
        value: 0
    });
    // Move the cursor back to selection end
    vscode.commands.executeCommand("cursorMove", {
        to: "left",
        by: "wrappedLine",
        value: tagLength + 3
    });
}
// Error function
function error(text) {
    vscode.window.showErrorMessage(text);
}
//# sourceMappingURL=tagInsert.js.map