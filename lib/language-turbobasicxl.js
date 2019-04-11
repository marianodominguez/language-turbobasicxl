'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
        'language-turbobasicxl:to-ascii'  : () => this.toAscii() ,
        'language-turbobasicxl:to-atascii': () => this.toAtascii()
      }));
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  toAscii() {
    console.log('Convert to Ascii');
    const editor = atom.workspace.getActiveTextEditor()
    // '/233/177' > /009B/007F '/12/11' > /000A/0009
    if (editor) {
      editor.scan( /\u009b/, (match) => replace("\u007f") )
      editor.scan( /\u000A/ , (match) => replace("\u0009") )
    }
  },

  toAtascii() {
    console.log('Convert to Atascii');
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.scan( /\u007f/, (match) => replace("\u009b") )
      editor.scan( /\u0009/ , (match) => replace("\u000A") )
    }
  }
};
