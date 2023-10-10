var audio = document.querySelectorAll("audio");
    var btn = document.querySelectorAll("button");
    var buttonKeys = [65, 83, 68, 70, 71, 72, 74, 75, 76];
    var playAllButton = document.getElementById("playAllButton");
    var stopButton = document.getElementById("stopButton"); // Reference to the Stop button

    var currentIndex = 0;
    var count = 0;
    var isStopped = false; // Variable to track whether Stop button is clicked
    var intervalId; // Variable to store the interval ID

    function playAudio(index) {
      audio[index].play();
      audio[index].currentTime = 0;
      currentIndex = index;
      count++;
    }

    function playNext() {
      if (currentIndex < audio.length - 1) {
        playAudio(currentIndex + 1);
      }
    }

    playAllButton.addEventListener("click", function () {
      if (isStopped) {
        isStopped = false;
      }
      playAudio(0);

      // Set an interval to play the next audio after each sound finishes
      intervalId = setInterval(function () {
        if (currentIndex < audio.length - 1) {
          if (count == 2) {
            count = 0;
            playNext();
          } else {
            playAudio(currentIndex);
          }
        } else {
          clearInterval(intervalId); // Stop the interval when all sounds are played
        }
      }, 900);
    });

    stopButton.addEventListener("click", function () {
      for (var i = 0; i < audio.length; i++) {
        audio[i].pause();
        audio[i].currentTime = 0;
      }
      isStopped = true;
      clearInterval(intervalId); // Clear the interval when Stop button is clicked
    });
    document.body.addEventListener("keydown", function (event) {
      for (let i = 0; i < buttonKeys.length; i++) {
        if (event.keyCode === buttonKeys[i]) {
          btn[i].style.border = "4px solid #ffc400cc";
          btn[i].style.transform = "scale(1.1)";
          playAudio(i);
          playNext();
        }
      }
    });

    document.body.addEventListener("keyup", function (event) {
      for (let i = 0; i < buttonKeys.length; i++) {
        if (event.keyCode === buttonKeys[i]) {
          btn[i].style.border = "3px solid black";
          btn[i].style.transform = "scale(1.0)";
        }
      }
    });
