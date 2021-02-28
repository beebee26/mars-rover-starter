const Command = require('./command.js');
const Rover = require('./rover.js');

//Bundle commands from mission control and send them to the rover.
class Message {
  constructor(name, commands) { 
    this.name = name;
    if (!name) {
      throw Error("Name required.");
    }
    this.commands = commands;
  }

}

module.exports = Message;


