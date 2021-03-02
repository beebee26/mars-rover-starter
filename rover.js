const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
  constructor(position, mode, generatorWatts) {
    this.position = position;
    if (!position) {
      throw Error("Position required.");
    }
    this.mode = mode;
    this.generatorWatts = 110; 
  }
//receive the message with name and commands
  receiveMessage(message) {
    //statusObj contains completed and roverStatus object to pass to resultObj
    let statusObj = {};
    //resultObj contins message and result is an array of statusObj
    let resultObj = {
      message: message.name,
      results: []
    };

    //This object is for commands MOVE and MODE_CHANGE, which have only the completed  true/false property
    let onlyCompleted = {
      completed: statusObj.completed
    };

    //set default mode to NORMAL
    this.mode = 'NORMAL';

    //Loop through message.commands to get all commands
    for (let i=0; i<message.commands.length; i++){
      //Evaluate the MOVE command
      if (message.commands[i].commandType == 'MOVE') {

        //If mode is low power, don't move and send completed = false
        if (this.mode == 'LOW_POWER') {
            statusObj = {
              completed: false,
              roverStatus: {
                position: this.position,
                mode: this.mode,
                generatorWatts: this.generatorWatts
              }
            };
            //Only display completed: false
             onlyCompleted = {
             completed: false
             };
          //push the status object into the results array 
          resultObj.results.push(onlyCompleted);
         }
         //If mode is normal, change position and completed = true
        else {
          this.position = message.commands[i].value;
          statusObj = {
            completed: true,
            roverStatus: {
              position: message.commands[i].value,
              mode: this.mode,
              generatorWatts: this.generatorWatts
            }
          };
          statusObj.completed = true;
          rover.position = message.commands[i].value;

          //Only display completed: true
          onlyCompleted = {
             completed: true
             };
          //push the status object into the results array 
          resultObj.results.push(onlyCompleted);
        }
      }
      //Evaluate status check command. Return completed = true and position/mode/generatorWatts
      else if (message.commands[i].commandType == 'STATUS_CHECK'){
        statusObj = {
          completed: true,
          roverStatus: {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts
          }
         };
         //push the statusObj object into the results array 
         resultObj.results.push(statusObj);
      }
      //Evaluate mode change command. Return completed = true. Change mode to normal or low power.
      else if (message.commands[i].commandType == 'MODE_CHANGE'){
        this.mode = message.commands[i].value;
        statusObj = {
          completed: true,
          roverStatus: {
            position: this.position,
            mode: message.commands[i].value,
            generatorWatts: this.generatorWatts
          }
        };
        //Return completed = true
        onlyCompleted = {
             completed: true
             };
          //push the onlyCompleted object into the results array   
          resultObj.results.push(onlyCompleted);   
      }
    };
  return resultObj;
  }
}

//Give 8 commands: 
//Status check, low power, status check, move, status check, normal, move, status check
let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 12321), new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 87654), new Command('STATUS_CHECK')];

//Message contains name and a array of commands.
let message = new Message('Test message with eight commands', commands);

//Declare new rover object with position of 98392
let rover = new Rover(98382);

//Response is the return of the receiveMessage function in rover.js
let response = rover.receiveMessage(message);

//Display the message and use a for loop to display the contents of objects
//This is a workaround to repl.it not displaying the contents.
console.log(`Message: ${response.message}\n`);

for (let i=0; i < response.results.length; i++){
  if (response.results[i].roverStatus != undefined){
    console.log(`Results: Completed: ${response.results[i].completed} \n         roverStatus:  position: ${response.results[i].roverStatus.position} mode: '${response.results[i].roverStatus.mode}' generatorWatts: ${response.results[i].roverStatus.generatorWatts}\n`);
  }
  else {
  console.log(`Results:   Completed: ${response.results[i].completed}\n`);
  }
}

//Actual way the receiveMessage function shoudl be called.
console.log(response);

//Export the Rover class
module.exports = Rover;