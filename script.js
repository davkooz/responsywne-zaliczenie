// Funkcja otwierająca modal z informacjami o trenerze
function openModal(trainer) {

    // Deklaracja zmiennych
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");

    // Ustawienie zawartości modala w zależności od wybranego trenera
    if (trainer === "trener1") {
        modalImage.src = "trener1.jpg";
        modalName.textContent = "Agnieszka Paciorek";
        modalDescription.textContent = "Agnieszka jest certyfikowaną instruktorką jogi z ponad 10-letnim doświadczeniem.";
    } else if (trainer === "trener2") {
        modalImage.src = "trener2.jpg";
        modalName.textContent = "Rafał Bączek";
        modalDescription.textContent = "Rafał specjalizuje się w treningu siłowym i fitnessie funkcjonalnym.";
    } else if (trainer === "trener3") {
        modalImage.src = "trener3.jpg";
        modalName.textContent = "Grzegorz Jaworski";
        modalDescription.textContent = "Grzegorz jest ekspertem w pilatesie i ćwiczeniach rehabilitacyjnych.";
    }

    // Wyświetlenie modala
    modal.style.display = "flex";

    // Dodanie klasy animacji po krótkim opóźnieniu
    setTimeout(() => {
        modal.classList.add("show");
        modalContent.classList.add("show");
    }, 0);
}

// Funkcja zamykająca modal
function closeModal() {

    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");

    // Usunięcie klasy animacji
    modal.classList.remove("show");
    modalContent.classList.remove("show");

    // Ukrycie modala po zakończeniu animacji
    setTimeout(() => {
        modal.style.display = "none";
    }, 500); // Czas trwania animacji jak w cssie
}

// Zamykanie modalu po kliknieciu poza nim
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};

// Funkcja zmieniająca kolor nagłówków co sekundę
setInterval(() => {
    const headers = document.querySelectorAll('h1');
    headers.forEach(header => {
        header.style.color = header.style.color === 'black' ? '#007FFF' : 'black';
    });
}, 1000); // zmiana koloru co sekunde

// MINI GRA

let canvas, ctx, player, dumbbells, intervalId;

// Funkcja uruchamiająca grę
function startGame() {

    // Usunięcie istniejącego setInterval gry (reset)
    if (intervalId) clearInterval(intervalId);

    // Inicjalizacja obrazu gry i rysowania 2D
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Ustawienie wymiarów obrazu gry
    canvas.width = canvas.clientWidth;
    canvas.height = 400;

    // Inicjalizacja obiektu gracza
    player = {
        x: canvas.width / 2 - 15, //wyśrodkowanie poziom
        y: canvas.height - 50, //wyśrodkowanie pion
        width: 30,
        height: 30,
        color: '#007FFF',
        score: 0
    };

    // Inicjalizacja tablicy hantli
    dumbbells = [];
    for (let i = 0; i < 2; i++) {
        dumbbells.push({
            x: Math.random() * (canvas.width - 60), // Mieszczenie się hantli w szerokości gry
            y: Math.random() * -canvas.height,
            width: 60, // Szerokość całego obiektu hantla
            height: 20, // Wysokość w najwyższym miejscu (po bokach)
            color: 'black'
        });
    }



    // Funkcja zmieniająca kolory hantli
    function changeDumbbellColors() {
        dumbbells.forEach(dumbbell => {
            dumbbell.color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Losowy kolor
        });
    }

    function addNewDumbbell() {
        dumbbells.push({
            x: Math.random() * (canvas.width - 60),
            y: Math.random() * -canvas.height,
            width: 60,
            height: 20,
            color: 'black'
        });
    }

    // Dodanie nowego interwału
    setInterval(addNewDumbbell, 3000);
    setInterval(changeDumbbellColors, 3000);

    // Dodanie addEventListenerów do poruszania graczem
    document.addEventListener('keydown', movePlayer);
    canvas.addEventListener('mousemove', movePlayerWithCursor);

    // Ustawienie setInterval aktualizacji gry co 20 milisekund (50fps)
    intervalId = setInterval(updateGame, 20);
}

// Funkcja zatrzymująca grę
function stopGame() {

    // Usunięcie interwału gry
    clearInterval(intervalId);
    intervalId = null; // reset

    // Wyczyść grę i usuń EventListenery
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.removeEventListener('keydown', movePlayer);
    canvas.removeEventListener('mousemove', movePlayerWithCursor);

    if (player.score === 10) {
        alert('Gratulacje! Uzyskałeś 10 punktów. Gra zakończona.');
    } else {
        alert('Dziękujemy za udział w grze!')
    }
}

