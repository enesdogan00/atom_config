// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IProtocolParser = Symbol('IProtocolParser');
exports.IProtocolLogger = Symbol('IProtocolLogger');
exports.IDebugStreamProvider = Symbol('IDebugStreamProvider');
exports.IProtocolMessageWriter = Symbol('IProtocolMessageWriter');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiSVByb3RvY29sUGFyc2VyIiwiU3ltYm9sIiwiSVByb3RvY29sTG9nZ2VyIiwiSURlYnVnU3RyZWFtUHJvdmlkZXIiLCJJUHJvdG9jb2xNZXNzYWdlV3JpdGVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7QUFDQUQsT0FBTyxDQUFDRSxlQUFSLEdBQTBCQyxNQUFNLENBQUMsaUJBQUQsQ0FBaEM7QUFDQUgsT0FBTyxDQUFDSSxlQUFSLEdBQTBCRCxNQUFNLENBQUMsaUJBQUQsQ0FBaEM7QUFDQUgsT0FBTyxDQUFDSyxvQkFBUixHQUErQkYsTUFBTSxDQUFDLHNCQUFELENBQXJDO0FBQ0FILE9BQU8sQ0FBQ00sc0JBQVIsR0FBaUNILE1BQU0sQ0FBQyx3QkFBRCxDQUF2QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JUHJvdG9jb2xQYXJzZXIgPSBTeW1ib2woJ0lQcm90b2NvbFBhcnNlcicpO1xuZXhwb3J0cy5JUHJvdG9jb2xMb2dnZXIgPSBTeW1ib2woJ0lQcm90b2NvbExvZ2dlcicpO1xuZXhwb3J0cy5JRGVidWdTdHJlYW1Qcm92aWRlciA9IFN5bWJvbCgnSURlYnVnU3RyZWFtUHJvdmlkZXInKTtcbmV4cG9ydHMuSVByb3RvY29sTWVzc2FnZVdyaXRlciA9IFN5bWJvbCgnSVByb3RvY29sTWVzc2FnZVdyaXRlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIl19