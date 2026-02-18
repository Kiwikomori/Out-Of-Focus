//AUDIOS
const chime_audio = new Audio("audios/completedChime.m4a");
chime_audio.volume = 0.4;
const marimba_audio = new Audio("audios/completedMarimba.mp3");
marimba_audio.volume = 0.5;
const failHum_audio = new Audio("audios/failedHum.mp3");
failHum_audio.volume = 0.3;
const enterBell_audio = new Audio("audios/enterBell.mp3");
enterBell_audio.volume = 0.3;
const blingaudio = new Audio("audios/bling.m4a");
blingaudio.volume = 0.2;
const gameaudio = document.getElementById("gamemusic");

let currentDialogue = [];
let currentIndex = 0;
let dialogueMode = "intro"; 
// "intro", "postgame", "findcrystal"
let finishGame = false;
let isFinalDay1 = false;

// timer
let timerStart = 0;
let timerInterval = null;

function showFinishScreen() {

  const finishScreen = document.getElementById("finishScreen");
  const finishText = document.getElementById("finishTimeText");

  finishScreen.style.opacity = "1";
  finishScreen.style.pointerEvents = "auto";

  const totalTime = (performance.now() - timerStart);

  const minutes = Math.floor(totalTime / 60000);
  const seconds = Math.floor((totalTime % 60000) / 1000);
  const milliseconds = Math.floor(totalTime % 1000);
  const formatno = milliseconds.toString().padStart(2, "0");

finishText.textContent =
  `Time taken for puzzle:\n${minutes} min ${seconds} sec ${formatno} ms`;
}

function advanceDialogue() {
    const dialogueText = document.getElementById("day1D");
    const characterImg = document.getElementById("osumiVn");
    const playerText = document.getElementById("day1PD");
    const playerElement = document.getElementById("playerDialogue");
    const npcArrow = document.getElementById("dialogueArrow");
    const npcElement = document.getElementById("dialogueWrap");

  if (currentIndex >= currentDialogue.length) {
    if (isFinalDay1) {
      finishGame = true;
      showFinishScreen();
      isFinalDay1 = false;
    }
    return;
  }

  const current = currentDialogue[currentIndex];
  const playerChoice = document.getElementById("playerChoice");

  if (playerChoice.style.display === "block") return;

  // actions
  if (current.action === "placeCamera") {
    setTimeout(() => {
      document.getElementById("osumivnCamera").style.opacity = "1";
    }, 200);
  }

  else if (current.action === "transferDreamstone") {
    const fade = document.getElementById('fade');

    // fade out
    fade.classList.add('out');

    setTimeout(() => {
      // fade in
      fade.classList.remove('out');
      currentIndex++;
    }, 1200)
  }

  else if (current.action === "exitShop") {
    setTimeout(() => {
      document.getElementById("dialogueWrap").style.opacity = "0";
      document.getElementById("dialogueWrap").style.pointerEvents = "none";

      setTimeout(() => {
        characterImg.style.opacity = "0";
      }, 500)
      setTimeout(() => {
        enterBell_audio.play();
      }, 800)
    },300)
  }

  // speakers
  if (current.speaker === "npc") {
    playerElement.style.opacity = "0";
    npcArrow.style.display = "block";
    npcElement.style.display = "block";

    dialogueText.textContent = current.text;
    characterImg.src = current.img;
    currentIndex++;
  }

  if (current.speaker === "player") {
    playerElement.style.opacity = "1";
    playerElement.style.pointerEvents = "auto";
    npcArrow.style.display = "none";

    playerText.textContent = current.text;
    currentIndex++;
  }

  if (current.speaker === "choice") {
    npcArrow.style.display = "none";
    playerElement.style.opacity = "0";
    npcElement.style.display = "none";
    showChoices(current.options);
    return;
  }
}

/* get the back button element */
const backBtn = document.getElementById('back');

/* uncheck all checkboxes when Back button is clicked */
backBtn.addEventListener('click', function uncheck() {
  // reset any toggles (start game, archives, etc.)
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });

  // if the title screen was hidden by inline styles, restore it
  const title = document.getElementById('title');
  if (title) {
    title.style.opacity = '1';
    title.style.pointerEvents = 'auto';
  }

  // hide the finish screen explicitly
  const finish = document.getElementById('finishScreen');
  if (finish) {
    finish.style.opacity = '0';
    finish.style.pointerEvents = 'none';
  }
});

/* navigation between rooms */
const rooms = ['north', 'east', 'southFront', 'west'];
let currentRoom = '0';
let insideBR = false;
// false by default

// where to go when clicking  buttons
function go(where) {
  const fade = document.getElementById('fade');

  // fade out
  fade.classList.add('out');

  setTimeout(() => {

    document.querySelector('.room.active').classList.remove('active');

    if (where === 'left') {
      currentRoom = (currentRoom - 1 + rooms.length) % rooms.length;
    }
    // else if going right
    else {
      currentRoom = (currentRoom + 1) % rooms.length;
    }

    // give current room active class
    document.getElementById(rooms[currentRoom]).classList.add('active');

    // fade in
    fade.classList.remove('out');
  }, 450);
}

// check if im in backrooms
function visibilityCheck() {
  // get the buttons
  const left = document.getElementById('navLeft');
  const right = document.getElementById('navRight');
  const back = document.getElementById('navBack');

  if (insideBR) {
    left.style.display = 'none';
    right.style.display = 'none';
    back.style.display = 'block';
    southBack.style.display = 'grid';
  }
  else {
    left.style.display = 'block';
    right.style.display = 'block';
    back.style.display = 'none';
  }
}

function openVnCamera() {
  const cam = document.getElementById("osumivnCamera");
  const camView = document.getElementById("vnCameraView");
  const playerElement = document.getElementById("playerDialogueCV");
  const playerText = document.getElementById("d1playerDialogueCV");
  playerElement.style.opacity = "0";
  playerElement.style.pointerEvents = "none";
  playerText.textContent = "";
  camView.classList.add("active");

  // if not showing dont do anything 
  if (playerElement.style.display === "none") return;

  const cameraDialogue = [
    "The parts are all over the place.",
    "And they keep disappearing.",
    "Looks like it's been shaken up really bad.",
    "I better focus and remember their positions...",
    "... Or they won't align properly."
  ];

  let dialogueIndex = 0;
  setTimeout(() => {
      document.getElementById("playerDialogueCVArrow").style.opacity = "1";
      playerElement.style.opacity = "1";
      playerElement.style.pointerEvents = "auto";
      playerText.textContent = cameraDialogue[dialogueIndex];

  }, 1500);

  camView.addEventListener("click", function nextDialogue() {
    dialogueIndex++;
    if (dialogueIndex < cameraDialogue.length) {
      playerText.textContent = cameraDialogue[dialogueIndex];
    } else {
      playerElement.style.opacity = "0";
      playerElement.style.pointerEvents = "none";

      // needs 2 arguments so i just added the function
      camView.removeEventListener("click", nextDialogue);

      startRound();
    }
  });
  // prevent interaction if not enabled js in case
  if (!cam.classList.contains("active")) return;
}

function showChoices(options) {
      const playerChoice = document.getElementById("playerChoice");
      const choice1 = document.getElementById("choice1");
      const choice2 = document.getElementById("choice2");

      playerChoice.style.display = "block";

      choice1.textContent = options[0].text;
      choice2.textContent = options[1].text;

      choice1.onclick = () => selectChoice(options[0]);
      choice2.onclick = () => selectChoice(options[1]);
    }

function selectChoice(options) {
      const playerChoice = document.getElementById("playerChoice");

      playerChoice.style.display = "none";

      currentDialogue = options.nextDialogue;
      currentIndex = 0;
    }

// trying new way to play dialogue
function playWinDialogue(lines, continueGame) {
  const camView = document.getElementById("vnCameraView");
  const playerElement = document.getElementById("playerDialogueCV");
  const playerText = document.getElementById("d1playerDialogueCV");
  const arrow = document.getElementById("playerDialogueCVArrow");
  
  if (playerElement.style.display === "none") return;

  let index = 0;

  playerElement.style.opacity = "1";
  playerElement.style.pointerEvents = "auto";
  arrow.style.opacity = "1";
  playerText.textContent = lines[index];

  function next() {
    if (index < lines.length) {
      playerText.textContent = lines[index];
      index++;
    } else {
      camView.removeEventListener("click", next);
      playerElement.style.opacity = "0";
      playerElement.style.pointerEvents = "none";
      arrow.style.opacity = "0";
      continueGame(); 
      // resume game
    }
  }
  camView.addEventListener("click", next);
}

