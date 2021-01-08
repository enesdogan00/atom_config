Object.defineProperty(exports, '__esModule', {
  value: true
});

var _atom = require('atom');

var _helpers = require('./helpers');

var VALID_SEVERITY = new Set(['error', 'warning', 'info']);

function validateUI(ui) {
  var messages = [];

  if (ui && typeof ui === 'object') {
    if (typeof ui.name !== 'string') {
      messages.push('UI.name must be a string');
    }
    if (typeof ui.didBeginLinting !== 'function') {
      messages.push('UI.didBeginLinting must be a function');
    }
    if (typeof ui.didFinishLinting !== 'function') {
      messages.push('UI.didFinishLinting must be a function');
    }
    if (typeof ui.render !== 'function') {
      messages.push('UI.render must be a function');
    }
    if (typeof ui.dispose !== 'function') {
      messages.push('UI.dispose must be a function');
    }
  } else {
    messages.push('UI must be an object');
  }

  if (messages.length) {
    (0, _helpers.showError)('Invalid UI received', 'These issues were encountered while registering the UI named \'' + (ui && ui.name ? ui.name : 'Unknown') + '\'', messages);
    return false;
  }

  return true;
}

function validateLinter(linter) {
  var messages = [];

  if (linter && typeof linter === 'object') {
    if (typeof linter.name !== 'string') {
      messages.push('Linter.name must be a string');
    }
    if (typeof linter.scope !== 'string' || linter.scope !== 'file' && linter.scope !== 'project') {
      messages.push("Linter.scope must be either 'file' or 'project'");
    }
    if (typeof linter.lintsOnChange !== 'boolean') {
      messages.push('Linter.lintsOnChange must be a boolean');
    }
    if (!Array.isArray(linter.grammarScopes)) {
      messages.push('Linter.grammarScopes must be an Array');
    }
    if (typeof linter.lint !== 'function') {
      messages.push('Linter.lint must be a function');
    }
  } else {
    messages.push('Linter must be an object');
  }

  if (messages.length) {
    (0, _helpers.showError)('Invalid Linter received', 'These issues were encountered while registering a Linter named \'' + (linter && linter.name ? linter.name : 'Unknown') + '\'', messages);
    return false;
  }

  return true;
}

function validateIndie(indie) {
  var messages = [];

  if (indie && typeof indie === 'object') {
    if (typeof indie.name !== 'string') {
      messages.push('Indie.name must be a string');
    }
  } else {
    messages.push('Indie must be an object');
  }

  if (messages.length) {
    (0, _helpers.showError)('Invalid Indie received', 'These issues were encountered while registering an Indie Linter named \'' + (indie && indie.name ? indie.name : 'Unknown') + '\'', messages);
    return false;
  }

  return true;
}

function validateMessages(linterName, entries) {
  var messages = [];

  if (Array.isArray(entries)) {
    var invalidURL = false;
    var invalidIcon = false;
    var invalidExcerpt = false;
    var invalidLocation = false;
    var invalidSeverity = false;
    var invalidSolution = false;
    var invalidReference = false;
    var invalidDescription = false;
    var invalidLinterName = false;

    for (var i = 0, _length = entries.length; i < _length; ++i) {
      var message = entries[i];
      var reference = message.reference;

      if (!invalidIcon && message.icon && typeof message.icon !== 'string') {
        invalidIcon = true;
        messages.push('Message.icon must be a string');
      }
      if (!invalidLocation && (!message.location || typeof message.location !== 'object' || typeof message.location.file !== 'string' || typeof message.location.position !== 'object' || !message.location.position)) {
        invalidLocation = true;
        messages.push('Message.location must be valid');
      } else if (!invalidLocation) {
        var range = _atom.Range.fromObject(message.location.position);
        if (Number.isNaN(range.start.row) || Number.isNaN(range.start.column) || Number.isNaN(range.end.row) || Number.isNaN(range.end.column)) {
          invalidLocation = true;
          messages.push('Message.location.position should not contain NaN coordinates');
        }
      }
      if (!invalidSolution && message.solutions && !Array.isArray(message.solutions)) {
        invalidSolution = true;
        messages.push('Message.solutions must be valid');
      }
      if (!invalidReference && reference && (typeof reference !== 'object' || typeof reference.file !== 'string' || typeof reference.position !== 'object' || !reference.position)) {
        invalidReference = true;
        messages.push('Message.reference must be valid');
      } else if (!invalidReference && reference) {
        var position = _atom.Point.fromObject(reference.position);
        if (Number.isNaN(position.row) || Number.isNaN(position.column)) {
          invalidReference = true;
          messages.push('Message.reference.position should not contain NaN coordinates');
        }
      }
      if (!invalidExcerpt && typeof message.excerpt !== 'string') {
        invalidExcerpt = true;
        messages.push('Message.excerpt must be a string');
      }
      if (!invalidSeverity && !VALID_SEVERITY.has(message.severity)) {
        invalidSeverity = true;
        messages.push("Message.severity must be 'error', 'warning' or 'info'");
      }
      if (!invalidURL && message.url && typeof message.url !== 'string') {
        invalidURL = true;
        messages.push('Message.url must be a string');
      }
      if (!invalidDescription && message.description && typeof message.description !== 'function' && typeof message.description !== 'string') {
        invalidDescription = true;
        messages.push('Message.description must be a function or string');
      }
      if (!invalidLinterName && message.linterName && typeof message.linterName !== 'string') {
        invalidLinterName = true;
        messages.push('Message.linterName must be a string');
      }
    }
  } else {
    messages.push('Linter Result must be an Array');
  }

  if (messages.length) {
    (0, _helpers.showError)('Invalid Linter Result received', 'These issues were encountered while processing messages from a linter named \'' + linterName + '\'', messages);
    return false;
  }

  return true;
}

