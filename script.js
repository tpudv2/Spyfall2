
let gameData = {};
let currentRoom = null;
let currentPlayer = null;

function createGame() {
  const playerName = document.getElementById('playerName').value;
  if (!playerName) return alert("Ingresá tu nombre");
  const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  currentRoom = roomCode;
  currentPlayer = playerName;
  gameData[roomCode] = {
    players: [playerName],
    started: false
  };
  updateStatus(`Sala creada: ${roomCode}`);
  showLobby();
}

function joinGame() {
  const playerName = document.getElementById('playerName').value;
  const roomCode = document.getElementById('roomCode').value.toUpperCase();
  if (!playerName || !roomCode) return alert("Faltan datos");

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
  gameData[roomCode].players.push(playerName);
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
  gameData[currentRoom].started = true;
  updateStatus("La partida ha comenzado");
  alert("¡Repartan las cartas manualmente por ahora! Funcionalidad en desarrollo.");
}

function updateStatus(msg) {
  document.getElementById('status').innerText = msg;
}
