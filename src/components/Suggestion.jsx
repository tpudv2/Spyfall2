import React, { useEffect, useState } from 'react'

const questions = [
  "¿Hace calor o frío donde estamos?", "¿Estás vestido formal o informal hoy?",
  "¿Hay mucha gente alrededor?", "¿Se escucha música en este lugar?",
  "¿Es un sitio cerrado o al aire libre?", "¿Hay que pagar para entrar aquí?",
  "¿Es común que haya niños en este lugar?", "¿Ves a alguien con uniforme?",
  "¿Qué tipo de personas suelen venir aquí?", "¿Se permite el uso del celular aquí?",
  "¿Cuál es el olor predominante del lugar?", "¿Cómo llegaste hasta aquí?",
  "¿Hay reglas estrictas?", "¿Podrías dormir acá cómodamente?", 
  "¿Es más activo de día o de noche?", "¿Ves alguna pantalla o televisor?",
  "¿Se usan herramientas especiales aquí?", "¿Hay ventanas en el lugar?",
  "¿Es más grande que una casa promedio?", "¿Hay decoraciones visibles?",
  "¿Se necesita reservación?", "¿Qué sonidos predominan?",
  "¿Ves luces tenues o brillantes?", "¿El suelo es alfombrado, madera o cemento?",
  "¿Este lugar huele a comida?", "¿Qué tipo de clima encajaría aquí?",
  "¿Este lugar es viejo o moderno?", "¿Es cómodo estar mucho tiempo?",
  "¿Es parte de una cadena conocida?", "¿Requiere vestimenta especial?",
  "¿Hay elementos de seguridad visibles?", "¿Pasan animales cerca?",
  "¿Se sirven bebidas aquí?", "¿Hay actividades deportivas?"
]

function Suggestion() {
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const changeQuestion = () => {
      const random = questions[Math.floor(Math.random() * questions.length)]
      setCurrentQuestion(random)
      setProgress(0)
    }
    changeQuestion()

    const interval = setInterval(changeQuestion, 5000)
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 2))
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="suggestion">
      {currentQuestion}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

export default Suggestion
