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

    const day1dialogue = [
        {
          speaker: "npc",
          text: "Oh hello! I wasn't expecting a camera repair shop of all things to open up here, in such a tucked away and hidden spot.",
          img: "images/characters/osumi_1.png"
        },
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
          img: "images/characters/osumi_1.png"
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
          img: "images/characters/osumi_1.png"
        },
        {
          speaker: "npc",
          text: "...watch you do it?",
          img: "images/characters/osumi_2.png"
        },
    ];

    let currentIndex = 1;

    vnView.addEventListener("click", () => {
      const current = day1dialogue[currentIndex];
          if (current.speaker === "npc") {
            playerElement.style.display = "none";
            npcArrow.style.display = "block";

            dialogueText.textContent = current.text;
            characterImg.src = current.img;

            currentIndex++;
          }

          else if (current.speaker === "player") {
            playerElement.style.display = "block";
            npcArrow.style.display = "none";

            playerText.textContent = current.text;

            currentIndex++;
          }

          else if (current.speaker === "choice") {
            showChoices(current.options);
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