exports.ui = validateUI;
exports.linter = validateLinter;
exports.indie = validateIndie;
exports.messages = validateMessages;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FyY2hpZS8uYXRvbS9wYWNrYWdlcy9saW50ZXIvbGliL3ZhbGlkYXRlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7b0JBRTZCLE1BQU07O3VCQUNULFdBQVc7O0FBR3JDLElBQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBOztBQUU1RCxTQUFTLFVBQVUsQ0FBQyxFQUFNLEVBQVc7QUFDbkMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBOztBQUVuQixNQUFJLEVBQUUsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7QUFDaEMsUUFBSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQy9CLGNBQVEsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtLQUMxQztBQUNELFFBQUksT0FBTyxFQUFFLENBQUMsZUFBZSxLQUFLLFVBQVUsRUFBRTtBQUM1QyxjQUFRLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUE7S0FDdkQ7QUFDRCxRQUFJLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtBQUM3QyxjQUFRLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUE7S0FDeEQ7QUFDRCxRQUFJLE9BQU8sRUFBRSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7QUFDbkMsY0FBUSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0tBQzlDO0FBQ0QsUUFBSSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3BDLGNBQVEsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQTtLQUMvQztHQUNGLE1BQU07QUFDTCxZQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7R0FDdEM7O0FBRUQsTUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ25CLDRCQUNF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QUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0dBQ2hEOztBQUVELE1BQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUNuQiw0QkFDRSxnQ0FBZ0MscUZBQ2dELFVBQVUsU0FDMUYsUUFBUSxDQUNULENBQUE7QUFDRCxXQUFPLEtBQUssQ0FBQTtHQUNiOztBQUVELFNBQU8sSUFBSSxDQUFBO0NBQ1o7O1FBRXNCLEVBQUUsR0FBaEIsVUFBVTtRQUEwQixNQUFNLEdBQXhCLGNBQWM7UUFBNkIsS0FBSyxHQUF0QixhQUFhO1FBQStCLFFBQVEsR0FBNUIsZ0JBQWdCIiwiZmlsZSI6Ii9ob21lL2FyY2hpZS8uYXRvbS9wYWNrYWdlcy9saW50ZXIvbGliL3ZhbGlkYXRlL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgUmFuZ2UsIFBvaW50IH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCB0eXBlIHsgVUksIExpbnRlciwgTWVzc2FnZSwgSW5kaWUgfSBmcm9tICcuLi90eXBlcydcblxuY29uc3QgVkFMSURfU0VWRVJJVFkgPSBuZXcgU2V0KFsnZXJyb3InLCAnd2FybmluZycsICdpbmZvJ10pXG5cbmZ1bmN0aW9uIHZhbGlkYXRlVUkodWk6IFVJKTogYm9vbGVhbiB7XG4gIGNvbnN0IG1lc3NhZ2VzID0gW11cblxuICBpZiAodWkgJiYgdHlwZW9mIHVpID09PSAnb2JqZWN0Jykge1xuICAgIGlmICh0eXBlb2YgdWkubmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goJ1VJLm5hbWUgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdWkuZGlkQmVnaW5MaW50aW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKCdVSS5kaWRCZWdpbkxpbnRpbmcgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1aS5kaWRGaW5pc2hMaW50aW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKCdVSS5kaWRGaW5pc2hMaW50aW5nIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdWkucmVuZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKCdVSS5yZW5kZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1aS5kaXNwb3NlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKCdVSS5kaXNwb3NlIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VzLnB1c2goJ1VJIG11c3QgYmUgYW4gb2JqZWN0JylcbiAgfVxuXG4gIGlmIChtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICBzaG93RXJyb3IoXG4gICAgICAnSW52YWxpZCBVSSByZWNlaXZlZCcsXG4gICAgICBgVGhlc2UgaXNzdWVzIHdlcmUgZW5jb3VudGVyZWQgd2hpbGUgcmVnaXN0ZXJpbmcgdGhlIFVJIG5hbWVkICcke3VpICYmIHVpLm5hbWUgPyB1aS5uYW1lIDogJ1Vua25vd24nfSdgLFxuICAgICAgbWVzc2FnZXMsXG4gICAgKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVMaW50ZXIobGludGVyOiBMaW50ZXIpOiBib29sZWFuIHtcbiAgY29uc3QgbWVzc2FnZXMgPSBbXVxuXG4gIGlmIChsaW50ZXIgJiYgdHlwZW9mIGxpbnRlciA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIGxpbnRlci5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbWVzc2FnZXMucHVzaCgnTGludGVyLm5hbWUgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGludGVyLnNjb3BlICE9PSAnc3RyaW5nJyB8fCAobGludGVyLnNjb3BlICE9PSAnZmlsZScgJiYgbGludGVyLnNjb3BlICE9PSAncHJvamVjdCcpKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKFwiTGludGVyLnNjb3BlIG11c3QgYmUgZWl0aGVyICdmaWxlJyBvciAncHJvamVjdCdcIilcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsaW50ZXIubGludHNPbkNoYW5nZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKCdMaW50ZXIubGludHNPbkNoYW5nZSBtdXN0IGJlIGEgYm9vbGVhbicpXG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShsaW50ZXIuZ3JhbW1hclNjb3BlcykpIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goJ0xpbnRlci5ncmFtbWFyU2NvcGVzIG11c3QgYmUgYW4gQXJyYXknKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGxpbnRlci5saW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKCdMaW50ZXIubGludCBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlcy5wdXNoKCdMaW50ZXIgbXVzdCBiZSBhbiBvYmplY3QnKVxuICB9XG5cbiAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgIHNob3dFcnJvcihcbiAgICAgICdJbnZhbGlkIExpbnRlciByZWNlaXZlZCcsXG4gICAgICBgVGhlc2UgaXNzdWVzIHdlcmUgZW5jb3VudGVyZWQgd2hpbGUgcmVnaXN0ZXJpbmcgYSBMaW50ZXIgbmFtZWQgJyR7bGludGVyICYmIGxpbnRlci5uYW1lID8gbGludGVyLm5hbWUgOiAnVW5rbm93bid9J2AsXG4gICAgICBtZXNzYWdlcyxcbiAgICApXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUluZGllKGluZGllOiBJbmRpZSk6IGJvb2xlYW4ge1xuICBjb25zdCBtZXNzYWdlcyA9IFtdXG5cbiAgaWYgKGluZGllICYmIHR5cGVvZiBpbmRpZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIGluZGllLm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKCdJbmRpZS5uYW1lIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlcy5wdXNoKCdJbmRpZSBtdXN0IGJlIGFuIG9iamVjdCcpXG4gIH1cblxuICBpZiAobWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgc2hvd0Vycm9yKFxuICAgICAgJ0ludmFsaWQgSW5kaWUgcmVjZWl2ZWQnLFxuICAgICAgYFRoZXNlIGlzc3VlcyB3ZXJlIGVuY291bnRlcmVkIHdoaWxlIHJlZ2lzdGVyaW5nIGFuIEluZGllIExpbnRlciBuYW1lZCAnJHtcbiAgICAgICAgaW5kaWUgJiYgaW5kaWUubmFtZSA/IGluZGllLm5hbWUgOiAnVW5rbm93bidcbiAgICAgIH0nYCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgIClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWVzc2FnZXMobGludGVyTmFtZTogc3RyaW5nLCBlbnRyaWVzOiBBcnJheTxNZXNzYWdlPik6IGJvb2xlYW4ge1xuICBjb25zdCBtZXNzYWdlcyA9IFtdXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZW50cmllcykpIHtcbiAgICBsZXQgaW52YWxpZFVSTCA9IGZhbHNlXG4gICAgbGV0IGludmFsaWRJY29uID0gZmFsc2VcbiAgICBsZXQgaW52YWxpZEV4Y2VycHQgPSBmYWxzZVxuICAgIGxldCBpbnZhbGlkTG9jYXRpb24gPSBmYWxzZVxuICAgIGxldCBpbnZhbGlkU2V2ZXJpdHkgPSBmYWxzZVxuICAgIGxldCBpbnZhbGlkU29sdXRpb24gPSBmYWxzZVxuICAgIGxldCBpbnZhbGlkUmVmZXJlbmNlID0gZmFsc2VcbiAgICBsZXQgaW52YWxpZERlc2NyaXB0aW9uID0gZmFsc2VcbiAgICBsZXQgaW52YWxpZExpbnRlck5hbWUgPSBmYWxzZVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIHsgbGVuZ3RoIH0gPSBlbnRyaWVzOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlbnRyaWVzW2ldXG4gICAgICBjb25zdCB7IHJlZmVyZW5jZSB9ID0gbWVzc2FnZVxuICAgICAgaWYgKCFpbnZhbGlkSWNvbiAmJiBtZXNzYWdlLmljb24gJiYgdHlwZW9mIG1lc3NhZ2UuaWNvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaW52YWxpZEljb24gPSB0cnVlXG4gICAgICAgIG1lc3NhZ2VzLnB1c2goJ01lc3NhZ2UuaWNvbiBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgIWludmFsaWRMb2NhdGlvbiAmJlxuICAgICAgICAoIW1lc3NhZ2UubG9jYXRpb24gfHxcbiAgICAgICAgICB0eXBlb2YgbWVzc2FnZS5sb2NhdGlvbiAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICB0eXBlb2YgbWVzc2FnZS5sb2NhdGlvbi5maWxlICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICAgIHR5cGVvZiBtZXNzYWdlLmxvY2F0aW9uLnBvc2l0aW9uICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICAgICFtZXNzYWdlLmxvY2F0aW9uLnBvc2l0aW9uKVxuICAgICAgKSB7XG4gICAgICAgIGludmFsaWRMb2NhdGlvbiA9IHRydWVcbiAgICAgICAgbWVzc2FnZXMucHVzaCgnTWVzc2FnZS5sb2NhdGlvbiBtdXN0IGJlIHZhbGlkJylcbiAgICAgIH0gZWxzZSBpZiAoIWludmFsaWRMb2NhdGlvbikge1xuICAgICAgICBjb25zdCByYW5nZSA9IFJhbmdlLmZyb21PYmplY3QobWVzc2FnZS5sb2NhdGlvbi5wb3NpdGlvbilcbiAgICAgICAgaWYgKFxuICAgICAgICAgIE51bWJlci5pc05hTihyYW5nZS5zdGFydC5yb3cpIHx8XG4gICAgICAgICAgTnVtYmVyLmlzTmFOKHJhbmdlLnN0YXJ0LmNvbHVtbikgfHxcbiAgICAgICAgICBOdW1iZXIuaXNOYU4ocmFuZ2UuZW5kLnJvdykgfHxcbiAgICAgICAgICBOdW1iZXIuaXNOYU4ocmFuZ2UuZW5kLmNvbHVtbilcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW52YWxpZExvY2F0aW9uID0gdHJ1ZVxuICAgICAgICAgIG1lc3NhZ2VzLnB1c2goJ01lc3NhZ2UubG9jYXRpb24ucG9zaXRpb24gc2hvdWxkIG5vdCBjb250YWluIE5hTiBjb29yZGluYXRlcycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaW52YWxpZFNvbHV0aW9uICYmIG1lc3NhZ2Uuc29sdXRpb25zICYmICFBcnJheS5pc0FycmF5KG1lc3NhZ2Uuc29sdXRpb25zKSkge1xuICAgICAgICBpbnZhbGlkU29sdXRpb24gPSB0cnVlXG4gICAgICAgIG1lc3NhZ2VzLnB1c2goJ01lc3NhZ2Uuc29sdXRpb25zIG11c3QgYmUgdmFsaWQnKVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAhaW52YWxpZFJlZmVyZW5jZSAmJlxuICAgICAgICByZWZlcmVuY2UgJiZcbiAgICAgICAgKHR5cGVvZiByZWZlcmVuY2UgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgdHlwZW9mIHJlZmVyZW5jZS5maWxlICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICAgIHR5cGVvZiByZWZlcmVuY2UucG9zaXRpb24gIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgIXJlZmVyZW5jZS5wb3NpdGlvbilcbiAgICAgICkge1xuICAgICAgICBpbnZhbGlkUmVmZXJlbmNlID0gdHJ1ZVxuICAgICAgICBtZXNzYWdlcy5wdXNoKCdNZXNzYWdlLnJlZmVyZW5jZSBtdXN0IGJlIHZhbGlkJylcbiAgICAgIH0gZWxzZSBpZiAoIWludmFsaWRSZWZlcmVuY2UgJiYgcmVmZXJlbmNlKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gUG9pbnQuZnJvbU9iamVjdChyZWZlcmVuY2UucG9zaXRpb24pXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocG9zaXRpb24ucm93KSB8fCBOdW1iZXIuaXNOYU4ocG9zaXRpb24uY29sdW1uKSkge1xuICAgICAgICAgIGludmFsaWRSZWZlcmVuY2UgPSB0cnVlXG4gICAgICAgICAgbWVzc2FnZXMucHVzaCgnTWVzc2FnZS5yZWZlcmVuY2UucG9zaXRpb24gc2hvdWxkIG5vdCBjb250YWluIE5hTiBjb29yZGluYXRlcycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaW52YWxpZEV4Y2VycHQgJiYgdHlwZW9mIG1lc3NhZ2UuZXhjZXJwdCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaW52YWxpZEV4Y2VycHQgPSB0cnVlXG4gICAgICAgIG1lc3NhZ2VzLnB1c2goJ01lc3NhZ2UuZXhjZXJwdCBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICAgIH1cbiAgICAgIGlmICghaW52YWxpZFNldmVyaXR5ICYmICFWQUxJRF9TRVZFUklUWS5oYXMobWVzc2FnZS5zZXZlcml0eSkpIHtcbiAgICAgICAgaW52YWxpZFNldmVyaXR5ID0gdHJ1ZVxuICAgICAgICBtZXNzYWdlcy5wdXNoKFwiTWVzc2FnZS5zZXZlcml0eSBtdXN0IGJlICdlcnJvcicsICd3YXJuaW5nJyBvciAnaW5mbydcIilcbiAgICAgIH1cbiAgICAgIGlmICghaW52YWxpZFVSTCAmJiBtZXNzYWdlLnVybCAmJiB0eXBlb2YgbWVzc2FnZS51cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGludmFsaWRVUkwgPSB0cnVlXG4gICAgICAgIG1lc3NhZ2VzLnB1c2goJ01lc3NhZ2UudXJsIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAhaW52YWxpZERlc2NyaXB0aW9uICYmXG4gICAgICAgIG1lc3NhZ2UuZGVzY3JpcHRpb24gJiZcbiAgICAgICAgdHlwZW9mIG1lc3NhZ2UuZGVzY3JpcHRpb24gIT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgdHlwZW9mIG1lc3NhZ2UuZGVzY3JpcHRpb24gIT09ICdzdHJpbmcnXG4gICAgICApIHtcbiAgICAgICAgaW52YWxpZERlc2NyaXB0aW9uID0gdHJ1ZVxuICAgICAgICBtZXNzYWdlcy5wdXNoKCdNZXNzYWdlLmRlc2NyaXB0aW9uIG11c3QgYmUgYSBmdW5jdGlvbiBvciBzdHJpbmcnKVxuICAgICAgfVxuICAgICAgaWYgKCFpbnZhbGlkTGludGVyTmFtZSAmJiBtZXNzYWdlLmxpbnRlck5hbWUgJiYgdHlwZW9mIG1lc3NhZ2UubGludGVyTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaW52YWxpZExpbnRlck5hbWUgPSB0cnVlXG4gICAgICAgIG1lc3NhZ2VzLnB1c2goJ01lc3NhZ2UubGludGVyTmFtZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZXMucHVzaCgnTGludGVyIFJlc3VsdCBtdXN0IGJlIGFuIEFycmF5JylcbiAgfVxuXG4gIGlmIChtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICBzaG93RXJyb3IoXG4gICAgICAnSW52YWxpZCBMaW50ZXIgUmVzdWx0IHJlY2VpdmVkJyxcbiAgICAgIGBUaGVzZSBpc3N1ZXMgd2VyZSBlbmNvdW50ZXJlZCB3aGlsZSBwcm9jZXNzaW5nIG1lc3NhZ2VzIGZyb20gYSBsaW50ZXIgbmFtZWQgJyR7bGludGVyTmFtZX0nYCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgIClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCB7IHZhbGlkYXRlVUkgYXMgdWksIHZhbGlkYXRlTGludGVyIGFzIGxpbnRlciwgdmFsaWRhdGVJbmRpZSBhcyBpbmRpZSwgdmFsaWRhdGVNZXNzYWdlcyBhcyBtZXNzYWdlcyB9XG4iXX0=