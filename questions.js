
const questions = [
  "¿Hace calor o frío donde estamos?",
  "¿Estás vestido formal o informal hoy?",
  "¿Hay mucha gente alrededor?",
  "¿Es un lugar donde se habla en voz baja?",
  "¿Hay acceso a comida o bebida?",
  "¿El lugar es seguro o hay peligros?",
  "¿Cuánto tiempo sueles pasar aquí?",
  "¿Se escucha música en este lugar?",
  "¿Es un sitio cerrado o al aire libre?",
  "¿Hay que pagar para entrar aquí?",
  "¿Es común que haya niños en este lugar?",
  "¿Ves a alguien con uniforme?",
  "¿Qué tipo de personas suelen venir aquí?",
  "¿Podés ver vehículos desde donde estás?",
  "¿Se permite el uso del celular aquí?",
  "¿Cuál es el olor predominante del lugar?",
  "¿Cómo llegaste hasta aquí?",
  "¿Hay reglas estrictas en este lugar?",
  "¿Podrías dormir acá cómodamente?",
  "¿Es más activo de día o de noche?"
];

function startSuggestions() {
  const suggestionDiv = document.createElement("div");
  suggestionDiv.id = "suggestion";
  suggestionDiv.style.marginTop = "20px";
  suggestionDiv.style.fontStyle = "italic";
  document.getElementById("gameInfo").appendChild(suggestionDiv);

  function showRandomQuestion() {
    const random = questions[Math.floor(Math.random() * questions.length)];
    suggestionDiv.textContent = "Sugerencia: " + random;
  }

  showRandomQuestion();
  setInterval(showRandomQuestion, 10000); // cada 10 segundos
}
