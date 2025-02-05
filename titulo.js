window.onload = function () {
    setTimeout(() => {
        let audio = document.getElementById("musica");
        audio.play().catch(error => console.log("Autoplay bloqueado:", error));
    }, 500); // Pequeno atraso antes de tentar tocar
};