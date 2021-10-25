//Define an array with the door objects
let doorEls = document.getElementsByClassName("door");

//Define an array with the backdoor elements
let backDoorEls = document.getElementsByClassName("backdoor");

//Define array representing 3 doors. False indicates no prize and true indicates prize.
//We start with no prize. Later on we will define where to put it.
let doorArray = [false, false, false];

//This Function returns a random int between the parameters min and max.
//It is tempting to use math.round() to round the result, but that creates a non uniform distribution as I found out (after hours of debugging) thanks to MDN.
//This function was taken from an example in MDN's website.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//Open a door from the doorEls array
function openDoor(number) {
  doorEls[number].classList.toggle("doorOpen", true);
}

//Close a door from the doorEls array
function closeDoor(number) {
  doorEls[number].classList.toggle("doorOpen", false);
}

//This function restart the Monty Hall problem and chooses a random door to put the prize in
function restartMontyHall() {
  //close all doors
  for (let i = 0; i < 6; i++) {
    if (i<3) {
      backDoorEls[i].innerHTML = "<div class='door left-door'></div>";
    } else{
      backDoorEls[i].innerHTML = "<div class='door right-door'></div>"
    }
    closeDoor(i);
  }

  //restart the prize array.
  doorArray = [false, false, false];

  //choose a random door to hide the prize
  let prizeDoor = Math.round(Math.random() * 2);
  doorArray[prizeDoor] = true;

  //Put the prize behind the door in HTML
  backDoorEls[prizeDoor].innerHTML = "<p class='prize'>Prêmio</p>" + backDoorEls[prizeDoor].innerHTML;
  backDoorEls[prizeDoor + 3].innerHTML = "<p class='prize'>Prêmio</p>" + backDoorEls[prizeDoor + 3].innerHTML;

}

//Run the problem many times!
function runMontyHall(iterations) {
  let iterationCount = 0;
  let keepCount = 0;
  let switchCount = 0;

  //Call the repeat function every 0 seconds.
  //I tried to use a loop here, but a loop would just run everything before loading the page,
  //so this was kind of a workaround. If you know a better way to do this, please let me know!
  interval = setInterval(repeat, 0);

  function repeat() {
    if (iterationCount >= iterations) {
      clearInterval(interval);
      return;
    }
    iterationCount++;

    restartMontyHall();
    let doorOpened = null;
    //Choose a door to open
    let chosenDoor = getRandomInt(0, 3);

    //If the chosen door has the prize
    if (doorArray[chosenDoor]) {
      //it means that the side keeping the first choice won.
      keepCount++;
    }
    else {
      //else it means that the side switching doors won.
      switchCount++;
    }


    //Open empty door different from the chosen door. The result has actualy been defined already,
    //this is just for the HTML to be updated.
    for (let i = 0; i < 3; i++) {
      if (i != chosenDoor && doorArray[i] == false) {
        openDoor(i);
        openDoor(i + 3);
        doorOpened = i;
        break;
      }
    }

    //Open the door that was chosen first (only in the left side)
    openDoor(chosenDoor);

    //Open the door chosen after switching
    for (let j = 0; j < 3; j++) {
      if (j != chosenDoor && j != doorOpened) {
        openDoor(j + 3);
      }
    }

    sChart.data.datasets[0].data[0] = (keepCount / iterationCount).toPrecision(4) * 100;
    sChart.data.datasets[1].data[0] = (switchCount / iterationCount).toPrecision(4) * 100;
    sChart.data.datasets[0].label = '% de vitórias mantendo a primeira escolha (' + keepCount + ')';
    sChart.data.datasets[1].label = '% de vitórias mudando de escolha (' + switchCount + ')';
    sChart.update(0);
  }
}

runMontyHall(10500);