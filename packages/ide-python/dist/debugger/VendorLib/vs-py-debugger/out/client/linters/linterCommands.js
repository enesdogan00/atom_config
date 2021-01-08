// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode = require("vscode");

const types_1 = require("../common/application/types");

const constants_1 = require("../common/constants");

const types_2 = require("./types");

class LinterCommands {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
    this.disposables = [];
    this.linterManager = this.serviceContainer.get(types_2.ILinterManager);
    this.appShell = this.serviceContainer.get(types_1.IApplicationShell);
    const commandManager = this.serviceContainer.get(types_1.ICommandManager);
    commandManager.registerCommand(constants_1.Commands.Set_Linter, this.setLinterAsync.bind(this));
    commandManager.registerCommand(constants_1.Commands.Enable_Linter, this.enableLintingAsync.bind(this));
    commandManager.registerCommand(constants_1.Commands.Run_Linter, this.runLinting.bind(this));
  }

  dispose() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  setLinterAsync() {
    return __awaiter(this, void 0, void 0, function* () {
      const linters = this.linterManager.getAllLinterInfos();
      const suggestions = linters.map(x => x.id).sort();
      const activeLinters = yield this.linterManager.getActiveLinters(true, this.settingsUri);
      let current;

      switch (activeLinters.length) {
        case 0:
          current = 'none';
          break;

        case 1:
          current = activeLinters[0].id;
          break;

        default:
          current = 'multiple selected';
          break;
      }

      const quickPickOptions = {
        matchOnDetail: true,
        matchOnDescription: true,
        placeHolder: `current: ${current}`
      };
      const selection = yield this.appShell.showQuickPick(suggestions, quickPickOptions);

      if (selection !== undefined) {
        const index = linters.findIndex(x => x.id === selection);

        if (activeLinters.length > 1) {
          // tslint:disable-next-line:messages-must-be-localized
          const response = yield this.appShell.showWarningMessage(`Multiple linters are enabled in settings. Replace with '${selection}'?`, 'Yes', 'No');

          if (response !== 'Yes') {
            return;
          }
        }

        yield this.linterManager.setActiveLintersAsync([linters[index].product], this.settingsUri);
      }
    });
  }

  enableLintingAsync() {
    return __awaiter(this, void 0, void 0, function* () {
      const options = ['on', 'off'];
      const current = (yield this.linterManager.isLintingEnabled(true, this.settingsUri)) ? options[0] : options[1];
      const quickPickOptions = {
        matchOnDetail: true,
        matchOnDescription: true,
        placeHolder: `current: ${current}`
      };
      const selection = yield this.appShell.showQuickPick(options, quickPickOptions);

      if (selection !== undefined) {
        const enable = selection === options[0];
        yield this.linterManager.enableLintingAsync(enable, this.settingsUri);
      }
    });
  }

  runLinting() {
    const engine = this.serviceContainer.get(types_2.ILintingEngine);
    return engine.lintOpenPythonFiles();
  }

  get settingsUri() {
    return vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.uri : undefined;
  }

}

