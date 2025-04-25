
const firebaseConfig = {
  apiKey: "AIzaSyCwUzTEZnI_dCyYvuP71iK8V0iUZRFK_tM",
  authDomain: "spyfallbros.firebaseapp.com",
  databaseURL: "https://spyfallbros-default-rtdb.firebaseio.com/",
  projectId: "spyfallbros",
  storageBucket: "spyfallbros.firebasestorage.app",
  messagingSenderId: "494278374346",
  appId: "1:494278374346:web:46008869629a3609835533"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentRoom = null;
let currentPlayer = null;
let playerRole = "";

const locations = [
  "Estación Espacial", "Crucero", "Banco", "Circo", "Hospital", "Escuela", "Museo", "Base Militar",
  "Restaurante", "Teatro", "Submarino", "Aeropuerto", "Hotel", "Tren", "Cine"
];

function createGame() {
  const playerName = document.getElementById('playerName').value;
  if (!playerName) return alert("Ingresá tu nombre");
  const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  currentRoom = roomCode;
  currentPlayer = playerName;

  db.ref("rooms/" + roomCode).set({
    players: [playerName],
    started: false,
    roles: {},
    location: "",
    spy: ""
  }).then(() => {
    updateStatus("Sala creada: " + roomCode);
    listenToPlayers();
  });
}

function joinGame() {
  const playerName = document.getElementById('playerName').value;
  const roomCode = document.getElementById('roomCode').value.toUpperCase();
  if (!playerName || !roomCode) return alert("Faltan datos");

  currentRoom = roomCode;
  currentPlayer = playerName;

  const roomRef = db.ref("rooms/" + roomCode);
  roomRef.once("value").then(snapshot => {
    const room = snapshot.val();
    if (!room) {
      updateStatus("Sala no encontrada");
      return;
    }

    if (room.started) {
      updateStatus("La partida ya comenzó");
      return;
    }

    if (!room.players.includes(playerName)) {
      room.players.push(playerName);
      roomRef.update({ players: room.players });
    }

    updateStatus("Te uniste a la sala " + roomCode);
    listenToPlayers();
  });
}

function listenToPlayers() {
  const list = document.getElementById('playersList');
  const lobby = document.getElementById('lobby');
  db.ref("rooms/" + currentRoom + "/players").on("value", snapshot => {
    const players = snapshot.val() || [];
    list.innerHTML = "";
    players.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      list.appendChild(li);
    });
    lobby.style.display = 'block';
  });
}

function startGame() {
  const roomRef = db.ref("rooms/" + currentRoom);
  roomRef.once("value").then(snapshot => {
    const room = snapshot.val();
    const players = room.players;
    const spyIndex = Math.floor(Math.random() * players.length);
    const spy = players[spyIndex];
    const location = locations[Math.floor(Math.random() * locations.length)];

    const roles = {};
    players.forEach(player => {
      roles[player] = player === spy
        ? "Eres el ESPÍA. ¡Adivina la ubicación!"
        : "No eres espía. La ubicación es: " + location;
    });

    roomRef.update({
      started: true,
      location: location,
      spy: spy,
      roles: roles
    });

    db.ref("rooms/" + currentRoom + "/roles/" + currentPlayer).once("value")
      .then(roleSnap => {
        document.getElementById('roleInfo').innerText = roleSnap.val();
      });

    updateStatus("Partida iniciada");
  });
}

function updateStatus(msg) {
  document.getElementById('status').innerText = msg;
}
