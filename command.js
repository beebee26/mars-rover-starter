const Message = require('./message.js');
const Rover = require('./rover.js');


class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }

}

module.exports = Command;

//let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
//let moveCommand = new Command('MOVE', 1200);
//let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 12321), new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];

//let message = new Message('Test message with two commands', commands);

//let rover = new Rover(98382);
//let response = rover.receiveMessage(message);

//console.log('message:', response.message, ', \nresults:', response.results);
//console.log(response);


