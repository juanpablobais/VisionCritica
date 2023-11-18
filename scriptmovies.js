document.addEventListener("DOMContentLoaded", function () {
    // Función para mostrar la review completa en el modal
    function showReviewComplete(review) {
        const modalContent = document.getElementById("reviewContent");
        modalContent.innerHTML = `
            <h5 class="text-center" style="color:white;">${review.title}</h5>
            <img src="${review.image}" alt="Imagen de la reseña" class="mx-auto d-block" style="max-width: 50%; height: auto;">
            <p>Fecha: ${review.date}</p>
            <p>${review.content}</p>
        `;
        const modal = new bootstrap.Modal(document.getElementById("reviewModal"));
        modal.show();
    }

    // Cargar datos desde el archivo JSON
    fetch("/movies/movies.json")
        .then((response) => response.json())
        .then((reviewsData) => {
            const reviewsContainer = document.getElementById("movies-container");

            // Limpiar el contenedor antes de agregar nuevas reviews
            reviewsContainer.innerHTML = "";

            // Ordenar las reseñas por el número de ID más alto
            reviewsData.sort((a, b) => b.id - a.id);

            // Tomar solo las últimas 3 críticas
            const last3Reviews = reviewsData.slice(0, 3);

            // Agregar las reviews al contenedor y configurar "Leer más" para abrir el modal
            last3Reviews.forEach((review) => {
                const reviewCard = document.createElement("div");
                reviewCard.classList.add("col-md-4");
                reviewCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${review.image}" class="card-img-top" alt="Imagen de la reseña" style="max-width: 100%; height: auto;">
                        <div class="card-body d-flex flex-column" style="background-color:#062F4F;">
                            <h5 class="card-title" style="color:white;">${review.title}</h5>
                            <div class="mt-auto text-center">
                                <button class="btn btn-primary read-more w-75 mt-auto">Ver reseña</button>
                            </div>
                        </div>
                    </div>
                `;
                reviewsContainer.appendChild(reviewCard);

                // Agregar evento clic para "Leer más"
                const readMoreButton = reviewCard.querySelector(".read-more");
                readMoreButton.addEventListener("click", () => {
                    showReviewComplete(review);
                });
            });
        });
});
