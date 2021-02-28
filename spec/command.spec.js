const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });
});
describe("Command class", function() {

  it("constructor sets command type", function() {
      let output = (new Command("MOVE", 45)).commandType;
      assert.strictEqual(output, "MOVE");
   });
});
describe("Command class", function() {

  it("constructor sets a value passed by the second arguement", function() {
      let output = (new Command("MOVE", 45)).value;
      assert.strictEqual(output, 45);
   });
});
  