//const Command = require('./command.js');
const Message = require('./message.js');

class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }
}

class Rover {
  constructor(position, mode, generatorWatts) {
    
    this.position = position;
    if (!position) {
      throw Error("Position required.");
    }
    this.mode = mode;
    this.generatorWatts = 110; 
  }

  receiveMessage(message) {

    

    let statusObj = {};

    let resultObj = {
      message: message.name,
      results: []
    };

    rover.mode = 'NORMAL';

    for (let i=0; i<message.commands.length; i++){
   
      if (message.commands[i].commandType == 'MOVE') {
   
        if (rover.mode == 'LOW_POWER') {
            statusObj = {
            completed: false,
            roverStatus: {
            position: rover.position,
            mode: rover.mode,
            generatorWatts: rover.generatorWatts
      }
    };
          
          resultObj.results.push(statusObj);
        }
        else {
        statusObj = {
            completed: true,
            roverStatus: {
            position: message.commands[i].value,
            mode: rover.mode,
            generatorWatts: rover.generatorWatts
      }
    };

          
          resultObj.results.push(statusObj);




        statusObj.completed = true;
        resultObj.results.push(statusObj);
        rover.position = message.commands[i].value;
        }
      }

      else if (message.commands[i].commandType == 'STATUS_CHECK'){

          statusObj = {
            completed: true,
            roverStatus: {
            position: rover.position,
            mode: rover.mode,
            generatorWatts: rover.generatorWatts
      }
    };
        resultObj.results.push(statusObj);

      }

      else if (message.commands[i].commandType == 'MODE_CHANGE'){

        rover.mode = message.commands[i].value;

        statusObj = {
            completed: true,
            roverStatus: {
            position: rover.position,
            mode: message.commands[i].value,
            generatorWatts: rover.generatorWatts
      }
    };
        resultObj.results.push(statusObj);    
      }
    };
  return resultObj;
  }
}

let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 12321), new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 87654), new Command('STATUS_CHECK')];

let message = new Message('Test message with two commands', commands);

let rover = new Rover(98382);
let response = rover.receiveMessage(message);

console.log(response);
console.log(response.results);

module.exports = Rover;