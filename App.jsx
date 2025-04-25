import React from 'react'
import Lobby from './components/Lobby'
import Suggestion from './components/Suggestion'

function App() {
  return (
    <div className="container">
      <h1>Perritos y Fichines Vault</h1>
      <Lobby />
      <Suggestion />
    </div>
  )
}

export default App
