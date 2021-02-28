const Command = require('./command.js');

class Rover {
  constructor(position, mode, generatorWatts) {
    
    this.position = position;
    if (!position) {
      throw Error("Command type required.");
    }
    this.mode = 'NORMAL';
    this.generatorWatts = 110; 
  }

  receiveMessage(message) {
    let modeObj = {
    completed: false
    };

    

    let statusObj = {
    completed: false,
    roverStatus: {
      //position: this.position,
      //mode: this.mode,
      //generatorWatts: this.generatorWatts
    }
    };

    

    let resultObj = {
      message: message.name,
      results: []
    };

    for (let i=0; i<message.commands.length; i++){
      if (message.commands[i].commandType == "MOVE") {
        if (this.mode == "LOW_POWER") {
          modeObj.completed = false;
          resultObj.results.push(modeObj);
        }
        else {
        modeObj.completed = true;
        resultObj.results.push(modeObj);
        this.position = message.commands[i].value;
        }
      }

      else if (message.commands[i].commandType == "STATUS_CHECK"){
        statusObj.completed = true;
        statusObj.roverStatus = this;
        //resultObj.results.push(Object.keys(statusObj)[0], statusObj.completed, Object.keys(statusObj)[1], statusObj.roverStatus);
     resultObj.results.push(Object.keys(statusObj)[0], statusObj.completed, Object.keys(statusObj)[1], statusObj.roverStatus);
      }

      else if (message.commands[i].commandType == "MODE_CHANGE"){
        this.mode = message.commands[i].value;
        modeObj.completed = true;
        resultObj.results.push(modeObj);      
      }
    };
  //console.log(resultObj);
  return resultObj;
  }
  //return resultObj;
}
module.exports = Rover;


