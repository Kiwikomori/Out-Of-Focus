//AUDIOS
const chime_audio = new Audio("audios/completedChime.mp3");
const marimba_audio = new Audio("audios/completedMarimba.mp3");
const failHum_audio = new Audio("audios/failedHum.mp3");
const enterBell_audio = new Audio("audios/enterBell.mp3");

function osumichange() {
    document.getElementById("osumi").src = "images/characters/osumi_2.png";
}

/* get the back button element */
const backBtn = document.getElementById('back');

/* uncheck all checkboxes when Back button is clicked */
  backBtn.addEventListener('click', function uncheck() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
  });

/* navigation between rooms */
const rooms = ['north', 'east', 'southFront', 'west'];
let currentRoom = '0';
let insideBR = false; // false by default

function go(where) {
  const fade = document.getElementById('fade');

  // fade out
  fade.classList.add('out');

  setTimeout(() => {

    // hide current room and show new room while fading
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
  }, 450); // duration of fade out
}

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

  camView.classList.add("active");
  startRound();
  // prevent interaction if not enabled
  if (!cam.classList.contains("active")) return;
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
  fade.style.backdropFilter = "blur(5px)";
  fade.classList.add('out');
  document.getElementById("dayCounter").textContent = "Day 1";
  setTimeout(() => {

  document.getElementById("north").style.opacity = "0";
  document.getElementById("north").style.pointerEvents = "none";
  document.getElementById("vnView").style.opacity = "1";
  document.getElementById("vnView").style.pointerEvents = "auto";

  document.getElementById("navLeft").style.display = "none";
  document.getElementById("navRight").style.display = "none";

  

  fade.classList.remove('out');

  }, 2000);

    setTimeout(() => {
      characterImg.style.opacity = "1";
    }, 4000);

    setTimeout(() => {
      dialogueWrap.style.opacity = "1";
      dialogueText.textContent = "Oh hello! I wasn't expecting a camera repair shop of all things to open up here, in such a tucked away and hidden spot.";
    characterImg.src = "images/characters/osumi_1.png";
    }, 5500);
}

document.addEventListener("DOMContentLoaded", () => {
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

    
    let currentDialogue = day1dialogue;
    let currentIndex = 0;

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

    vnView.addEventListener("click", () => {

      if (currentIndex >= currentDialogue.length) {

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


      if (currentIndex >= currentDialogue.length) {
        setTimeout(() => {
          document.getElementById("osumivnCamera").style.opacity = "1";
      }, 200); // delay after dialogue ends
        return;
      }
      
      const current = currentDialogue[currentIndex];
      const playerChoice = document.getElementById("playerChoice");

      // dont current index up if i didnt click any choice
      if (playerChoice.style.display === "block") return;

          if (current.action === "placeCamera") {
            setTimeout(() => {
              document.getElementById("osumivnCamera").style.opacity = "1";
            }, 200);
          }
  
          if (current.speaker === "npc") {
            playerElement.style.opacity = "0";
            npcArrow.style.display = "block";
            npcElement.style.display = "block";


            dialogueText.textContent = current.text;
            characterImg.src = current.img;
            currentIndex++;
          }

          else if (current.speaker === "player") {
            playerElement.style.opacity = "1";
            playerElement.style.pointerEvents = "auto";
            npcArrow.style.display = "none";

            playerText.textContent = current.text;
            currentIndex++;
          }

          else if (current.speaker === "choice") {
            npcArrow.style.display = "none";
            playerElement.style.opacity = "0";
            npcElement.style.display = "none";
            showChoices(current.options);
            return;
          }

    });
});
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

// ==============PUZZLES==============
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
  setTimeout(() => startRound(), 1500);
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
  // reveal all
  buttons.forEach((b) => b.classList.remove("hidden"));
  buttons.forEach((b) => (b.style.pointerEvents = "none"));
  marimba_audio.play();

  // put your "minigame cleared" logic here:
  // e.g. close puzzle UI, unlock next area, etc.
  console.log("MINIGAME CLEARED ✅");
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

const lottieCursor = document.getElementById("lottieCursor");

// Follow mouse
document.addEventListener("pointermove", (e) => {
  lottieCursor.style.left = `${e.clientX}px`;
  lottieCursor.style.top = `${e.clientY}px`;
});

// Pulse on left click only
document.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return; // only left click (button 0)
  
  lottieCursor.classList.add("pulse");

  // Remove pulse after animation ends so it can retrigger
  setTimeout(() => {
    lottieCursor.classList.remove("pulse");
  }, 300);
});