function finishGame1Dialogue(lines) {
  const roomView = document.getElementById("room");
  const playerElement = document.getElementById("playerDialogueNav");
  const playerText = document.getElementById("d1playerDialogueNav");
  const arrow = document.getElementById("playerDialogueNavArrow");
  const northCounter = document.getElementById("northCounter");

  northCounter.style.pointerEvents = "none";
  
  if (playerElement.style.display === "none") return;

  let index = 0;

  playerElement.style.opacity = "1";
  playerElement.style.pointerEvents = "auto";
  arrow.style.opacity = "1";
  playerText.textContent = lines[index];

 function next() {
  index++;
  if (index < lines.length) {
    playerText.textContent = lines[index];
  } else {
    roomView.removeEventListener("click", next);
    playerElement.style.opacity = "0";
    playerElement.style.pointerEvents = "none";
    arrow.style.opacity = "0";

    setTimeout(() => {
              document.getElementById("navLeft").style.pointerEvents = "auto";
              document.getElementById("navRight").style.pointerEvents = "auto";
              document.getElementById("navLeft").style.opacity = "1";
              document.getElementById("navRight").style.opacity = "1";
            }, 700)
  }
}

  roomView.addEventListener("click", next);
}

function enterBackrooms() {
  
  if (rooms[currentRoom] === 'southFront') {
    insideBR = true;

    // start fade in
    fade.classList.add('out');

    setTimeout(() => {
      // make southback active
      document.querySelector('.room.active').classList.remove('active');
      document.getElementById('southBack').classList.add('active');

      // change button visibility
      visibilityCheck();

      // fade in
      fade.classList.remove('out');
  }, 450);
}
}

function exitBackrooms() {
  insideBR = false;

  // start fade in
  fade.classList.add('out');

  setTimeout(() => {
    // make south active again
    document.querySelector('.room.active').classList.remove('active');
    document.getElementById('southFront').classList.add('active');

    // change button visibility
    visibilityCheck();

    // fade in
    fade.classList.remove('out');
    }, 450);
}

function switchPOV() {
  const characterImg = document.getElementById("osumiVn");
  const dialogueWrap = document.getElementById("dialogueWrap");
  const dialogueText = document.getElementById("day1D");

  fade.style.backgroundColor = "#4d2105"; 
  fade.classList.add('out');
  document.getElementById("dayCounter").textContent = "Day 1";
  setTimeout(() => {

  document.getElementById("north").style.opacity = "0";
  document.getElementById("north").style.pointerEvents = "none";
  document.getElementById("vnView").style.opacity = "1";
  document.getElementById("vnView").style.pointerEvents = "auto";

  fade.classList.remove('out');

  }, 2000);

  setTimeout(() => {
    enterBell_audio.play();
  }, 6000)

  setTimeout(() => {
    characterImg.style.opacity = "1";
  }, 8000);

  setTimeout(() => {
    dialogueWrap.style.opacity = "1";
    dialogueText.textContent = "Oh hello! I wasn't expecting a camera repair shop of all things to open up here, in such a tucked away and hidden spot.";
    characterImg.src = "images/characters/osumi_1.png";
  }, 9500);
}

