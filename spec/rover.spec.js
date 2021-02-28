const assert = require('assert');
const Rover = require('../rover.js');
const Command = require('../command.js');
const Message = require('../message.js');

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let output = new Rover('12345', 'NORMAL', 110);
    assert.equal(output.position, '12345');
    assert.equal(output.mode, 'NORMAL');
    assert.equal(output.generatorWatts, '110');
    });
  });

describe("Rover class", function() {
  it("response returned by receiveMessage contains name of message", function() {
    let rov = new Rover(12345);
    let msg = new Message('Testing 123', []);
    let output = rov.receiveMessage(msg);
    assert.equal(output.message, "Testing 123");
    });
  });

describe("Rover class", function() {
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let com = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rov = new Rover(98382);
    let msg = new Message('Test message with two commands', com);
    let numResults = rov.receiveMessage(msg);
    assert.equal(numResults.results.length, 2);
  });
});

describe("Rover class", function() {
  it("responds correctly to status check command", function() {
    let com = [new Command('STATUS_CHECK')];
    let rov = new Rover(98382);
    let msg = new Message('Test message with status check', com);
    let numResults = rov.receiveMessage(msg);
    let checkObject = {
      'completed':true, 
      'roverStatus':rov
    };
    assert.equal(numResults.results[0].toString(), checkObject.toString());
  });
});

describe("Rover class", function() {
  it("responds correctly to mode change command", function() {
    let com = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let rov = new Rover(98382);
    let msg = new Message('Test message with mode change', com);
    let output = rov.receiveMessage(msg);
    assert.strictEqual(output.results[0].roverStatus.mode, 'LOW_POWER');
  });
});

describe("Rover class", function() {
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rov = new Rover(98382); 
    let com = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', '98765')];
    let msg = new Message('Test competed = false with move change on LOW', com);
    let output = rov.receiveMessage(msg);
    let checkObject = {
      'completed':false, 
    };
    assert.equal(output.results[1].completed.toString(), checkObject.completed.toString())
  });
})

describe("Rover class", function() {
  it("responds with position for move command", function(){
    let com = [new Command('MOVE', 24680)];
    let rov = new Rover(13579, 'NORMAL');
    let msg = new Message('Test message with mode change', com);
    let output = rov.receiveMessage(msg);
    assert.strictEqual(output.results[0].roverStatus.position, 24680)
  });
});