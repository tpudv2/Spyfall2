
let gameData = JSON.parse(localStorage.getItem("spyfallGameData")) || {};
let currentRoom = null;
let currentPlayer = null;
let playerRole = "";

const locations = [
  "Estación Espacial", "Crucero", "Banco", "Circo", "Hospital", "Escuela", "Museo", "Base Militar",
  "Restaurante", "Teatro", "Submarino", "Aeropuerto", "Hotel", "Tren", "Cine"
];

function saveGameData() {
  localStorage.setItem("spyfallGameData", JSON.stringify(gameData));
}

function createGame() {
  const playerName = document.getElementById('playerName').value;
  if (!playerName) return alert("Ingresá tu nombre");
  const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  currentRoom = roomCode;
  currentPlayer = playerName;
  gameData[roomCode] = {
    players: [playerName],
    started: false,
    roles: {},
    location: "",
    spy: ""
  };
  saveGameData();
  updateStatus(`Sala creada: ${roomCode}`);
  showLobby();
}

function joinGame() {
  const playerName = document.getElementById('playerName').value;
  const roomCode = document.getElementById('roomCode').value.toUpperCase();
  if (!playerName || !roomCode) return alert("Faltan datos");

  gameData = JSON.parse(localStorage.getItem("spyfallGameData")) || {};

  if (!gameData[roomCode]) {
    updateStatus(`Sala ${roomCode} no encontrada`);
    return;
  }

  if (gameData[roomCode].started) {
    updateStatus(`La partida ya comenzó`);
    return;
  }

  currentRoom = roomCode;
  currentPlayer = playerName;
  if (!gameData[roomCode].players.includes(playerName)) {
    gameData[roomCode].players.push(playerName);
  }
  saveGameData();
  updateStatus(`${playerName} se unió a la sala ${roomCode}`);
  showLobby();
}

function showLobby() {
  const lobby = document.getElementById('lobby');
  const list = document.getElementById('playersList');
  list.innerHTML = "";
  gameData[currentRoom].players.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    list.appendChild(li);
  });
  lobby.style.display = 'block';
}

function startGame() {
  const room = gameData[currentRoom];
  room.started = true;
  room.location = locations[Math.floor(Math.random() * locations.length)];
  const spyIndex = Math.floor(Math.random() * room.players.length);
  room.spy = room.players[spyIndex];

  room.players.forEach(player => {
    if (player === room.spy) {
      room.roles[player] = "Eres el ESPÍA. ¡Adivina la ubicación!";
    } else {
      room.roles[player] = `No eres espía. La ubicación es: ${room.location}`;
    }
  });

  saveGameData();
  playerRole = room.roles[currentPlayer];
  document.getElementById('roleInfo').innerText = playerRole;
  updateStatus("La partida ha comenzado");
}

function updateStatus(msg) {
  document.getElementById('status').innerText = msg;
}
