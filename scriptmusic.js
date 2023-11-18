document.addEventListener("DOMContentLoaded", function () {
    // Función para mostrar la review completa en el modal
    function showReviewComplete(review) {
        const modalContent = document.getElementById("reviewContent");
        modalContent.innerHTML = `
            <h5 class="text-center">${review.title}</h5>
            <img src="${review.image}" alt="Imagen de la reseña" class="mx-auto d-block" style="max-width: 50%; height: auto;">
            <p>Fecha: ${review.date}</p>
            <p>${review.content}</p>
        `;
        const modal = new bootstrap.Modal(document.getElementById("reviewModal"));
        modal.show();
    }

    // Cargar datos desde el archivo JSON
    fetch("/music/music.json")
        .then((response) => response.json())
        .then((reviewsData) => {
            const reviewsContainer = document.getElementById("music-container");

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
                    <div class="card mb-4">
                        <img src="${review.image}" class="card-img-top" alt="Imagen de la reseña" style="max-width: 100%; height: auto;">
                        <div class="card-body text-center" style="background-color:#062F4F;">
                            <h5 class="card-title" style="color:white";>${review.title}</h5>
                            <p class="card-text" style="color:white";>Fecha: ${review.date}</p>
                            <button class="btn btn-primary read-more w-75">Ver reseña</button> 
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

