import React from 'react'

function Lobby() {
  return (
    <div className="card">
      <input type="text" placeholder="Tu nombre" className="input" />
      <div className="buttons">
        <button className="btn">Crear Sala</button>
        <input type="text" placeholder="Código de sala" className="input" />
        <button className="btn">Unirse</button>
      </div>
    </div>
  )
}

export default Lobby