exports.LinterCommands = LinterCommands;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbnRlckNvbW1hbmRzLmpzIl0sIm5hbWVzIjpbIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2c2NvZGUiLCJyZXF1aXJlIiwidHlwZXNfMSIsImNvbnN0YW50c18xIiwidHlwZXNfMiIsIkxpbnRlckNvbW1hbmRzIiwiY29uc3RydWN0b3IiLCJzZXJ2aWNlQ29udGFpbmVyIiwiZGlzcG9zYWJsZXMiLCJsaW50ZXJNYW5hZ2VyIiwiZ2V0IiwiSUxpbnRlck1hbmFnZXIiLCJhcHBTaGVsbCIsIklBcHBsaWNhdGlvblNoZWxsIiwiY29tbWFuZE1hbmFnZXIiLCJJQ29tbWFuZE1hbmFnZXIiLCJyZWdpc3RlckNvbW1hbmQiLCJDb21tYW5kcyIsIlNldF9MaW50ZXIiLCJzZXRMaW50ZXJBc3luYyIsImJpbmQiLCJFbmFibGVfTGludGVyIiwiZW5hYmxlTGludGluZ0FzeW5jIiwiUnVuX0xpbnRlciIsInJ1bkxpbnRpbmciLCJkaXNwb3NlIiwiZm9yRWFjaCIsImRpc3Bvc2FibGUiLCJsaW50ZXJzIiwiZ2V0QWxsTGludGVySW5mb3MiLCJzdWdnZXN0aW9ucyIsIm1hcCIsIngiLCJpZCIsInNvcnQiLCJhY3RpdmVMaW50ZXJzIiwiZ2V0QWN0aXZlTGludGVycyIsInNldHRpbmdzVXJpIiwiY3VycmVudCIsImxlbmd0aCIsInF1aWNrUGlja09wdGlvbnMiLCJtYXRjaE9uRGV0YWlsIiwibWF0Y2hPbkRlc2NyaXB0aW9uIiwicGxhY2VIb2xkZXIiLCJzZWxlY3Rpb24iLCJzaG93UXVpY2tQaWNrIiwidW5kZWZpbmVkIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJyZXNwb25zZSIsInNob3dXYXJuaW5nTWVzc2FnZSIsInNldEFjdGl2ZUxpbnRlcnNBc3luYyIsInByb2R1Y3QiLCJvcHRpb25zIiwiaXNMaW50aW5nRW5hYmxlZCIsImVuYWJsZSIsImVuZ2luZSIsIklMaW50aW5nRW5naW5lIiwibGludE9wZW5QeXRob25GaWxlcyIsIndpbmRvdyIsImFjdGl2ZVRleHRFZGl0b3IiLCJkb2N1bWVudCIsInVyaSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBLElBQUlBLFNBQVMsR0FBSSxVQUFRLFNBQUtBLFNBQWQsSUFBNEIsVUFBVUMsT0FBVixFQUFtQkMsVUFBbkIsRUFBK0JDLENBQS9CLEVBQWtDQyxTQUFsQyxFQUE2QztBQUNyRixTQUFPLEtBQUtELENBQUMsS0FBS0EsQ0FBQyxHQUFHRSxPQUFULENBQU4sRUFBeUIsVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDdkQsYUFBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFBRSxVQUFJO0FBQUVDLFFBQUFBLElBQUksQ0FBQ04sU0FBUyxDQUFDTyxJQUFWLENBQWVGLEtBQWYsQ0FBRCxDQUFKO0FBQThCLE9BQXBDLENBQXFDLE9BQU9HLENBQVAsRUFBVTtBQUFFTCxRQUFBQSxNQUFNLENBQUNLLENBQUQsQ0FBTjtBQUFZO0FBQUU7O0FBQzNGLGFBQVNDLFFBQVQsQ0FBa0JKLEtBQWxCLEVBQXlCO0FBQUUsVUFBSTtBQUFFQyxRQUFBQSxJQUFJLENBQUNOLFNBQVMsQ0FBQyxPQUFELENBQVQsQ0FBbUJLLEtBQW5CLENBQUQsQ0FBSjtBQUFrQyxPQUF4QyxDQUF5QyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsUUFBQUEsTUFBTSxDQUFDSyxDQUFELENBQU47QUFBWTtBQUFFOztBQUM5RixhQUFTRixJQUFULENBQWNJLE1BQWQsRUFBc0I7QUFBRUEsTUFBQUEsTUFBTSxDQUFDQyxJQUFQLEdBQWNULE9BQU8sQ0FBQ1EsTUFBTSxDQUFDTCxLQUFSLENBQXJCLEdBQXNDLElBQUlOLENBQUos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bnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4ndXNlIHN0cmljdCc7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHZzY29kZSA9IHJlcXVpcmUoXCJ2c2NvZGVcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbW1vbi9hcHBsaWNhdGlvbi90eXBlc1wiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbW1vbi9jb25zdGFudHNcIik7XG5jb25zdCB0eXBlc18yID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XG5jbGFzcyBMaW50ZXJDb21tYW5kcyB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZUNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnNlcnZpY2VDb250YWluZXIgPSBzZXJ2aWNlQ29udGFpbmVyO1xuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzID0gW107XG4gICAgICAgIHRoaXMubGludGVyTWFuYWdlciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JTGludGVyTWFuYWdlcik7XG4gICAgICAgIHRoaXMuYXBwU2hlbGwgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSUFwcGxpY2F0aW9uU2hlbGwpO1xuICAgICAgICBjb25zdCBjb21tYW5kTWFuYWdlciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMS5JQ29tbWFuZE1hbmFnZXIpO1xuICAgICAgICBjb21tYW5kTWFuYWdlci5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzXzEuQ29tbWFuZHMuU2V0X0xpbnRlciwgdGhpcy5zZXRMaW50ZXJBc3luYy5iaW5kKHRoaXMpKTtcbiAgICAgICAgY29tbWFuZE1hbmFnZXIucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50c18xLkNvbW1hbmRzLkVuYWJsZV9MaW50ZXIsIHRoaXMuZW5hYmxlTGludGluZ0FzeW5jLmJpbmQodGhpcykpO1xuICAgICAgICBjb21tYW5kTWFuYWdlci5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzXzEuQ29tbWFuZHMuUnVuX0xpbnRlciwgdGhpcy5ydW5MaW50aW5nLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLmZvckVhY2goZGlzcG9zYWJsZSA9PiBkaXNwb3NhYmxlLmRpc3Bvc2UoKSk7XG4gICAgfVxuICAgIHNldExpbnRlckFzeW5jKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgbGludGVycyA9IHRoaXMubGludGVyTWFuYWdlci5nZXRBbGxMaW50ZXJJbmZvcygpO1xuICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBsaW50ZXJzLm1hcCh4ID0+IHguaWQpLnNvcnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxpbnRlcnMgPSB5aWVsZCB0aGlzLmxpbnRlck1hbmFnZXIuZ2V0QWN0aXZlTGludGVycyh0cnVlLCB0aGlzLnNldHRpbmdzVXJpKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50O1xuICAgICAgICAgICAgc3dpdGNoIChhY3RpdmVMaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gYWN0aXZlTGludGVyc1swXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9ICdtdWx0aXBsZSBzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcXVpY2tQaWNrT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBtYXRjaE9uRGV0YWlsOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1hdGNoT25EZXNjcmlwdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwbGFjZUhvbGRlcjogYGN1cnJlbnQ6ICR7Y3VycmVudH1gXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0geWllbGQgdGhpcy5hcHBTaGVsbC5zaG93UXVpY2tQaWNrKHN1Z2dlc3Rpb25zLCBxdWlja1BpY2tPcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbGludGVycy5maW5kSW5kZXgoeCA9PiB4LmlkID09PSBzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVMaW50ZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lc3NhZ2VzLW11c3QtYmUtbG9jYWxpemVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgdGhpcy5hcHBTaGVsbC5zaG93V2FybmluZ01lc3NhZ2UoYE11bHRpcGxlIGxpbnRlcnMgYXJlIGVuYWJsZWQgaW4gc2V0dGluZ3MuIFJlcGxhY2Ugd2l0aCAnJHtzZWxlY3Rpb259Jz9gLCAnWWVzJywgJ05vJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPT0gJ1llcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmxpbnRlck1hbmFnZXIuc2V0QWN0aXZlTGludGVyc0FzeW5jKFtsaW50ZXJzW2luZGV4XS5wcm9kdWN0XSwgdGhpcy5zZXR0aW5nc1VyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbmFibGVMaW50aW5nQXN5bmMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gWydvbicsICdvZmYnXTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSAoeWllbGQgdGhpcy5saW50ZXJNYW5hZ2VyLmlzTGludGluZ0VuYWJsZWQodHJ1ZSwgdGhpcy5zZXR0aW5nc1VyaSkpID8gb3B0aW9uc1swXSA6IG9wdGlvbnNbMV07XG4gICAgICAgICAgICBjb25zdCBxdWlja1BpY2tPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1hdGNoT25EZXRhaWw6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF0Y2hPbkRlc2NyaXB0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBsYWNlSG9sZGVyOiBgY3VycmVudDogJHtjdXJyZW50fWBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB5aWVsZCB0aGlzLmFwcFNoZWxsLnNob3dRdWlja1BpY2sob3B0aW9ucywgcXVpY2tQaWNrT3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmFibGUgPSBzZWxlY3Rpb24gPT09IG9wdGlvbnNbMF07XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5saW50ZXJNYW5hZ2VyLmVuYWJsZUxpbnRpbmdBc3luYyhlbmFibGUsIHRoaXMuc2V0dGluZ3NVcmkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuTGludGluZygpIHtcbiAgICAgICAgY29uc3QgZW5naW5lID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklMaW50aW5nRW5naW5lKTtcbiAgICAgICAgcmV0dXJuIGVuZ2luZS5saW50T3BlblB5dGhvbkZpbGVzKCk7XG4gICAgfVxuICAgIGdldCBzZXR0aW5nc1VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHZzY29kZS53aW5kb3cuYWN0aXZlVGV4dEVkaXRvciA/IHZzY29kZS53aW5kb3cuYWN0aXZlVGV4dEVkaXRvci5kb2N1bWVudC51cmkgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5MaW50ZXJDb21tYW5kcyA9IExpbnRlckNvbW1hbmRzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGludGVyQ29tbWFuZHMuanMubWFwIl19