function gameaudiofade() {
  gameaudio.volume = 0
  // js in case it has an error
  gameaudio.play().catch(() => {
  console.log("game audio play failed");
  });

  const gamefadeDuration = 5000;
  const gameinterval = 0.05;
  const gamestep = gameinterval / gamefadeDuration;

  const audiofadein = setInterval(() => {
    if (gameaudio.volume < .1) {
      gameaudio.volume = Math.min(gameaudio.volume + gamestep, .1);
    } else {
      clearInterval(audiofadein);
    }
  }, gameinterval);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("navLeft").style.opacity = "0";
  document.getElementById("navRight").style.opacity = "0";
  document.getElementById("navLeft").style.pointerEvents = "none";
  document.getElementById("navRight").style.pointerEvents = "none";
  const vnView = document.getElementById("vnView");
  const dialogueText = document.getElementById("day1D");
  const characterImg = document.getElementById("osumiVn");
  const playerText = document.getElementById("day1PD");
  const playerElement = document.getElementById("playerDialogue");
  const npcArrow = document.getElementById("dialogueArrow");
  const npcElement = document.getElementById("dialogueWrap");

  const day1dialogue = [
        {
          speaker: "npc",
          text: "Still, I suppose hidden places are the most interesting ones.",
          img: "images/characters/osumi_3.png"
        },
        {
          speaker: "npc",
          text: "Are you the owner here?",
          img: "images/characters/osumi_1.png"
        },
        {
          speaker: "npc",
          text: "I actually have something I need fixed...",
          img: "images/characters/osumi_2.png"
        },
        {
          speaker: "npc",
          text: "Just need it cleaned up, I don't really want the memories in them anyway, so I'll take the risk.",
          img: "images/characters/osumi_1.png",
          // put down camera here
          action: "placeCamera",
        },
        {
          speaker: "player",
          text: "Oh, don't worry. You won't lose any of the memories in the camera."
        },
        {
          speaker: "player",
          text: "My shop offers to transfer the memories to this Dreamstone crystal, for a cheaper price."
        },
        {
          speaker: "npc",
          text: "Woah! I never knew that can be done, that's so cool!",
          img: "images/characters/osumi_2.png"
        },
        {
          speaker: "npc",
          text: "But if you HAVE to, can I at least pick the ones I don't want?",
          img: "images/characters/osumi_3.png"
        },
        {
          speaker: "player",
          text: "It's possible, but it would come at a decently higher price.",
        },
        {
          speaker: "npc",
          text: "Oh..",
          img: "images/characters/osumi_3.png"
        },
        {
          speaker: "npc",
          text: "Forget it, then. Just put it all into that crystal memory thingy you said.",
          img: "images/characters/osumi_1.png"
        },
        {
          speaker: "player",
          text: "Dreamstone. Anyways, remember to come back at the end of the day to collect your camera.",
        },
        {
          speaker: "npc",
          text: "Wait what? Come back?",
          img: "images/characters/osumi_3.png"
        },
        {
          speaker: "npc",
          text: "I'm kind of in a hurry, can I just...",
          img: "images/characters/osumi_3.png"
        },
        {
          speaker: "npc",
          text: "...watch you do it?",
          img: "images/characters/osumi_2.png"
        },
        {
          speaker: "choice",
          options: [
            {
              // choice 1
              text: "Okay, sure.",
              nextDialogue: [
                {
                  speaker: "player",
                  text: "Okay, sure."
                },
                { speaker: "npc",
                  text: "Really? Yay!",
                  img: "images/characters/osumi_2.png" 
                },
                { speaker: "npc", text: "Thank you! I'm just soo curious how you do it.", img: "images/characters/osumi_1.png" }
              ]
            },
            {
              // choice 2
              text: "Fine by me.",
              nextDialogue: [
                {
                  speaker: "player",
                  text: "Fine by me."
                },
                {
                  speaker: "npc",
                  text: "Yay! Thanks!",
                  img: "images/characters/osumi_2.png"
                },
                
                { 
                  speaker: "npc",
                  text: "I've never heard of this kind of solution before. I'm so curious how you do it!", 
                  img: "images/characters/osumi_1.png"
                }
              ]
            }
          ]
        }
    ];

  dialogueMode = "intro";
  currentDialogue = day1dialogue;
  currentIndex = 0;

  vnView.addEventListener("click", () => {

    if (finishGame) return;

    if (currentIndex >= currentDialogue.length) {

      if (dialogueMode === "intro") {
        npcArrow.style.display = "none";
        npcElement.style.display = "none";

        setTimeout(() => {
          document.getElementById("osumivnCamera").style.opacity = "1";
          document.getElementById("osumivnCamera").style.pointerEvents = "auto";
          document.getElementById("playerDialogueArrow").style.opacity = "0";

          playerElement.style.opacity = "1";
          playerElement.style.pointerEvents = "auto";

          playerText.textContent = "Alright, let's check this camera.";
        }, 900);

        return;
      }

      else if (dialogueMode === "postgame") {
        dialogueMode = "findcrystal";

        fade.classList.add('out');

        setTimeout(() => {
          // close vn view
          document.getElementById("vnView").style.opacity = "0";
          document.getElementById("vnView").style.pointerEvents = "none";

          // show navigation view
          document.getElementById("north").style.opacity = "1";
          document.getElementById("north").style.pointerEvents = "auto";

          fade.classList.remove('out');

          finishGame1Dialogue([
            "Alright, I need to find a Dreamstone.",
            "Where did I put them?",
            "I think I had some in a chest somewhere."
          ]);
        }, 1500);
        return;
      }

      // any other dialogue mode (findcrystal, finalDay1, etc.)
      // let advanceDialogue run so it can detect end-of-dialogue and
      // show the finish screen or other appropriate behaviour
      advanceDialogue();
      return;
    }

    advanceDialogue();
    });
});

