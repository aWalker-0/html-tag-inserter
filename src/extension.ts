// Import modules
import * as vscode from 'vscode';
import * as inserter from './tagInsert';

export function activate(context: vscode.ExtensionContext) {
	// Register the command and pass the inserter's function as the callback
	let insertTagCmd = vscode.commands.registerCommand("html-tag-inserter.insertTag", inserter.insertTag);
	// Push the command
	context.subscriptions.push(insertTagCmd);
}

export function deactivate() {}
