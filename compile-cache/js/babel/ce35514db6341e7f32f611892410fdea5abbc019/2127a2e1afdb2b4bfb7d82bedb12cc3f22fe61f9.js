Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.provider = provider;
exports.suggestionsList = suggestionsList;
exports.suggestionsShow = suggestionsShow;

function provider(entry) {
  var message = undefined;
  if (!entry || typeof entry !== 'object') {
    message = 'Invalid provider provided';
  } else if (!Array.isArray(entry.grammarScopes)) {
    message = 'Invalid or no grammarScopes found on provider';
  } else if (typeof entry.getIntentions !== 'function') {
    message = 'Invalid or no getIntentions found on provider';
  }
  if (message) {
    console.log('[Intentions] Invalid provider', entry);
    throw new Error(message);
  }
}

function suggestionsList(suggestions) {
  if (Array.isArray(suggestions)) {
    var suggestionsLength = suggestions.length;
    for (var i = 0; i < suggestionsLength; ++i) {
      var suggestion = suggestions[i];
      var message = undefined;
      if (typeof suggestion.title !== 'string') {
        message = 'Invalid or no title found on intention';
      } else if (typeof suggestion.selected !== 'function') {
        message = 'Invalid or no selected found on intention';
      }
      if (message) {
        console.log('[Intentions] Invalid suggestion of type list', suggestion);
        throw new Error(message);
      }
    }
  }
  return suggestions;
}