function d1postGameDialogue() {
  dialogueMode = "postgame";
  // do not touch the camera
  document.getElementById("osumivnCamera").style.pointerEvents = "none";
  document.getElementById("playerDialogueArrow").style.opacity = "1";
  fade.style.backgroundColor = "#000"; 
  document.getElementById("dayCounter").textContent = "";

  const day1DialogueFinish = [
    {
      speaker: "npc",
      text: "That's quick. Are you done?",
      img: "images/characters/osumi_2.png"
    },
    {
      speaker: "player",
      text: "Almost."
    },
    {
      speaker: "player",
      text: "All that's left is to transfer your old memories to the Dreamstone."
    },
    {
      speaker: "npc",
      text: "Oh, okay~!",
      img: "images/characters/osumi_1.png"
    }
  ];

  currentDialogue = day1DialogueFinish;
  currentIndex = 0;

  advanceDialogue();
} 

// loading animation
function loadinganim() {
  blingaudio.play();
  const loadingoverlay = document.createElement("div");
  const startGame = document.getElementById("title");
  loadingoverlay.style.position = "fixed";
  loadingoverlay.style.top = "0";
  loadingoverlay.style.left = "0";
  loadingoverlay.style.width = "100%";
  loadingoverlay.style.height = "100%";
  loadingoverlay.style.background = "rgba(0, 0, 0, 0.6)";
  loadingoverlay.style.backdropFilter = "blur(8px)";
  loadingoverlay.style.webkitBackdropFilter = "blur(8px)";
  loadingoverlay.style.display = "flex";
  loadingoverlay.style.alignItems = "center";
  loadingoverlay.style.justifyContent = "center";
  loadingoverlay.style.zIndex = "9999";
  loadingoverlay.style.opacity = "0";
  loadingoverlay.style.transition = "opacity 0.3s ease";

  // lottie animation here
  const lottie = document.createElement("dotlottie-wc");
  lottie.setAttribute(
    "src", "https://lottie.host/96fe7485-54e7-4418-b3f9-a923b6dc250c/Fc9DnhaCtC.lottie"
  );
  lottie.style.width = "600px";
  lottie.style.height = "600px";
  lottie.setAttribute("autoplay", "");
  lottie.setAttribute("loop", "");

  loadingoverlay.appendChild(lottie);
  document.body.appendChild(loadingoverlay);

  requestAnimationFrame(() => {
    loadingoverlay.style.opacity = "1";
  });

  setTimeout(() => {
    loadingoverlay.style.opacity = "0";
    setTimeout(() => {
      loadingoverlay.remove();
    }, 300);
    
    startGame.style.opacity = "0";
    startGame.style.pointerEvents = "none";
    switchPOV();
    gameaudiofade();
  }, 3100);
}