// Funkcja obsługująca ruch gracza za pomocą klawiatury
function movePlayer(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (player.x > 0) player.x -= 20;
            break;
        case 'ArrowRight':
            if (player.x + player.width < canvas.width) player.x += 20;
            break;
    }
}

// Funkcja obsługująca ruch gracza za pomocą myszy
function movePlayerWithCursor(e) {
    const rect = canvas.getBoundingClientRect(); //zawiera właściwości takie jak top, left, right, bottom, width i height
    const x = e.clientX - rect.left;
    player.x = x - player.width / 2; //ustawienie myszki na srodku gracza

    // Gracz pozostaje w granicach obszaru gry
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Funkcja rysująca gracza
function drawStickman(player) {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 2;

    // głowa
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y - 10, 10, 0, Math.PI * 2); //0 to kąt początkowy
    ctx.stroke(); //obrysowuje trase

    // ciało
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x + player.width / 2, player.y + 30);
    ctx.stroke();

    // ręce
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2 - 20, player.y + 10);
    ctx.lineTo(player.x + player.width / 2 + 20, player.y + 10);
    ctx.stroke();

    // hantle
    //ctx.beginPath();
    //ctx.rect(player.x + player.width / 2 - 25, player.y + 5, 10, 10);
    //ctx.stroke();

    //ctx.beginPath();
    //ctx.rect(player.x + player.width / 2 + 15, player.y + 5, 10, 10);
    //ctx.stroke();

    // lewa noga
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y + 30);
    ctx.lineTo(player.x + player.width / 2 - 10, player.y + 50);
    ctx.stroke();

    // prawa noga
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y + 30);
    ctx.lineTo(player.x + player.width / 2 + 10, player.y + 50);
    ctx.stroke();
}

// Funkcja rysująca hantle
function drawDumbbell(dumbbell) {
    ctx.strokeStyle = dumbbell.color;
    ctx.lineWidth = 2;

    // lewy kwadrat
    ctx.strokeRect(dumbbell.x, dumbbell.y, dumbbell.height, dumbbell.height);

    // prawy kwadrat
    ctx.strokeRect(dumbbell.x + dumbbell.width - dumbbell.height, dumbbell.y, dumbbell.height, dumbbell.height);

    // linia pomiędzy
    ctx.beginPath();
    ctx.moveTo(dumbbell.x + dumbbell.height, dumbbell.y + dumbbell.height / 2);
    ctx.lineTo(dumbbell.x + dumbbell.width - dumbbell.height, dumbbell.y + dumbbell.height / 2);
    ctx.stroke();
}

// Funkcja aktualizująca stan gry
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie gracza
    drawStickman(player);

    // Rysowanie hantli i aktualizacja ich pozycji
    dumbbells.forEach(dumbbell => {
        drawDumbbell(dumbbell);

        dumbbell.y += 5; //hantle w dół o 5 pikseli

        // Sprawdzenie kolizji
        if (dumbbell.y + dumbbell.height > player.y && dumbbell.y < player.y + player.height && dumbbell.x + dumbbell.width > player.x && dumbbell.x < player.x + player.width) {
            player.score++;
            dumbbell.y = -dumbbell.height; //resetuje hantle do pozycji nad płótnem
            dumbbell.x = Math.random() * (canvas.width - dumbbell.width);

            if (player.score >= 10) {
                stopGame();
                clearInterval(intervalId);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                resetDumbbells();
                document.removeEventListener('keydown', movePlayer);
                canvas.removeEventListener('mousemove', movePlayerWithCursor);
            }
        }

        // Resetowanie pozycji hantli, jeśli wyjdą poza ekran
        if (dumbbell.y > canvas.height) {
            dumbbell.y = -dumbbell.height;
            dumbbell.x = Math.random() * (canvas.width - dumbbell.width);
        }
    });

    // Wyświetlanie wyniku
    ctx.fillStyle = '#007FFF';
    ctx.font = '16px sans-serif';
    //if (intervalId != null)
    ctx.fillText('Wynik: ' + player.score, 10, 20);
}

// Funkcja resetująca pozycję hantli
function resetDumbbells() {
    for (let i = 0; i < dumbbells.length; i++) {
        dumbbells[i].x = Math.random() * (canvas.width - 60);
        dumbbells[i].y = Math.random() * -canvas.height; //losowa pozycja nad obszarem gierki
    }
}