function suggestionsShow(suggestions) {
  if (Array.isArray(suggestions)) {
    var suggestionsLength = suggestions.length;
    for (var i = 0; i < suggestionsLength; ++i) {
      var suggestion = suggestions[i];
      var message = undefined;
      if (typeof suggestion.range !== 'object' || !suggestion.range) {
        message = 'Invalid or no range found on intention';
      } else if (suggestion['class'] && typeof suggestion['class'] !== 'string') {
        message = 'Invalid class found on intention';
      } else if (typeof suggestion.created !== 'function') {
        message = 'Invalid or no created found on intention';
      }
      if (message) {
        console.log('[Intentions] Invalid suggestion of type show', suggestion);
        throw new Error(message);
      }
    }
  }
  return suggestions;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FyY2hpZS8uYXRvbS9wYWNrYWdlcy9pbnRlbnRpb25zL2xpYi92YWxpZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSU8sU0FBUyxRQUFRLENBQUMsS0FBdUMsRUFBRTtBQUNoRSxNQUFJLE9BQU8sWUFBQSxDQUFBO0FBQ1gsTUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDdkMsV0FBTyxHQUFHLDJCQUEyQixDQUFBO0dBQ3RDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFO0FBQzlDLFdBQU8sR0FBRywrQ0FBK0MsQ0FBQTtHQUMxRCxNQUFNLElBQUksT0FBTyxLQUFLLENBQUMsYUFBYSxLQUFLLFVBQVUsRUFBRTtBQUNwRCxXQUFPLEdBQUcsK0NBQStDLENBQUE7R0FDMUQ7QUFDRCxNQUFJLE9BQU8sRUFBRTtBQUNYLFdBQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDbkQsVUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtHQUN6QjtDQUNGOztBQUVNLFNBQVMsZUFBZSxDQUFDLFdBQTRCLEVBQW1CO0FBQzdFLE1BQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUM5QixRQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUE7QUFDNUMsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQzFDLFVBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxVQUFJLE9BQU8sWUFBQSxDQUFBO0FBQ1gsVUFBSSxPQUFPLFVBQVUsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ3hDLGVBQU8sR0FBRyx3Q0FBd0MsQ0FBQTtPQUNuRCxNQUFNLElBQUksT0FBTyxVQUFVLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtBQUNwRCxlQUFPLEdBQUcsMkNBQTJDLENBQUE7T0FDdEQ7QUFDRCxVQUFJLE9BQU8sRUFBRTtBQUNYLGVBQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDdkUsY0FBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtPQUN6QjtLQUNGO0dBQ0Y7QUFDRCxTQUFPLFdBQVcsQ0FBQTtDQUNuQjs7QUFFTSxTQUFTLGVBQWUsQ0FBQyxXQUFpQyxFQUF3QjtBQUN2RixNQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDOUIsUUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFBO0FBQzVDLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUMxQyxVQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakMsVUFBSSxPQUFPLFlBQUEsQ0FBQTtBQUNYLFVBQUksT0FBTyxVQUFVLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDN0QsZUFBTyxHQUFHLHdDQUF3QyxDQUFBO09BQ25ELE1BQU0sSUFBSSxVQUFVLFNBQU0sSUFBSSxPQUFPLFVBQVUsU0FBTSxLQUFLLFFBQVEsRUFBRTtBQUNuRSxlQUFPLEdBQUcsa0NBQWtDLENBQUE7T0FDN0MsTUFBTSxJQUFJLE9BQU8sVUFBVSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDbkQsZUFBTyxHQUFHLDBDQUEwQyxDQUFBO09BQ3JEO0FBQ0QsVUFBSSxPQUFPLEVBQUU7QUFDWCxlQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3ZFLGNBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7T0FDekI7S0FDRjtHQUNGO0FBQ0QsU0FBTyxXQUFXLENBQUE7Q0FDbkIiLCJmaWxlIjoiL2hvbWUvYXJjaGllLy5hdG9tL3BhY2thZ2VzL2ludGVudGlvbnMvbGliL3ZhbGlkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHR5cGUgeyBMaXN0UHJvdmlkZXIsIExpc3RJdGVtLCBIaWdobGlnaHRQcm92aWRlciwgSGlnaGxpZ2h0SXRlbSB9IGZyb20gJy4vdHlwZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlcihlbnRyeTogTGlzdFByb3ZpZGVyIHwgSGlnaGxpZ2h0UHJvdmlkZXIpIHtcbiAgbGV0IG1lc3NhZ2VcbiAgaWYgKCFlbnRyeSB8fCB0eXBlb2YgZW50cnkgIT09ICdvYmplY3QnKSB7XG4gICAgbWVzc2FnZSA9ICdJbnZhbGlkIHByb3ZpZGVyIHByb3ZpZGVkJ1xuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGVudHJ5LmdyYW1tYXJTY29wZXMpKSB7XG4gICAgbWVzc2FnZSA9ICdJbnZhbGlkIG9yIG5vIGdyYW1tYXJTY29wZXMgZm91bmQgb24gcHJvdmlkZXInXG4gIH0gZWxzZSBpZiAodHlwZW9mIGVudHJ5LmdldEludGVudGlvbnMgIT09ICdmdW5jdGlvbicpIHtcbiAgICBtZXNzYWdlID0gJ0ludmFsaWQgb3Igbm8gZ2V0SW50ZW50aW9ucyBmb3VuZCBvbiBwcm92aWRlcidcbiAgfVxuICBpZiAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKCdbSW50ZW50aW9uc10gSW52YWxpZCBwcm92aWRlcicsIGVudHJ5KVxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0aW9uc0xpc3Qoc3VnZ2VzdGlvbnM6IEFycmF5PExpc3RJdGVtPik6IEFycmF5PExpc3RJdGVtPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHN1Z2dlc3Rpb25zKSkge1xuICAgIGNvbnN0IHN1Z2dlc3Rpb25zTGVuZ3RoID0gc3VnZ2VzdGlvbnMubGVuZ3RoXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWdnZXN0aW9uc0xlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBzdWdnZXN0aW9uID0gc3VnZ2VzdGlvbnNbaV1cbiAgICAgIGxldCBtZXNzYWdlXG4gICAgICBpZiAodHlwZW9mIHN1Z2dlc3Rpb24udGl0bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAnSW52YWxpZCBvciBubyB0aXRsZSBmb3VuZCBvbiBpbnRlbnRpb24nXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWdnZXN0aW9uLnNlbGVjdGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAnSW52YWxpZCBvciBubyBzZWxlY3RlZCBmb3VuZCBvbiBpbnRlbnRpb24nXG4gICAgICB9XG4gICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnW0ludGVudGlvbnNdIEludmFsaWQgc3VnZ2VzdGlvbiBvZiB0eXBlIGxpc3QnLCBzdWdnZXN0aW9uKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1Z2dlc3Rpb25zXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0aW9uc1Nob3coc3VnZ2VzdGlvbnM6IEFycmF5PEhpZ2hsaWdodEl0ZW0+KTogQXJyYXk8SGlnaGxpZ2h0SXRlbT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShzdWdnZXN0aW9ucykpIHtcbiAgICBjb25zdCBzdWdnZXN0aW9uc0xlbmd0aCA9IHN1Z2dlc3Rpb25zLmxlbmd0aFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VnZ2VzdGlvbnNMZW5ndGg7ICsraSkge1xuICAgICAgY29uc3Qgc3VnZ2VzdGlvbiA9IHN1Z2dlc3Rpb25zW2ldXG4gICAgICBsZXQgbWVzc2FnZVxuICAgICAgaWYgKHR5cGVvZiBzdWdnZXN0aW9uLnJhbmdlICE9PSAnb2JqZWN0JyB8fCAhc3VnZ2VzdGlvbi5yYW5nZSkge1xuICAgICAgICBtZXNzYWdlID0gJ0ludmFsaWQgb3Igbm8gcmFuZ2UgZm91bmQgb24gaW50ZW50aW9uJ1xuICAgICAgfSBlbHNlIGlmIChzdWdnZXN0aW9uLmNsYXNzICYmIHR5cGVvZiBzdWdnZXN0aW9uLmNsYXNzICE9PSAnc3RyaW5nJykge1xuICAgICAgICBtZXNzYWdlID0gJ0ludmFsaWQgY2xhc3MgZm91bmQgb24gaW50ZW50aW9uJ1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3VnZ2VzdGlvbi5jcmVhdGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAnSW52YWxpZCBvciBubyBjcmVhdGVkIGZvdW5kIG9uIGludGVudGlvbidcbiAgICAgIH1cbiAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbSW50ZW50aW9uc10gSW52YWxpZCBzdWdnZXN0aW9uIG9mIHR5cGUgc2hvdycsIHN1Z2dlc3Rpb24pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3VnZ2VzdGlvbnNcbn1cbiJdfQ==