// opening and closing 3dviewer
function openViewer(which) {
    const viewerGroup = document.getElementById("viewerGroup");
    const estellaCamModel = document.getElementById("estellaCamModel");
    const osumiCamModel = document.getElementById("osumiCamModel");

    viewerGroup.style.display = "block";
    viewerGroup.style.opacity = "1";
    viewerGroup.style.pointerEvents = "auto";

    estellaCamModel.style.display = (which === "estella") ? "block" : "none";
    estellaCamModel.style.pointerEvents = (which === "estella") ? "auto" : "none";
    
    osumiCamModel.style.display = (which === "osumi") ? "block" : "none";
    osumiCamModel.style.pointerEvents = (which === "osumi") ? "auto" : "none";
  }

  function closeViewer() {
    const viewerGroup = document.getElementById("viewerGroup");
    const estellaCamModel = document.getElementById("estellaCamModel");
    const osumiCamModel = document.getElementById("osumiCamModel");

    viewerGroup.style.display = "none";
    viewerGroup.style.opacity = "0";
    viewerGroup.style.pointerEvents = "none";
    
    estellaCamModel.style.display = "none";
    osumiCamModel.style.display = "none";
  }

  document.getElementById("estellaCamera")?.addEventListener("click", () => openViewer("estella"));
  document.getElementById("osumiCamera")?.addEventListener("click", () => openViewer("osumi"));

  document.getElementById("exitViewerButton")?.addEventListener("click", closeViewer);

// Simon memory game

// ====== CONFIG ====== 
const TOTAL_BUTTONS = 10;
const SHOW_MS = 10000;       // how long numbers are visible before hiding
const WINS_NEEDED = 2;

// Number images 1.svg to 10.svg
const numberImg = (n) => `images/gameAssets/puzzles/${n}.svg`;

//light elements
const greenLight1 = document.getElementById("greenLight1");
const greenLight2 = document.getElementById("greenLight2");

// ====== STATE ======
let mapping = new Map();  // buttonEl -> number (1..10)
let expected = 1;         // next number user must click
let wins = 0;
let acceptingClicks = false;

// ====== SETUP BUTTONS ======
const buttons = Array.from({ length: TOTAL_BUTTONS }, (_, i) =>
  document.getElementById(`button${i + 1}`)
).filter(Boolean);

// attach click handlers
buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleClick(btn));
});

// ====== GAME FLOW ======
function startRound() {
  if (timerStart === 0) {
    timerStart = performance.now();
  }
  expected = 1;
  acceptingClicks = false;

  //reset lights properly
  if (wins === 0) {
  greenLight1.classList.remove("light-on");
  greenLight2.classList.remove("light-on");
  }

  // clear outlines + reset visuals
  buttons.forEach((b) => {
    b.classList.remove("correct", "wrong", "hidden");
    b.style.pointerEvents = "none";
  });

  // create shuffled numbers 1..10
  const nums = shuffle([...Array(TOTAL_BUTTONS)].map((_, i) => i + 1));

  // assign each button a number + set image
  mapping.clear();
  buttons.forEach((btn, idx) => {
    const n = nums[idx];
    mapping.set(btn, n);
    btn.style.backgroundImage = `url("${numberImg(n)}")`;
  });

  // show for a bit, then hide
  setTimeout(() => {
    hideNumbers();
    enableClicks();
  }, SHOW_MS);
}

function hideNumbers() {
  buttons.forEach((btn) => btn.classList.add("hidden"));
}

function enableClicks() {
  acceptingClicks = true;
  buttons.forEach((btn) => (btn.style.pointerEvents = "auto"));
}

// ====== CLICK LOGIC ======
function handleClick(btn) {
  if (!acceptingClicks) return;

  const n = mapping.get(btn);

  // reveal what they clicked 
  btn.classList.remove("hidden");

  if (n === expected) {
    btn.classList.add("correct");
    btn.style.pointerEvents = "none"; // prevent re-click

    expected++;

    if (expected === TOTAL_BUTTONS + 1) {
      // round cleared
      acceptingClicks = false;
      roundWin();
    }
  } else {
    // wrong click -> fail round
    acceptingClicks = false;
    btn.classList.add("wrong");
    roundFail();
  }
}

// ====== ROUND RESULTS TABULATION ======
function roundWin() {
  wins++;
  updateLights();
  
  //does not play when it is the final win
  if (wins !== WINS_NEEDED) {
  chime_audio.play();
  }

  if (wins >= WINS_NEEDED) {
    gameComplete();
    return;
  }

  // brief pause then new round
  if (wins === 1) {
  playWinDialogue([
    "That was way harder than I thought.",
    "...Do I really have to do another one?",
  ], () => {
    startRound();
  });
} else {
  setTimeout(() => startRound(), 1500);
}
}

function roundFail() {
  // reveal all numbers so they learn
  buttons.forEach((b) => b.classList.remove("hidden"));
  buttons.forEach((b) => (b.style.pointerEvents = "none"));
  failHum_audio.play();

  // restart a new round after short delay
  setTimeout(() => startRound(), 1100);
}

