(function() {
  var PlatformIOTerminal;

  PlatformIOTerminal = require('../lib/vk-terminal');

  describe("VKTerminal", function() {
    var activationPromise, ref, workspaceElement;
    ref = [], workspaceElement = ref[0], activationPromise = ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('vk-terminal');
    });
    return describe("when the vk-terminal:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.vk-terminal')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'vk-terminal:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var platformIOTerminalElement, statusBar;
          expect(workspaceElement.querySelector('.vk-terminal')).toExist();
          platformIOTerminalElement = workspaceElement.querySelector('.vk-terminal');
          expect(platformIOTerminalElement).toExist();
          statusBar = atom.workspace.panelForItem(platformIOTerminalElement);
          expect(statusBar.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'vk-terminal:toggle');
          return expect(statusBar.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.vk-terminal')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'vk-terminal:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var platformIOTerminalElement;
          platformIOTerminalElement = workspaceElement.querySelector('.vk-terminal');
          expect(platformIOTerminalElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'vk-terminal:toggle');
          return expect(platformIOTerminalElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvYXJjaGllLy5hdG9tL3BhY2thZ2VzL3ZrLXRlcm1pbmFsL3NwZWMvdmstdGVybWluYWwtc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSxvQkFBUjs7RUFPckIsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQTtBQUNyQixRQUFBO0lBQUEsTUFBd0MsRUFBeEMsRUFBQyx5QkFBRCxFQUFtQjtJQUVuQixVQUFBLENBQVcsU0FBQTtNQUNULGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEI7YUFDbkIsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGFBQTlCO0lBRlgsQ0FBWDtXQUlBLFFBQUEsQ0FBUyxnREFBVCxFQUEyRCxTQUFBO01BQ3pELEVBQUEsQ0FBRyxpQ0FBSCxFQUFzQyxTQUFBO1FBR3BDLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixjQUEvQixDQUFQLENBQXNELENBQUMsR0FBRyxDQUFDLE9BQTNELENBQUE7UUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLG9CQUF6QztRQUVBLGVBQUEsQ0FBZ0IsU0FBQTtpQkFDZDtRQURjLENBQWhCO2VBR0EsSUFBQSxDQUFLLFNBQUE7QUFDSCxjQUFBO1VBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGNBQS9CLENBQVAsQ0FBc0QsQ0FBQyxPQUF2RCxDQUFBO1VBRUEseUJBQUEsR0FBNEIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsY0FBL0I7VUFDNUIsTUFBQSxDQUFPLHlCQUFQLENBQWlDLENBQUMsT0FBbEMsQ0FBQTtVQUVBLFNBQUEsR0FBWSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIseUJBQTVCO1VBQ1osTUFBQSxDQUFPLFNBQVMsQ0FBQyxTQUFWLENBQUEsQ0FBUCxDQUE2QixDQUFDLElBQTlCLENBQW1DLElBQW5DO1VBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxvQkFBekM7aUJBQ0EsTUFBQSxDQUFPLFNBQVMsQ0FBQyxTQUFWLENBQUEsQ0FBUCxDQUE2QixDQUFDLElBQTlCLENBQW1DLEtBQW5DO1FBVEcsQ0FBTDtNQVpvQyxDQUF0QzthQXVCQSxFQUFBLENBQUcsMEJBQUgsRUFBK0IsU0FBQTtRQU83QixPQUFPLENBQUMsV0FBUixDQUFvQixnQkFBcEI7UUFFQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsY0FBL0IsQ0FBUCxDQUFzRCxDQUFDLEdBQUcsQ0FBQyxPQUEzRCxDQUFBO1FBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxvQkFBekM7UUFFQSxlQUFBLENBQWdCLFNBQUE7aUJBQ2Q7UUFEYyxDQUFoQjtlQUdBLElBQUEsQ0FBSyxTQUFBO0FBRUgsY0FBQTtVQUFBLHlCQUFBLEdBQTRCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGNBQS9CO1VBQzVCLE1BQUEsQ0FBTyx5QkFBUCxDQUFpQyxDQUFDLFdBQWxDLENBQUE7VUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLG9CQUF6QztpQkFDQSxNQUFBLENBQU8seUJBQVAsQ0FBaUMsQ0FBQyxHQUFHLENBQUMsV0FBdEMsQ0FBQTtRQUxHLENBQUw7TUFsQjZCLENBQS9CO0lBeEJ5RCxDQUEzRDtFQVBxQixDQUF2QjtBQVBBIiwic291cmNlc0NvbnRlbnQiOlsiUGxhdGZvcm1JT1Rlcm1pbmFsID0gcmVxdWlyZSAnLi4vbGliL3ZrLXRlcm1pbmFsJ1xuXG4jIFVzZSB0aGUgY29tbWFuZCBgd2luZG93OnJ1bi1wYWNrYWdlLXNwZWNzYCAoY21kLWFsdC1jdHJsLXApIHRvIHJ1biBzcGVjcy5cbiNcbiMgVG8gcnVuIGEgc3BlY2lmaWMgYGl0YCBvciBgZGVzY3JpYmVgIGJsb2NrIGFkZCBhbiBgZmAgdG8gdGhlIGZyb250IChlLmcuIGBmaXRgXG4jIG9yIGBmZGVzY3JpYmVgKS4gUmVtb3ZlIHRoZSBgZmAgdG8gdW5mb2N1cyB0aGUgYmxvY2suXG5cbmRlc2NyaWJlIFwiVktUZXJtaW5hbFwiLCAtPlxuICBbd29ya3NwYWNlRWxlbWVudCwgYWN0aXZhdGlvblByb21pc2VdID0gW11cblxuICBiZWZvcmVFYWNoIC0+XG4gICAgd29ya3NwYWNlRWxlbWVudCA9IGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSlcbiAgICBhY3RpdmF0aW9uUHJvbWlzZSA9IGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCd2ay10ZXJtaW5hbCcpXG5cbiAgZGVzY3JpYmUgXCJ3aGVuIHRoZSB2ay10ZXJtaW5hbDp0b2dnbGUgZXZlbnQgaXMgdHJpZ2dlcmVkXCIsIC0+XG4gICAgaXQgXCJoaWRlcyBhbmQgc2hvd3MgdGhlIG1vZGFsIHBhbmVsXCIsIC0+XG4gICAgICAjIEJlZm9yZSB0aGUgYWN0aXZhdGlvbiBldmVudCB0aGUgdmlldyBpcyBub3Qgb24gdGhlIERPTSwgYW5kIG5vIHBhbmVsXG4gICAgICAjIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgIGV4cGVjdCh3b3Jrc3BhY2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy52ay10ZXJtaW5hbCcpKS5ub3QudG9FeGlzdCgpXG5cbiAgICAgICMgVGhpcyBpcyBhbiBhY3RpdmF0aW9uIGV2ZW50LCB0cmlnZ2VyaW5nIGl0IHdpbGwgY2F1c2UgdGhlIHBhY2thZ2UgdG8gYmVcbiAgICAgICMgYWN0aXZhdGVkLlxuICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAndmstdGVybWluYWw6dG9nZ2xlJ1xuXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYWN0aXZhdGlvblByb21pc2VcblxuICAgICAgcnVucyAtPlxuICAgICAgICBleHBlY3Qod29ya3NwYWNlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmstdGVybWluYWwnKSkudG9FeGlzdCgpXG5cbiAgICAgICAgcGxhdGZvcm1JT1Rlcm1pbmFsRWxlbWVudCA9IHdvcmtzcGFjZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZrLXRlcm1pbmFsJylcbiAgICAgICAgZXhwZWN0KHBsYXRmb3JtSU9UZXJtaW5hbEVsZW1lbnQpLnRvRXhpc3QoKVxuXG4gICAgICAgIHN0YXR1c0JhciA9IGF0b20ud29ya3NwYWNlLnBhbmVsRm9ySXRlbShwbGF0Zm9ybUlPVGVybWluYWxFbGVtZW50KVxuICAgICAgICBleHBlY3Qoc3RhdHVzQmFyLmlzVmlzaWJsZSgpKS50b0JlIHRydWVcbiAgICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAndmstdGVybWluYWw6dG9nZ2xlJ1xuICAgICAgICBleHBlY3Qoc3RhdHVzQmFyLmlzVmlzaWJsZSgpKS50b0JlIGZhbHNlXG5cbiAgICBpdCBcImhpZGVzIGFuZCBzaG93cyB0aGUgdmlld1wiLCAtPlxuICAgICAgIyBUaGlzIHRlc3Qgc2hvd3MgeW91IGFuIGludGVncmF0aW9uIHRlc3QgdGVzdGluZyBhdCB0aGUgdmlldyBsZXZlbC5cblxuICAgICAgIyBBdHRhY2hpbmcgdGhlIHdvcmtzcGFjZUVsZW1lbnQgdG8gdGhlIERPTSBpcyByZXF1aXJlZCB0byBhbGxvdyB0aGVcbiAgICAgICMgYHRvQmVWaXNpYmxlKClgIG1hdGNoZXJzIHRvIHdvcmsuIEFueXRoaW5nIHRlc3RpbmcgdmlzaWJpbGl0eSBvciBmb2N1c1xuICAgICAgIyByZXF1aXJlcyB0aGF0IHRoZSB3b3Jrc3BhY2VFbGVtZW50IGlzIG9uIHRoZSBET00uIFRlc3RzIHRoYXQgYXR0YWNoIHRoZVxuICAgICAgIyB3b3Jrc3BhY2VFbGVtZW50IHRvIHRoZSBET00gYXJlIGdlbmVyYWxseSBzbG93ZXIgdGhhbiB0aG9zZSBvZmYgRE9NLlxuICAgICAgamFzbWluZS5hdHRhY2hUb0RPTSh3b3Jrc3BhY2VFbGVtZW50KVxuXG4gICAgICBleHBlY3Qod29ya3NwYWNlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmstdGVybWluYWwnKSkubm90LnRvRXhpc3QoKVxuXG4gICAgICAjIFRoaXMgaXMgYW4gYWN0aXZhdGlvbiBldmVudCwgdHJpZ2dlcmluZyBpdCBjYXVzZXMgdGhlIHBhY2thZ2UgdG8gYmVcbiAgICAgICMgYWN0aXZhdGVkLlxuICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAndmstdGVybWluYWw6dG9nZ2xlJ1xuXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYWN0aXZhdGlvblByb21pc2VcblxuICAgICAgcnVucyAtPlxuICAgICAgICAjIE5vdyB3ZSBjYW4gdGVzdCBmb3IgdmlldyB2aXNpYmlsaXR5XG4gICAgICAgIHBsYXRmb3JtSU9UZXJtaW5hbEVsZW1lbnQgPSB3b3Jrc3BhY2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy52ay10ZXJtaW5hbCcpXG4gICAgICAgIGV4cGVjdChwbGF0Zm9ybUlPVGVybWluYWxFbGVtZW50KS50b0JlVmlzaWJsZSgpXG4gICAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2ggd29ya3NwYWNlRWxlbWVudCwgJ3ZrLXRlcm1pbmFsOnRvZ2dsZSdcbiAgICAgICAgZXhwZWN0KHBsYXRmb3JtSU9UZXJtaW5hbEVsZW1lbnQpLm5vdC50b0JlVmlzaWJsZSgpXG4iXX0=