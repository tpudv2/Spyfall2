
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, onValue, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwUzTEZnI_dCyYvuP71iK8V0iUZRFK_tM",
  authDomain: "spyfallbros.firebaseapp.com",
  projectId: "spyfallbros",
  storageBucket: "spyfallbros.firebasestorage.app",
  messagingSenderId: "494278374346",
  appId: "1:494278374346:web:46008869629a3609835533",
  databaseURL: "https://spyfallbros-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

  set(ref(db, "rooms/" + roomCode), {
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

  const roomRef = ref(db, "rooms/" + roomCode);
  get(roomRef).then(snapshot => {
    if (!snapshot.exists()) {
      updateStatus("Sala no encontrada");
      return;
    }

    const room = snapshot.val();
    if (room.started) {
      updateStatus("La partida ya comenzó");
      return;
    }

    if (!room.players.includes(playerName)) {
      room.players.push(playerName);
      update(roomRef, { players: room.players });
    }

    updateStatus("Te uniste a la sala " + roomCode);
    listenToPlayers();
  });
}

function listenToPlayers() {
  const list = document.getElementById('playersList');
  const lobby = document.getElementById('lobby');
  const playersRef = ref(db, "rooms/" + currentRoom + "/players");

  onValue(playersRef, snapshot => {
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
  const roomRef = ref(db, "rooms/" + currentRoom);
  get(roomRef).then(snapshot => {
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

    update(roomRef, {
      started: true,
      location: location,
      spy: spy,
      roles: roles
    });

    get(child(roomRef, "roles/" + currentPlayer)).then(roleSnap => {
      document.getElementById('roleInfo').innerText = roleSnap.val();
    });

    updateStatus("Partida iniciada");
  });
}

function updateStatus(msg) {
  document.getElementById('status').innerText = msg;
}