function gameComplete() {
  const totalTime = (performance.now() - timerStart) / 1000;
  console.log("Time taken:", totalTime.toFixed(2) + "s");

  timerStart = 0;

  // reveal all
  buttons.forEach((b) => b.classList.remove("hidden"));
  buttons.forEach((b) => (b.style.pointerEvents = "none"));
  marimba_audio.play();

  setTimeout(() => {
    document.getElementById("vnCameraView").classList.remove("active");
  }, 2500),
  d1postGameDialogue();
}

// ====== LIGHTS ======
function updateLights() {
  if (wins >= 1) {
    greenLight1.classList.add("light-on");
  }

  if (wins >= 2) {
    greenLight2.classList.add("light-on");
  }
}

// ====== RANDOMISER ======
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// dialogue for dreamstone
function foundDreamstoneDialogue(lines) {
  const roomView = document.getElementById("room");
  const playerElement = document.getElementById("playerDialogueNav");
  const playerText = document.getElementById("d1playerDialogueNav");
  const arrow = document.getElementById("playerDialogueNavArrow");
  const northCounter = document.getElementById("northCounter");

  document.getElementById("navLeft").style.pointerEvents = "none";
  document.getElementById("navRight").style.pointerEvents = "none";
  document.getElementById("navLeft").style.opacity = "0";
  document.getElementById("navRight").style.opacity = "0";

  northCounter.style.pointerEvents = "auto";
  
  if (playerElement.style.display === "none") return;

  let index = 0;

  playerElement.style.opacity = "1";
  playerElement.style.pointerEvents = "auto";
  arrow.style.opacity = "1";
  playerText.textContent = lines[index];

 function next() {
  index++;
  if (index < lines.length) {
    playerText.textContent = lines[index];
  } else {
    roomView.removeEventListener("click", next);
    playerElement.style.opacity = "0";
    playerElement.style.pointerEvents = "none";
    arrow.style.opacity = "0";

    setTimeout(() => {
              document.getElementById("navLeft").style.pointerEvents = "auto";
              document.getElementById("navRight").style.pointerEvents = "auto";
              document.getElementById("navLeft").style.opacity = "1";
              document.getElementById("navRight").style.opacity = "1";
            }, 700)
  }
}

  roomView.addEventListener("click", next);
}

// if dreamstone selected
const dreamstone = document.getElementById("dreamstone");

function dreamstoneGet() {
    dreamstone.style.opacity = "0";
    dreamstone.style.pointerEvents = "none";

    const closeChest = document.getElementById("closeChest");
    closeChest.addEventListener('click', function(){
      foundDreamstoneDialogue([
        "I only have one left?",
        "I only have one left?",
        "I guess I'll have to get more soon.",
        "Whatever, let's return to the camera."
      ]);
    });
  }

function afterDreamstonePOV() {
  fade.classList.add('out');
  setTimeout(() => {
  document.getElementById("north").style.opacity = "0";
  document.getElementById("north").style.pointerEvents = "none";
  document.getElementById("vnView").style.opacity = "1";
  document.getElementById("vnView").style.pointerEvents = "auto";
  document.getElementById("navLeft").style.pointerEvents = "none";
  document.getElementById("navRight").style.pointerEvents = "none";
  document.getElementById("navLeft").style.opacity = "0";
  document.getElementById("navRight").style.opacity = "0";

  const characterImg = document.getElementById("osumiVn");
  const dialogueWrap = document.getElementById("dialogueWrap");
  const dialogueText = document.getElementById("day1D");

  dialogueWrap.style.opacity = "0";
  characterImg.src = "images/characters/osumi_2.png";
  fade.classList.remove('out');

  setTimeout(() => {
    dialogueWrap.style.opacity = "1";
    dialogueText.textContent = "Is that the Dreamstone?";
    finalDay1Dialogue();
  }, 2000)
  }, 1000);
}

