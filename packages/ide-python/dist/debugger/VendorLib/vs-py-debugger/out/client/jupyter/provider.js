"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_1 = require("vscode");

class JupyterProvider {
  /**
   * Returns a Regular Expression used to determine whether a line is a Cell delimiter or not
   *
   * @type {RegExp}
   * @memberOf LanguageProvider
   */
  get cellIdentifier() {
    return /^(# %%|#%%|# \<codecell\>|# In\[\d*?\]|# In\[ \])(.*)/i;
  }
  /**
   * Returns the selected code
   * If not implemented, then the currently active line or selected code is taken.
   * Can be implemented to ensure valid blocks of code are selected.
   * E.g if user selects only the If statement, code can be impelemented to ensure all code within the if statement (block) is returned
   * @param {string} selectedCode The selected code as identified by this extension.
   * @param {Range} [currentCell] Range of the currently active cell
   * @returns {Promise<string>} The code selected. If nothing is to be done, return the parameter value.
   *
   * @memberOf LanguageProvider
   */


  getSelectedCode(selectedCode, currentCell) {
    if (!JupyterProvider.isCodeBlock(selectedCode)) {
      return Promise.resolve(selectedCode);
    } // ok we're in a block, look for the end of the block untill the last line in the cell (if there are any cells)


    return new Promise((resolve, reject) => {
      const activeEditor = vscode_1.window.activeTextEditor;
      const endLineNumber = currentCell ? currentCell.end.line : activeEditor.document.lineCount - 1;
      const startIndent = selectedCode.indexOf(selectedCode.trim());
      const nextStartLine = activeEditor.selection.start.line + 1;

      for (let lineNumber = nextStartLine; lineNumber <= endLineNumber; lineNumber++) {
        const line = activeEditor.document.lineAt(lineNumber);
        const nextLine = line.text;
        const nextLineIndent = nextLine.indexOf(nextLine.trim());

        if (nextLine.trim().indexOf('#') === 0) {
          continue;
        }

        if (nextLineIndent === startIndent) {
          // Return code untill previous line
          const endRange = activeEditor.document.lineAt(lineNumber - 1).range.end;
          resolve(activeEditor.document.getText(new vscode_1.Range(activeEditor.selection.start, endRange)));
        }
      }

      resolve(activeEditor.document.getText(currentCell));
    });
  }
  /**
   * Gets the first line (position) of executable code within a range
   *
   * @param {TextDocument} document
   * @param {number} startLine
   * @param {number} endLine
   * @returns {Promise<Position>}
   *
   * @memberOf LanguageProvider
   */


  getFirstLineOfExecutableCode(document, range) {
    for (let lineNumber = range.start.line; lineNumber < range.end.line; lineNumber++) {
      let line = document.lineAt(lineNumber);

      if (line.isEmptyOrWhitespace) {
        continue;
      }

      const lineText = line.text;
      const trimmedLine = lineText.trim();

      if (trimmedLine.startsWith('#')) {
        continue;
      } // Yay we have a line
      // Remember, we need to set the cursor to a character other than white space
      // Highlighting doesn't kick in for comments or white space


      return Promise.resolve(new vscode_1.Position(lineNumber, lineText.indexOf(trimmedLine)));
    } // give up


    return Promise.resolve(new vscode_1.Position(range.start.line, 0));
  }

  static isCodeBlock(code) {
    return code.trim().endsWith(':') && code.indexOf('#') === -1;
  }

}

exports.JupyterProvider = JupyterProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwidnNjb2RlXzEiLCJyZXF1aXJlIiwiSnVweXRlclByb3ZpZGVyIiwiY2VsbElkZW50aWZpZXIiLCJnZXRTZWxlY3RlZENvZGUiLCJzZWxlY3RlZENvZGUiLCJjdXJyZW50Q2VsbCIsImlzQ29kZUJsb2NrIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJhY3RpdmVFZGl0b3IiLCJ3aW5kb3ciLCJhY3RpdmVUZXh0RWRpdG9yIiwiZW5kTGluZU51bWJlciIsImVuZCIsImxpbmUiLCJkb2N1bWVudCIsImxpbmVDb3VudCIsInN0YXJ0SW5kZW50IiwiaW5kZXhPZiIsInRyaW0iLCJuZXh0U3RhcnRMaW5lIiwic2VsZWN0aW9uIiwic3RhcnQiLCJsaW5lTnVtYmVyIiwibGluZUF0IiwibmV4dExpbmUiLCJ0ZXh0IiwibmV4dExpbmVJbmRlbnQiLCJlbmRSYW5nZSIsInJhbmdlIiwiZ2V0VGV4dCIsIlJhbmdlIiwiZ2V0Rmlyc3RMaW5lT2ZFeGVjdXRhYmxlQ29kZSIsImlzRW1wdHlPcldoaXRlc3BhY2UiLCJsaW5lVGV4dCIsInRyaW1tZWRMaW5lIiwic3RhcnRzV2l0aCIsIlBvc2l0aW9uIiwiY29kZSIsImVuZHNXaXRoIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXhCOztBQUNBLE1BQU1DLGVBQU4sQ0FBc0I7QUFDbEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksTUFBSUMsY0FBSixHQUFxQjtBQUNqQixXQUFPLHdEQUFQO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7OztBQUNBLGFBQU85QixPQUFPLENBQUNDLE9BQVIsQ0FBZ0IsSUFBSVQsUUFBUSxDQUFDdUMsUUFBYixDQUFzQmQsVUFBdEIsRUFBa0NXLFFBQVEsQ0FBQ2hCLE9BQVQsQ0FBaUJpQixXQUFqQixDQUFsQyxDQUFoQixDQUFQO0FBQ0gsS0FmeUMsQ0FnQjFDOzs7QUFDQSxXQUFPN0IsT0FBTyxDQUFDQyxPQUFSLENBQWdCLElBQUlULFFBQVEsQ0FBQ3VDLFFBQWIsQ0FBc0JSLEtBQUssQ0FBQ1AsS0FBTixDQUFZUixJQUFsQyxFQUF3QyxDQUF4QyxDQUFoQixDQUFQO0FBQ0g7O0FBQ0QsU0FBT1QsV0FBUCxDQUFtQmlDLElBQW5CLEVBQXlCO0FBQ3JCLFdBQU9BLElBQUksQ0FBQ25CLElBQUwsR0FBWW9CLFFBQVosQ0FBcUIsR0FBckIsS0FBNkJELElBQUksQ0FBQ3BCLE9BQUwsQ0FBYSxHQUFiLE1BQXNCLENBQUMsQ0FBM0Q7QUFDSDs7QUE5RWlCOztBQWdGdEJ0QixPQUFPLENBQUNJLGVBQVIsR0FBMEJBLGVBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2c2NvZGVfMSA9IHJlcXVpcmUoXCJ2c2NvZGVcIik7XG5jbGFzcyBKdXB5dGVyUHJvdmlkZXIge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBSZWd1bGFyIEV4cHJlc3Npb24gdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciBhIGxpbmUgaXMgYSBDZWxsIGRlbGltaXRlciBvciBub3RcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICogQG1lbWJlck9mIExhbmd1YWdlUHJvdmlkZXJcbiAgICAgKi9cbiAgICBnZXQgY2VsbElkZW50aWZpZXIoKSB7XG4gICAgICAgIHJldHVybiAvXigjICUlfCMlJXwjIFxcPGNvZGVjZWxsXFw+fCMgSW5cXFtcXGQqP1xcXXwjIEluXFxbIFxcXSkoLiopL2k7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlbGVjdGVkIGNvZGVcbiAgICAgKiBJZiBub3QgaW1wbGVtZW50ZWQsIHRoZW4gdGhlIGN1cnJlbnRseSBhY3RpdmUgbGluZSBvciBzZWxlY3RlZCBjb2RlIGlzIHRha2VuLlxuICAgICAqIENhbiBiZSBpbXBsZW1lbnRlZCB0byBlbnN1cmUgdmFsaWQgYmxvY2tzIG9mIGNvZGUgYXJlIHNlbGVjdGVkLlxuICAgICAqIEUuZyBpZiB1c2VyIHNlbGVjdHMgb25seSB0aGUgSWYgc3RhdGVtZW50LCBjb2RlIGNhbiBiZSBpbXBlbGVtZW50ZWQgdG8gZW5zdXJlIGFsbCBjb2RlIHdpdGhpbiB0aGUgaWYgc3RhdGVtZW50IChibG9jaykgaXMgcmV0dXJuZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWRDb2RlIFRoZSBzZWxlY3RlZCBjb2RlIGFzIGlkZW50aWZpZWQgYnkgdGhpcyBleHRlbnNpb24uXG4gICAgICogQHBhcmFtIHtSYW5nZX0gW2N1cnJlbnRDZWxsXSBSYW5nZSBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBjZWxsXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gVGhlIGNvZGUgc2VsZWN0ZWQuIElmIG5vdGhpbmcgaXMgdG8gYmUgZG9uZSwgcmV0dXJuIHRoZSBwYXJhbWV0ZXIgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTGFuZ3VhZ2VQcm92aWRlclxuICAgICAqL1xuICAgIGdldFNlbGVjdGVkQ29kZShzZWxlY3RlZENvZGUsIGN1cnJlbnRDZWxsKSB7XG4gICAgICAgIGlmICghSnVweXRlclByb3ZpZGVyLmlzQ29kZUJsb2NrKHNlbGVjdGVkQ29kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2VsZWN0ZWRDb2RlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvayB3ZSdyZSBpbiBhIGJsb2NrLCBsb29rIGZvciB0aGUgZW5kIG9mIHRoZSBibG9jayB1bnRpbGwgdGhlIGxhc3QgbGluZSBpbiB0aGUgY2VsbCAoaWYgdGhlcmUgYXJlIGFueSBjZWxscylcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUVkaXRvciA9IHZzY29kZV8xLndpbmRvdy5hY3RpdmVUZXh0RWRpdG9yO1xuICAgICAgICAgICAgY29uc3QgZW5kTGluZU51bWJlciA9IGN1cnJlbnRDZWxsID8gY3VycmVudENlbGwuZW5kLmxpbmUgOiBhY3RpdmVFZGl0b3IuZG9jdW1lbnQubGluZUNvdW50IC0gMTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZW50ID0gc2VsZWN0ZWRDb2RlLmluZGV4T2Yoc2VsZWN0ZWRDb2RlLnRyaW0oKSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0U3RhcnRMaW5lID0gYWN0aXZlRWRpdG9yLnNlbGVjdGlvbi5zdGFydC5saW5lICsgMTtcbiAgICAgICAgICAgIGZvciAobGV0IGxpbmVOdW1iZXIgPSBuZXh0U3RhcnRMaW5lOyBsaW5lTnVtYmVyIDw9IGVuZExpbmVOdW1iZXI7IGxpbmVOdW1iZXIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBhY3RpdmVFZGl0b3IuZG9jdW1lbnQubGluZUF0KGxpbmVOdW1iZXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMaW5lID0gbGluZS50ZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMaW5lSW5kZW50ID0gbmV4dExpbmUuaW5kZXhPZihuZXh0TGluZS50cmltKCkpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0TGluZS50cmltKCkuaW5kZXhPZignIycpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV4dExpbmVJbmRlbnQgPT09IHN0YXJ0SW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBjb2RlIHVudGlsbCBwcmV2aW91cyBsaW5lXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZFJhbmdlID0gYWN0aXZlRWRpdG9yLmRvY3VtZW50LmxpbmVBdChsaW5lTnVtYmVyIC0gMSkucmFuZ2UuZW5kO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZUVkaXRvci5kb2N1bWVudC5nZXRUZXh0KG5ldyB2c2NvZGVfMS5SYW5nZShhY3RpdmVFZGl0b3Iuc2VsZWN0aW9uLnN0YXJ0LCBlbmRSYW5nZSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKGFjdGl2ZUVkaXRvci5kb2N1bWVudC5nZXRUZXh0KGN1cnJlbnRDZWxsKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBmaXJzdCBsaW5lIChwb3NpdGlvbikgb2YgZXhlY3V0YWJsZSBjb2RlIHdpdGhpbiBhIHJhbmdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RleHREb2N1bWVudH0gZG9jdW1lbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRMaW5lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVuZExpbmVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQb3NpdGlvbj59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgTGFuZ3VhZ2VQcm92aWRlclxuICAgICAqL1xuICAgIGdldEZpcnN0TGluZU9mRXhlY3V0YWJsZUNvZGUoZG9jdW1lbnQsIHJhbmdlKSB7XG4gICAgICAgIGZvciAobGV0IGxpbmVOdW1iZXIgPSByYW5nZS5zdGFydC5saW5lOyBsaW5lTnVtYmVyIDwgcmFuZ2UuZW5kLmxpbmU7IGxpbmVOdW1iZXIrKykge1xuICAgICAgICAgICAgbGV0IGxpbmUgPSBkb2N1bWVudC5saW5lQXQobGluZU51bWJlcik7XG4gICAgICAgICAgICBpZiAobGluZS5pc0VtcHR5T3JXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsaW5lVGV4dCA9IGxpbmUudGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHRyaW1tZWRMaW5lID0gbGluZVRleHQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKHRyaW1tZWRMaW5lLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gWWF5IHdlIGhhdmUgYSBsaW5lXG4gICAgICAgICAgICAvLyBSZW1lbWJlciwgd2UgbmVlZCB0byBzZXQgdGhlIGN1cnNvciB0byBhIGNoYXJhY3RlciBvdGhlciB0aGFuIHdoaXRlIHNwYWNlXG4gICAgICAgICAgICAvLyBIaWdobGlnaHRpbmcgZG9lc24ndCBraWNrIGluIGZvciBjb21tZW50cyBvciB3aGl0ZSBzcGFjZVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgdnNjb2RlXzEuUG9zaXRpb24obGluZU51bWJlciwgbGluZVRleHQuaW5kZXhPZih0cmltbWVkTGluZSkpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBnaXZlIHVwXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IHZzY29kZV8xLlBvc2l0aW9uKHJhbmdlLnN0YXJ0LmxpbmUsIDApKTtcbiAgICB9XG4gICAgc3RhdGljIGlzQ29kZUJsb2NrKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGNvZGUudHJpbSgpLmVuZHNXaXRoKCc6JykgJiYgY29kZS5pbmRleE9mKCcjJykgPT09IC0xO1xuICAgIH1cbn1cbmV4cG9ydHMuSnVweXRlclByb3ZpZGVyID0gSnVweXRlclByb3ZpZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvdmlkZXIuanMubWFwIl19