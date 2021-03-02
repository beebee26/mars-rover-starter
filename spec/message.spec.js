const assert = require('assert');
const Message = require('../message.js');
const Rover = require('../rover.js');
const Command = require('../command.js');


//Test 4
describe("Message class", function() {

  it("throws error if name is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });
});

//Test 5
describe("Message class", function() {

  it("constructor sets name", function() {
      let output = (new Message('I love Launchcode!!!', ['MOVE', 'STATUS_CHECK'])).name;
      assert.strictEqual(output, 'I love Launchcode!!!');
   });
});


//Test 6
describe("Message class", function() {

  it("contains a commands array passed to the constructor as the 2nd arguement", function() {
      let output = (new Message('Brenda', ['MOVE', 'STATUS_CHECK'])).commands;
      assert.equal(output.join(), ['MOVE', 'STATUS_CHECK']);
   });
});








