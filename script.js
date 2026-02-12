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