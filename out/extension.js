"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// Import modules
const vscode = require("vscode");
const inserter = require("./tagInsert");
function activate(context) {
    // Register the command and pass the inserter's function as the callback
    let insertTagCmd = vscode.commands.registerCommand("html-tag-inserter.insertTag", inserter.insertTag);
    // Push the command
    context.subscriptions.push(insertTagCmd);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map