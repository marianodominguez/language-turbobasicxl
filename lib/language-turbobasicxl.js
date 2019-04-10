const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {
        'language-turbobasicxl:to-ascii': () => this.toAscii(),
        'language-turbobasicxl:to-atascii': () => this.toAtascii()
      })
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  toAscii() {
    const editor = atom.workspace.getActiveTextEditor()
    // '\233\177' '\12\11'
    if (editor) {
      editor.scan( "\233", replace("\177") )
      editor.scan( "\12" , replace("\11") )
    }
  }

  toAtascii() {
    //'\12\11' '\233\177'
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.scan( "\177", replace("\233") )
      editor.scan( "\11" , replace("\12") )
    }
  }
}
