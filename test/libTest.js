const assert = require('assert');
const { wc } = require('../src/lib.js');

const createFileSystem = function(files){
 return {
   readFileSync : function(filename, encoding){
     return files[filename];
   }
 };
}

describe('wc', function() {
 it('should return line,  word and character count with filename for single file', function() {
   const files = {file: '1\n2\n3\n4\n5\n'};
   const fs = createFileSystem(files);
   let actual = wc('file', fs);
   let expected = '\t5\t5\t10 file';

   assert.equal(actual, expected);
 });
});