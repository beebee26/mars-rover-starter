const assert = require('assert');
const Rover = require('../rover.js');
const Command = require('../command.js');
const Message = require('../message.js');

//Test 7
describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let output = new Rover('12345', 'NORMAL', 110);
    assert.strictEqual(output.position, '12345');
    assert.strictEqual(output.mode, 'NORMAL');
    assert.strictEqual(output.generatorWatts, 110);
    });
  });

//Test 8
describe("Rover class", function() {
  it("response returned by receiveMessage contains name of message", function() {
    let rov8 = new Rover(12345);
    let msg = new Message('Testing 123', []);
    let output = rov8.receiveMessage(msg);
    assert.strictEqual(output.message, "Testing 123");
    });
  });

//Test 9
describe("Rover class", function() {
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let com = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rov9 = new Rover(98382);
    let msg = new Message('Test message with two commands', com);
    let numResults = rov9.receiveMessage(msg);
    assert.strictEqual(numResults.results.length, 2);
  });
});

//Test 10
describe("Rover class", function() {
  it("responds correctly to status check command", function() {
    let com = [new Command('STATUS_CHECK')];
    let rov10 = new Rover(98382);
    let msg = new Message('Test message with status check', com);
    let statusCheck = rov10.receiveMessage(msg);
    let checkItems = {
     'position': 98382, 
     'mode': 'NORMAL',
     'generatorWatts': 110
    }
    //Check position
    assert.strictEqual(statusCheck.results[0].roverStatus.position, checkItems.position);
    //Check mode
    assert.strictEqual(statusCheck.results[0].roverStatus.mode, checkItems.mode); 
    //Check generatorWatts
    assert.strictEqual(statusCheck.results[0].roverStatus.generatorWatts, checkItems.generatorWatts);
  });
});

//Test 11
describe("Rover class", function() {
  it("responds correctly to mode change command", function() {
    let com = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let rov11 = new Rover(98382);
    let msg = new Message('Test message with mode change', com);
    let output = rov11.receiveMessage(msg);
    assert.strictEqual(rov11.mode, 'LOW_POWER');
  });
});

//Test 12
describe("Rover class", function() {
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rov12 = new Rover(98382); 
    rov12.mode = 'LOW_POWER';
    let com = [new Command('MODE_CHANGE', 'LOW_POWER'),  new Command('MOVE', '98765')];
    let msg = new Message('Test competed = false with move change on LOW', com);
    let output = rov12.receiveMessage(msg);
    let checkObject = {
      'completed':false, 
    };
    assert.strictEqual(output.results[1].completed.toString(), checkObject.completed.toString());
  });
})

//Test 13
describe("Rover class", function() {
  it("responds with position for move command", function(){
    let com = [new Command('MOVE', 24680)];
    let rov13 = new Rover(13579, 'NORMAL');
    let msg = new Message('Test message with mode change', com);
    let output = rov13.receiveMessage(msg);
    assert.strictEqual(rov13.position, 24680);
  });
});