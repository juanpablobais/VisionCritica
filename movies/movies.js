// Variable global para almacenar las reseñas originales sin filtrar
let originalReviews = [];

// Función para mostrar las reseñas en el contenedor
function displayReviews(reviews) {
  const imageRow = document.getElementById('image-row');
  // Limpiar el contenedor
  imageRow.innerHTML = '';

  reviews.forEach(review => {
    const image = document.createElement('img');
    image.src = review.image;
    image.alt = review.title;
    image.style.maxWidth = '150px'; // Tamaño máximo deseado
    image.style.height = '200px'; // Para conservar las proporciones
    image.className = 'mx-auto'; // Centrar horizontalmente

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'col-6 col-md-4 col-lg-2 mb-4'; // Bootstrap classes for column layout

    // Agregar tooltip al pasar el puntero
    const tooltipText = `Título: ${review.title}<br>Puntuación: ${review.rating}<br>Fecha: ${review.date}`;
    image.setAttribute('data-toggle', 'tooltip');
    image.setAttribute('data-placement', 'top');
    image.setAttribute('data-html', 'true');
    image.setAttribute('title', tooltipText);

    const starRating = document.createElement('span');
starRating.className = 'star-rating';

// Crear estrellas según la puntuación
const rating = parseRating(review.rating);
const filledStars = Math.floor(rating);
const hasHalfStar = rating % 1 !== 0;

for (let i = 1; i <= 5; i++) {
  const star = document.createElement('i');

  if (i <= filledStars) {
    star.className = 'fas fa-star'; // Estrella llena
  } else if (hasHalfStar && i === filledStars + 1) {
    star.className = 'fas fa-star-half-alt'; // Media estrella
  } else {
    star.className = 'far fa-star'; // Estrella vacía
  }

  starRating.appendChild(star);
}

    // Agregar el span de estrellas debajo de la imagen
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(starRating);
    imageRow.appendChild(imageWrapper);

    // Agregar evento click para mostrar el modal
    imageWrapper.addEventListener('click', () => {
      const modalTitle = document.getElementById('modalTitle');
      const modalImage = document.getElementById('modalImage');
      const modalAuthor = document.getElementById('modalAuthor');
      const modalDate = document.getElementById('modalDate');
      const modalContent = document.getElementById('modalContent');

      modalTitle.textContent = review.title;
      modalTitle.style.textAlign = 'center'; // Aplicar el estilo para centrar el título
      modalImage.src = review.image;
      modalImage.style.maxWidth = '200px';
      modalImage.style.maxHeight = '80vh';
      modalAuthor.textContent = review.author;
      modalDate.textContent = review.date;
      modalContent.textContent = review.content;
      $('#reviewModal').modal('show');
    });
  });

  // Inicializar los tooltips de Bootstrap
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}

// Función para convertir calificaciones en números
function parseRating(rating) {
  // Verifica si la calificación es un número
  if (!isNaN(rating)) {
    return parseFloat(rating); // Si ya es un número, devuélvelo
  } else if (typeof rating === 'string') {
    // Si la calificación es una cadena (como "10/10"), intenta extraer el número
    const parts = rating.split('/');
    if (parts.length === 2) {
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return numerator / denominator;
      }
    }
  }

  // Si no se puede procesar, devuelve 0 (o cualquier otro valor predeterminado que desees)
  return 0;
}

// Función para filtrar las reseñas en función del filtro seleccionado
function filterReviews(filter = 'newest') {
  const filteredReviews = [...originalReviews]; // Clona el arreglo original de reseñas

  switch (filter) {
    case 'newest':
      filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'highestRating':
      filteredReviews.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowestRating':
      filteredReviews.sort((a, b) => a.rating - b.rating);
      break;
    case 'alphabetical':
      filteredReviews.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  // Llama a la función para cargar las reseñas con el arreglo filtrado
  displayReviews(filteredReviews);
}

// Evento para el botón de filtrar
document.getElementById('filterButton').addEventListener('click', function () {
  $('#filterModal').modal('show'); // Abre el modal de filtrado
});

// Eventos para los botones de filtrado
document.getElementById('newest').addEventListener('click', function () {
  filterReviews('newest');
});

document.getElementById('oldest').addEventListener('click', function () {
  filterReviews('oldest');
});

document.getElementById('highestRating').addEventListener('click', function () {
  filterReviews('highestRating');
});

document.getElementById('lowestRating').addEventListener('click', function () {
  filterReviews('lowestRating');
});

document.getElementById('alphabetical').addEventListener('click', function () {
  filterReviews('alphabetical');
});

// Cargar los datos del archivo JSON y almacenar las reseñas originales
fetch('movies.json')
  .then(response => response.json())
  .then(data => {
    originalReviews = data;

    // Ordenar las reseñas de la más antigua a la más reciente
    originalReviews.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Mostrar las reseñas originales con el filtro 'newest'
    filterReviews('newest');
  });