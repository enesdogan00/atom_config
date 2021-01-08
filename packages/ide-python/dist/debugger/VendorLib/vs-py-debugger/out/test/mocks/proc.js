"use strict";

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

const events_1 = require("events");

require("rxjs/add/observable/of");

const Observable_1 = require("rxjs/Observable");

exports.IOriginalProcessService = Symbol('IProcessService');

class MockProcessService extends events_1.EventEmitter {
  constructor(procService) {
    super();
    this.procService = procService;
  }

  onExecObservable(handler) {
    this.on('execObservable', handler);
  }

  execObservable(file, args, options = {}) {
    let value;
    let valueReturned = false;
    this.emit('execObservable', file, args, options, result => {
      value = result;
      valueReturned = true;
    });

    if (valueReturned) {
      const output = value;

      if (['stderr', 'stdout'].some(source => source === output.source)) {
        return {
          // tslint:disable-next-line:no-any
          proc: {},
          out: Observable_1.Observable.of(output)
        };
      } else {
        return {
          // tslint:disable-next-line:no-any
          proc: {},
          out: value
        };
      }
    } else {
      return this.procService.execObservable(file, args, options);
    }
  }

  onExec(handler) {
    this.on('exec', handler);
  }

  exec(file, args, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      let value;
      let valueReturned = false;
      this.emit('exec', file, args, options, result => {
        value = result;
        valueReturned = true;
      });
      return valueReturned ? value : this.procService.exec(file, args, options);
    });
  }

}