function finalDay1Dialogue() {
  document.getElementById("osumivnCamera").style.pointerEvents = "none";
  document.getElementById("playerDialogueArrow").style.opacity = "1";

  isFinalDay1 = true;
  const endOfDayDialogue = [
    {
      speaker: "npc",
      text: "Is that the Dreamstone?",
      img: "images/characters/osumi_2.png"
    },
    {
      speaker: "npc",
      text: "It looks really pretty~",
      img: "images/characters/osumi_1.png"
    },
    {
      speaker: "player",
      text: "Yeah. To connect it to the camera you have to—"
    },
    {
      speaker: "npc",
      text: "It's okay!",
      img: "images/characters/osumi_1.png"
    },
    {
      speaker: "npc",
      text: "I got it.",
      img: "images/characters/osumi_2.png"
    },
    {
      speaker: "player",
      text: "No, but—",
    },
    {
      speaker: "npc",
      text: "Really! Please, I'm just in a hurry.",
      img: "images/characters/osumi_2.png"
    },
    {
      speaker: "player",
      text: "..."
    },
    {
      speaker: "choice",
          options: [
            {
              // choice 1
              text: "[Press further]",
              nextDialogue: [
                {
                  speaker: "player",
                  text: "Why are you so rushed all of a sudden?"
                },
                { 
                  speaker: "npc", 
                  text: "Hehe, what do you mean?",
                  img: "images/characters/osumi_2.png" 
                },
                { 
                  speaker: "npc", 
                  text: "I just have somewhere to be...",
                  img: "images/characters/osumi_1.png" 
                },
                { 
                  speaker: "npc", 
                  text: "Why are you looking at me like that?",
                  img: "images/characters/osumi_2.png" 
                },
                { 
                  speaker: "npc", 
                  text: "...",
                  img: "images/characters/osumi_4.png" 
                },
                {
                  speaker: "npc",
                  text: "... It's not my camera. I borrowed it off of my friend.",
                  img: "images/characters/osumi_5.png" 
                },
                {
                  speaker: "npc",
                  text: "There were personal memories in it, and I tried to take it out, but I'm not good with these things.",
                  img: "images/characters/osumi_5.png" 
                },
                {
                  speaker: "npc",
                  text: "So I must've damage it pretty badly by accident... It wouldnt turn back on and I was worried.",
                  img: "images/characters/osumi_5.png" 
                },
                {
                  speaker: "npc",
                  text: "Anyways, I'm really really in a hurry. I have to go!",
                  img: "images/characters/osumi_2.png"
                },
                {
                  speaker: "player",
                  text: "Wait!"
                },
                {
                  speaker: "npc",
                  text: "Alright! Bye now!",
                  img: "images/characters/osumi_1.png",
                },
                {
                  speaker: "player",
                  text: "...",
                  action: "exitShop"
                },
                {
                  speaker: "player",
                  text: "... She left her camera here."
                },
                {
                  speaker: "player",
                  text: "Guess I'll hold onto it for the time being."
                }
              ]
            },
            {
              // choice 2
              text: "[Ignore it]",
              nextDialogue: [
                {
                  speaker: "player",
                  text: "... Alright, fine."
                },
                {
                  speaker: "npc",
                  text: "Thanks.",
                  img: "images/characters/osumi_2.png"
                },
                { 
                  speaker: "player",
                  text: "It'll take just a minute to transfer the memories.", 
                },
                {
                  speaker: "npc",
                  text: "What are you going to do—",
                  img: "images/characters/osumi_3.png",
                  action: "transferDreamstone"
                },
                {
                  speaker: "player",
                  text: "It's done.", 
                },
                {
                  speaker: "npc",
                  text: "What was that?!",
                  img: "images/characters/osumi_3.png",
                },
                {
                  speaker: "npc",
                  text: "Oh! The time... I really need to get going.",
                  img: "images/characters/osumi_6.png",
                },
                {
                  speaker: "npc",
                  text: "Thanks so much for the Dreamstone though! Bye bye!!",
                  img: "images/characters/osumi_2.png",
                },
                {
                  speaker: "player",
                  text: "Wait! Don't forget—",
                  action: "exitShop"

                },
                {
                  speaker: "player",
                  text: "... Your camera...",
                },
                {
                  speaker: "player",
                  text: "Guess I'll hold onto it for the time being."
                }
              ]
            }
          ]
    }
  ];

  currentDialogue = endOfDayDialogue;
  currentIndex = 0;

  advanceDialogue();
} 