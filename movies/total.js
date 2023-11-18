fetch('movies.json')
  .then(response => response.json())
  .then(data => {
    const maxId = getMaxId(data);

    // Actualizar el contenido del elemento en el HTML
    const maxIdElement = document.getElementById('maxId');
    if (maxIdElement) {
      maxIdElement.textContent = `TOTAL REVIEWS: ${maxId}`;
    }
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

// Función para obtener el número más alto de la propiedad "id"
function getMaxId(data) {
  let maxId = 0;

  data.forEach(movie => {
    const movieId = parseInt(movie.id, 10);
    if (!isNaN(movieId) && movieId > maxId) {
      maxId = movieId;
    }
  });

  return maxId;
}
