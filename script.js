
let players = {};
let currentRoom = null;

function createGame() {
  const playerName = document.getElementById('playerName').value;
  const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  currentRoom = roomCode;
  players[roomCode] = [playerName];
  document.getElementById('status').innerText = `Sala creada: ${roomCode}`;
}

function joinGame() {
  const playerName = document.getElementById('playerName').value;
  const roomCode = document.getElementById('roomCode').value.toUpperCase();
  if (players[roomCode]) {
    players[roomCode].push(playerName);
    document.getElementById('status').innerText = `${playerName} se unió a la sala ${roomCode}`;
  } else {
    document.getElementById('status').innerText = `Sala ${roomCode} no encontrada`;
  }
}
