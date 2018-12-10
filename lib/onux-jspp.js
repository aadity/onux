'use babel';

import OnuxJsppView from './onux-jspp-view';
import { CompositeDisposable } from 'atom';

export default {

  onuxJsppView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.onuxJsppView = new OnuxJsppView(state.onuxJsppViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.onuxJsppView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'onux-jspp:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.onuxJsppView.destroy();
  },

  serialize() {
    return {
      onuxJsppViewState: this.onuxJsppView.serialize()
    };
  },

  toggle() {
    console.log('OnuxJspp was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
