(function() {
  var PlatformIOTerminal;

  PlatformIOTerminal = require('../lib/platformio-ide-terminal');

  describe("PlatformIOTerminal", function() {
    var activationPromise, ref, workspaceElement;
    ref = [], workspaceElement = ref[0], activationPromise = ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('platformio-ide-terminal');
    });
    return describe("when the platformio-ide-terminal:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.platformio-ide-terminal')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'platformio-ide-terminal:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var platformIOTerminalElement, statusBar;
          expect(workspaceElement.querySelector('.platformio-ide-terminal')).toExist();
          platformIOTerminalElement = workspaceElement.querySelector('.platformio-ide-terminal');
          expect(platformIOTerminalElement).toExist();
          statusBar = atom.workspace.panelForItem(platformIOTerminalElement);
          expect(statusBar.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'platformio-ide-terminal:toggle');
          return expect(statusBar.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.platformio-ide-terminal')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'platformio-ide-terminal:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var platformIOTerminalElement;
          platformIOTerminalElement = workspaceElement.querySelector('.platformio-ide-terminal');
          expect(platformIOTerminalElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'platformio-ide-terminal:toggle');
          return expect(platformIOTerminalElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvYXJjaGllLy5hdG9tL3BhY2thZ2VzL3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsL3NwZWMvcGxhdGZvcm1pby1pZGUtdGVybWluYWwtc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSxnQ0FBUjs7RUFPckIsUUFBQSxDQUFTLG9CQUFULEVBQStCLFNBQUE7QUFDN0IsUUFBQTtJQUFBLE1BQXdDLEVBQXhDLEVBQUMseUJBQUQsRUFBbUI7SUFFbkIsVUFBQSxDQUFXLFNBQUE7TUFDVCxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCO2FBQ25CLGlCQUFBLEdBQW9CLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4Qix5QkFBOUI7SUFGWCxDQUFYO1dBSUEsUUFBQSxDQUFTLDREQUFULEVBQXVFLFNBQUE7TUFDckUsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUE7UUFHcEMsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLDBCQUEvQixDQUFQLENBQWtFLENBQUMsR0FBRyxDQUFDLE9BQXZFLENBQUE7UUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGdDQUF6QztRQUVBLGVBQUEsQ0FBZ0IsU0FBQTtpQkFDZDtRQURjLENBQWhCO2VBR0EsSUFBQSxDQUFLLFNBQUE7QUFDSCxjQUFBO1VBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLDBCQUEvQixDQUFQLENBQWtFLENBQUMsT0FBbkUsQ0FBQTtVQUVBLHlCQUFBLEdBQTRCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLDBCQUEvQjtVQUM1QixNQUFBLENBQU8seUJBQVAsQ0FBaUMsQ0FBQyxPQUFsQyxDQUFBO1VBRUEsU0FBQSxHQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBZixDQUE0Qix5QkFBNUI7VUFDWixNQUFBLENBQU8sU0FBUyxDQUFDLFNBQVYsQ0FBQSxDQUFQLENBQTZCLENBQUMsSUFBOUIsQ0FBbUMsSUFBbkM7VUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGdDQUF6QztpQkFDQSxNQUFBLENBQU8sU0FBUyxDQUFDLFNBQVYsQ0FBQSxDQUFQLENBQTZCLENBQUMsSUFBOUIsQ0FBbUMsS0FBbkM7UUFURyxDQUFMO01BWm9DLENBQXRDO2FBdUJBLEVBQUEsQ0FBRywwQkFBSCxFQUErQixTQUFBO1FBTzdCLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQjtRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQiwwQkFBL0IsQ0FBUCxDQUFrRSxDQUFDLEdBQUcsQ0FBQyxPQUF2RSxDQUFBO1FBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxnQ0FBekM7UUFFQSxlQUFBLENBQWdCLFNBQUE7aUJBQ2Q7UUFEYyxDQUFoQjtlQUdBLElBQUEsQ0FBSyxTQUFBO0FBRUgsY0FBQTtVQUFBLHlCQUFBLEdBQTRCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLDBCQUEvQjtVQUM1QixNQUFBLENBQU8seUJBQVAsQ0FBaUMsQ0FBQyxXQUFsQyxDQUFBO1VBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxnQ0FBekM7aUJBQ0EsTUFBQSxDQUFPLHlCQUFQLENBQWlDLENBQUMsR0FBRyxDQUFDLFdBQXRDLENBQUE7UUFMRyxDQUFMO01BbEI2QixDQUEvQjtJQXhCcUUsQ0FBdkU7RUFQNkIsQ0FBL0I7QUFQQSIsInNvdXJjZXNDb250ZW50IjpbIlBsYXRmb3JtSU9UZXJtaW5hbCA9IHJlcXVpcmUgJy4uL2xpYi9wbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbCdcblxuIyBVc2UgdGhlIGNvbW1hbmQgYHdpbmRvdzpydW4tcGFja2FnZS1zcGVjc2AgKGNtZC1hbHQtY3RybC1wKSB0byBydW4gc3BlY3MuXG4jXG4jIFRvIHJ1biBhIHNwZWNpZmljIGBpdGAgb3IgYGRlc2NyaWJlYCBibG9jayBhZGQgYW4gYGZgIHRvIHRoZSBmcm9udCAoZS5nLiBgZml0YFxuIyBvciBgZmRlc2NyaWJlYCkuIFJlbW92ZSB0aGUgYGZgIHRvIHVuZm9jdXMgdGhlIGJsb2NrLlxuXG5kZXNjcmliZSBcIlBsYXRmb3JtSU9UZXJtaW5hbFwiLCAtPlxuICBbd29ya3NwYWNlRWxlbWVudCwgYWN0aXZhdGlvblByb21pc2VdID0gW11cblxuICBiZWZvcmVFYWNoIC0+XG4gICAgd29ya3NwYWNlRWxlbWVudCA9IGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSlcbiAgICBhY3RpdmF0aW9uUHJvbWlzZSA9IGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbCcpXG5cbiAgZGVzY3JpYmUgXCJ3aGVuIHRoZSBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDp0b2dnbGUgZXZlbnQgaXMgdHJpZ2dlcmVkXCIsIC0+XG4gICAgaXQgXCJoaWRlcyBhbmQgc2hvd3MgdGhlIG1vZGFsIHBhbmVsXCIsIC0+XG4gICAgICAjIEJlZm9yZSB0aGUgYWN0aXZhdGlvbiBldmVudCB0aGUgdmlldyBpcyBub3Qgb24gdGhlIERPTSwgYW5kIG5vIHBhbmVsXG4gICAgICAjIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgIGV4cGVjdCh3b3Jrc3BhY2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbCcpKS5ub3QudG9FeGlzdCgpXG5cbiAgICAgICMgVGhpcyBpcyBhbiBhY3RpdmF0aW9uIGV2ZW50LCB0cmlnZ2VyaW5nIGl0IHdpbGwgY2F1c2UgdGhlIHBhY2thZ2UgdG8gYmVcbiAgICAgICMgYWN0aXZhdGVkLlxuICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6dG9nZ2xlJ1xuXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYWN0aXZhdGlvblByb21pc2VcblxuICAgICAgcnVucyAtPlxuICAgICAgICBleHBlY3Qod29ya3NwYWNlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGxhdGZvcm1pby1pZGUtdGVybWluYWwnKSkudG9FeGlzdCgpXG5cbiAgICAgICAgcGxhdGZvcm1JT1Rlcm1pbmFsRWxlbWVudCA9IHdvcmtzcGFjZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXRmb3JtaW8taWRlLXRlcm1pbmFsJylcbiAgICAgICAgZXhwZWN0KHBsYXRmb3JtSU9UZXJtaW5hbEVsZW1lbnQpLnRvRXhpc3QoKVxuXG4gICAgICAgIHN0YXR1c0JhciA9IGF0b20ud29ya3NwYWNlLnBhbmVsRm9ySXRlbShwbGF0Zm9ybUlPVGVybWluYWxFbGVtZW50KVxuICAgICAgICBleHBlY3Qoc3RhdHVzQmFyLmlzVmlzaWJsZSgpKS50b0JlIHRydWVcbiAgICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6dG9nZ2xlJ1xuICAgICAgICBleHBlY3Qoc3RhdHVzQmFyLmlzVmlzaWJsZSgpKS50b0JlIGZhbHNlXG5cbiAgICBpdCBcImhpZGVzIGFuZCBzaG93cyB0aGUgdmlld1wiLCAtPlxuICAgICAgIyBUaGlzIHRlc3Qgc2hvd3MgeW91IGFuIGludGVncmF0aW9uIHRlc3QgdGVzdGluZyBhdCB0aGUgdmlldyBsZXZlbC5cblxuICAgICAgIyBBdHRhY2hpbmcgdGhlIHdvcmtzcGFjZUVsZW1lbnQgdG8gdGhlIERPTSBpcyByZXF1aXJlZCB0byBhbGxvdyB0aGVcbiAgICAgICMgYHRvQmVWaXNpYmxlKClgIG1hdGNoZXJzIHRvIHdvcmsuIEFueXRoaW5nIHRlc3RpbmcgdmlzaWJpbGl0eSBvciBmb2N1c1xuICAgICAgIyByZXF1aXJlcyB0aGF0IHRoZSB3b3Jrc3BhY2VFbGVtZW50IGlzIG9uIHRoZSBET00uIFRlc3RzIHRoYXQgYXR0YWNoIHRoZVxuICAgICAgIyB3b3Jrc3BhY2VFbGVtZW50IHRvIHRoZSBET00gYXJlIGdlbmVyYWxseSBzbG93ZXIgdGhhbiB0aG9zZSBvZmYgRE9NLlxuICAgICAgamFzbWluZS5hdHRhY2hUb0RPTSh3b3Jrc3BhY2VFbGVtZW50KVxuXG4gICAgICBleHBlY3Qod29ya3NwYWNlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGxhdGZvcm1pby1pZGUtdGVybWluYWwnKSkubm90LnRvRXhpc3QoKVxuXG4gICAgICAjIFRoaXMgaXMgYW4gYWN0aXZhdGlvbiBldmVudCwgdHJpZ2dlcmluZyBpdCBjYXVzZXMgdGhlIHBhY2thZ2UgdG8gYmVcbiAgICAgICMgYWN0aXZhdGVkLlxuICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6dG9nZ2xlJ1xuXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYWN0aXZhdGlvblByb21pc2VcblxuICAgICAgcnVucyAtPlxuICAgICAgICAjIE5vdyB3ZSBjYW4gdGVzdCBmb3IgdmlldyB2aXNpYmlsaXR5XG4gICAgICAgIHBsYXRmb3JtSU9UZXJtaW5hbEVsZW1lbnQgPSB3b3Jrc3BhY2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbCcpXG4gICAgICAgIGV4cGVjdChwbGF0Zm9ybUlPVGVybWluYWxFbGVtZW50KS50b0JlVmlzaWJsZSgpXG4gICAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2ggd29ya3NwYWNlRWxlbWVudCwgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnRvZ2dsZSdcbiAgICAgICAgZXhwZWN0KHBsYXRmb3JtSU9UZXJtaW5hbEVsZW1lbnQpLm5vdC50b0JlVmlzaWJsZSgpXG4iXX0=