exports.MockProcessService = MockProcessService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2MuanMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsImV2ZW50c18xIiwicmVxdWlyZSIsIk9ic2VydmFibGVfMSIsIklPcmlnaW5hbFByb2Nlc3NTZXJ2aWNlIiwiU3ltYm9sIiwiTW9ja1Byb2Nlc3NTZXJ2aWNlIiwiRXZlbnRFbWl0dGVyIiwiY29uc3RydWN0b3IiLCJwcm9jU2VydmljZSIsIm9uRXhlY09ic2VydmFibGUiLCJoYW5kbGVyIiwib24iLCJleGVjT2JzZXJ2YWJsZSIsImZpbGUiLCJhcmdzIiwib3B0aW9ucyIsInZhbHVlUmV0dXJuZWQiLCJlbWl0Iiwib3V0cHV0Iiwic29tZSIsInNvdXJjZSIsInByb2MiLCJvdXQiLCJPYnNlcnZhYmxlIiwib2YiLCJvbkV4ZWMiLCJleGVjIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFJQSxTQUFTLEdBQUksVUFBUSxTQUFLQSxTQUFkLElBQTRCLFVBQVVDLE9BQVYsRUFBbUJDLFVBQW5CLEVBQStCQyxDQUEvQixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFDckYsU0FBTyxLQUFLRCxDQUFDLEtBQUtBLENBQUMsR0FBR0UsT0FBVCxDQUFOLEVBQXlCLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3ZELGFBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQUUsVUFBSTtBQUFFQyxRQUFBQSxJQUFJLENBQUNOLFNBQVMsQ0FBQ08sSUFBVixDQUFlRixLQUFmLENBQUQsQ0FBSjtBQUE4QixPQUFwQyxDQUFxQyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsUUFBQUEs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QUE1QyxDQUFQO0FBQ0g7QUFDSjs7QUFDRFUsRUFBQUEsTUFBTSxDQUFDZixPQUFELEVBQVU7QUFDWixTQUFLQyxFQUFMLENBQVEsTUFBUixFQUFnQkQsT0FBaEI7QUFDSDs7QUFDRGdCLEVBQUFBLElBQUksQ0FBQ2IsSUFBRCxFQUFPQyxJQUFQLEVBQWFDLE9BQU8sR0FBRyxFQUF2QixFQUEyQjtBQUMzQixXQUFPcEMsU0FBUyxDQUFDLElBQUQsRUFBTyxLQUFLLENBQVosRUFBZSxLQUFLLENBQXBCLEVBQXVCLGFBQWE7QUFDaEQsVUFBSVMsS0FBSjtBQUNBLFVBQUk0QixhQUFhLEdBQUcsS0FBcEI7QUFDQSxXQUFLQyxJQUFMLENBQVUsTUFBVixFQUFrQkosSUFBbEIsRUFBd0JDLElBQXhCLEVBQThCQyxPQUE5QixFQUF3Q3RCLE1BQUQsSUFBWTtBQUFFTCxRQUFBQSxLQUFLLEdBQUdLLE1BQVI7QUFBZ0J1QixRQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFBdUIsT0FBNUY7QUFDQSxhQUFPQSxhQUFhLEdBQUc1QixLQUFILEdBQVcsS0FBS29CLFdBQUwsQ0FBaUJrQixJQUFqQixDQUFzQmIsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDQyxPQUFsQyxDQUEvQjtBQUNILEtBTGUsQ0FBaEI7QUFNSDs7QUEzQ2tEOztBQTZDdkRoQixPQUFPLENBQUNNLGtCQUFSLEdBQTZCQSxrQkFBN0IiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXZlbnRzXzEgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xucmVxdWlyZShcInJ4anMvYWRkL29ic2VydmFibGUvb2ZcIik7XG5jb25zdCBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwicnhqcy9PYnNlcnZhYmxlXCIpO1xuZXhwb3J0cy5JT3JpZ2luYWxQcm9jZXNzU2VydmljZSA9IFN5bWJvbCgnSVByb2Nlc3NTZXJ2aWNlJyk7XG5jbGFzcyBNb2NrUHJvY2Vzc1NlcnZpY2UgZXh0ZW5kcyBldmVudHNfMS5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHByb2NTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucHJvY1NlcnZpY2UgPSBwcm9jU2VydmljZTtcbiAgICB9XG4gICAgb25FeGVjT2JzZXJ2YWJsZShoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMub24oJ2V4ZWNPYnNlcnZhYmxlJywgaGFuZGxlcik7XG4gICAgfVxuICAgIGV4ZWNPYnNlcnZhYmxlKGZpbGUsIGFyZ3MsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZVJldHVybmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdCgnZXhlY09ic2VydmFibGUnLCBmaWxlLCBhcmdzLCBvcHRpb25zLCAocmVzdWx0KSA9PiB7IHZhbHVlID0gcmVzdWx0OyB2YWx1ZVJldHVybmVkID0gdHJ1ZTsgfSk7XG4gICAgICAgIGlmICh2YWx1ZVJldHVybmVkKSB7XG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChbJ3N0ZGVycicsICdzdGRvdXQnXS5zb21lKHNvdXJjZSA9PiBzb3VyY2UgPT09IG91dHB1dC5zb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICAgICAgICBwcm9jOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgb3V0OiBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5vZihvdXRwdXQpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgICAgICAgICAgcHJvYzoge30sXG4gICAgICAgICAgICAgICAgICAgIG91dDogdmFsdWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY1NlcnZpY2UuZXhlY09ic2VydmFibGUoZmlsZSwgYXJncywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25FeGVjKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5vbignZXhlYycsIGhhbmRsZXIpO1xuICAgIH1cbiAgICBleGVjKGZpbGUsIGFyZ3MsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlUmV0dXJuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZXhlYycsIGZpbGUsIGFyZ3MsIG9wdGlvbnMsIChyZXN1bHQpID0+IHsgdmFsdWUgPSByZXN1bHQ7IHZhbHVlUmV0dXJuZWQgPSB0cnVlOyB9KTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVJldHVybmVkID8gdmFsdWUgOiB0aGlzLnByb2NTZXJ2aWNlLmV4ZWMoZmlsZSwgYXJncywgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuTW9ja1Byb2Nlc3NTZXJ2aWNlID0gTW9ja1Byb2Nlc3NTZXJ2aWNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvYy5qcy5tYXAiXX0=