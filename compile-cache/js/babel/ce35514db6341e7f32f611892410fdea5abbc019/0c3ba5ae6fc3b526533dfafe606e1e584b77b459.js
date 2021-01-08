function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/** @babel */

var _libTerminalSession = require('../lib/terminal-session');

var _libTerminalSession2 = _interopRequireDefault(_libTerminalSession);

var _libTerminalView = require('../lib/terminal-view');

var _libTerminalView2 = _interopRequireDefault(_libTerminalView);

describe('TerminalView', function () {
  var terminalView = undefined,
      testSession = undefined;

  beforeEach(function () {
    testSession = new _libTerminalSession2['default']();
    terminalView = new _libTerminalView2['default'](testSession);

    jasmine.attachToDOM(terminalView.element);
    terminalView.openTerminal();
  });

  afterEach(function () {
    terminalView.destroy();
    testSession.destroy();
  });

  describe('focus', function () {

    it('transfers focus to xterm when focused', function () {
      var xtermTextareaElement = terminalView.element.querySelector('.xterm-helper-textarea');
      expect(xtermTextareaElement).not.toBe(null);

      terminalView.element.focus();
      expect(xtermTextareaElement).toHaveFocus();
    });
  });

  describe('xterm', function () {

    it('element is present in the dom', function () {
      var xtermElement = terminalView.element.querySelector('.xterm');
      expect(xtermElement).toExist();
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FyY2hpZS8uYXRvbS9wYWNrYWdlcy90ZXJtaW5hbC10YWIvc3BlYy90ZXJtaW5hbC12aWV3LXNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztrQ0FFNEIseUJBQXlCOzs7OytCQUM1QixzQkFBc0I7Ozs7QUFFL0MsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFNO0FBQzdCLE1BQUksWUFBWSxZQUFBO01BQUUsV0FBVyxZQUFBLENBQUM7O0FBRTlCLFlBQVUsQ0FBQyxZQUFNO0FBQ2YsZUFBVyxHQUFHLHFDQUFxQixDQUFDO0FBQ3BDLGdCQUFZLEdBQUcsaUNBQWlCLFdBQVcsQ0FBQyxDQUFDOztBQUU3QyxXQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQyxnQkFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0dBQzdCLENBQUMsQ0FBQzs7QUFFSCxXQUFTLENBQUMsWUFBTTtBQUNkLGdCQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdkIsZUFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3ZCLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsT0FBTyxFQUFFLFlBQU07O0FBRXRCLE1BQUUsQ0FBQyx1Q0FBdUMsRUFBRSxZQUFNO0FBQ2hELFVBQU0sb0JBQW9CLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUMxRixZQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUU1QyxrQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUM3QixZQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM1QyxDQUFDLENBQUM7R0FFSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLE9BQU8sRUFBRSxZQUFNOztBQUV0QixNQUFFLENBQUMsK0JBQStCLEVBQUUsWUFBTTtBQUN4QyxVQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRSxZQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDaEMsQ0FBQyxDQUFDO0dBRUosQ0FBQyxDQUFDO0NBRUosQ0FBQyxDQUFDIiwiZmlsZSI6Ii9ob21lL2FyY2hpZS8uYXRvbS9wYWNrYWdlcy90ZXJtaW5hbC10YWIvc3BlYy90ZXJtaW5hbC12aWV3LXNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGJhYmVsICovXG5cbmltcG9ydCBUZXJtaW5hbFNlc3Npb24gZnJvbSAnLi4vbGliL3Rlcm1pbmFsLXNlc3Npb24nO1xuaW1wb3J0IFRlcm1pbmFsVmlldyBmcm9tICcuLi9saWIvdGVybWluYWwtdmlldyc7XG5cbmRlc2NyaWJlKCdUZXJtaW5hbFZpZXcnLCAoKSA9PiB7XG4gIGxldCB0ZXJtaW5hbFZpZXcsIHRlc3RTZXNzaW9uO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHRlc3RTZXNzaW9uID0gbmV3IFRlcm1pbmFsU2Vzc2lvbigpO1xuICAgIHRlcm1pbmFsVmlldyA9IG5ldyBUZXJtaW5hbFZpZXcodGVzdFNlc3Npb24pO1xuXG4gICAgamFzbWluZS5hdHRhY2hUb0RPTSh0ZXJtaW5hbFZpZXcuZWxlbWVudCk7XG4gICAgdGVybWluYWxWaWV3Lm9wZW5UZXJtaW5hbCgpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHRlcm1pbmFsVmlldy5kZXN0cm95KCk7XG4gICAgdGVzdFNlc3Npb24uZGVzdHJveSgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnZm9jdXMnLCAoKSA9PiB7XG5cbiAgICBpdCgndHJhbnNmZXJzIGZvY3VzIHRvIHh0ZXJtIHdoZW4gZm9jdXNlZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHh0ZXJtVGV4dGFyZWFFbGVtZW50ID0gdGVybWluYWxWaWV3LmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnh0ZXJtLWhlbHBlci10ZXh0YXJlYScpO1xuICAgICAgZXhwZWN0KHh0ZXJtVGV4dGFyZWFFbGVtZW50KS5ub3QudG9CZShudWxsKTtcblxuICAgICAgdGVybWluYWxWaWV3LmVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIGV4cGVjdCh4dGVybVRleHRhcmVhRWxlbWVudCkudG9IYXZlRm9jdXMoKTtcbiAgICB9KTtcblxuICB9KTtcblxuICBkZXNjcmliZSgneHRlcm0nLCAoKSA9PiB7XG5cbiAgICBpdCgnZWxlbWVudCBpcyBwcmVzZW50IGluIHRoZSBkb20nLCAoKSA9PiB7XG4gICAgICBsZXQgeHRlcm1FbGVtZW50ID0gdGVybWluYWxWaWV3LmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnh0ZXJtJyk7XG4gICAgICBleHBlY3QoeHRlcm1FbGVtZW50KS50b0V4aXN0KCk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pO1xuIl19