fetch('movies.json')
  .then(response => response.json())
  .then(data => {
    // Extraer los puntajes del objeto JSON (ajusta la propiedad según la estructura de tu JSON)
    const scores = data.map(entry => entry.rating);

    // Llama a la función para contar y mostrar las barras de conteo
    countScores(scores);
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

// Función para contar los puntajes y mostrar barras de conteo
function countScores(scores) {
  const scoreCounter = document.getElementById('scoreCounter');
  scoreCounter.innerHTML = ''; // Limpiar el contenido

  // Crear un objeto para almacenar la frecuencia de cada puntaje
  const scoreFrequency = {};

  // Calcular la frecuencia de cada puntaje
  scores.forEach(score => {
    // Redondear el puntaje al número entero más cercano dividido por 2
    const roundedScore = Math.round(score * 2) / 2;
    scoreFrequency[roundedScore] = (scoreFrequency[roundedScore] || 0) + 1;
  });

  // Crear barras para cada puntaje
  [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].forEach(score => {
    const count = scoreFrequency[score] || 0;

    // Crear una barra con tooltip
    const scoreBar = document.createElement('div');
    scoreBar.className = 'score-bar';
    scoreBar.setAttribute('data-toggle', 'tooltip');
    scoreBar.setAttribute('data-placement', 'top');
    scoreBar.setAttribute('title', `Cantidad de películas: ${count}`);

    const scoreLabel = document.createElement('div');
    scoreLabel.className = 'score';
    scoreLabel.textContent = `${score}:`;

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = `${count * 20}px`; // Ajusta el ancho de la barra según tus necesidades

    scoreBar.appendChild(scoreLabel);
    scoreBar.appendChild(bar);
    scoreCounter.appendChild(scoreBar);
  });

  // Inicializar los tooltips de Bootstrap
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}
