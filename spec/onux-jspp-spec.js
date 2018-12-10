'use babel';

import OnuxJspp from '../lib/onux-jspp';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('OnuxJspp', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('onux-jspp');
  });

  describe('when the onux-jspp:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.onux-jspp')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'onux-jspp:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.onux-jspp')).toExist();

        let onuxJsppElement = workspaceElement.querySelector('.onux-jspp');
        expect(onuxJsppElement).toExist();

        let onuxJsppPanel = atom.workspace.panelForItem(onuxJsppElement);
        expect(onuxJsppPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'onux-jspp:toggle');
        expect(onuxJsppPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.onux-jspp')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'onux-jspp:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let onuxJsppElement = workspaceElement.querySelector('.onux-jspp');
        expect(onuxJsppElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'onux-jspp:toggle');
        expect(onuxJsppElement).not.toBeVisible();
      });
    });
  });
});
