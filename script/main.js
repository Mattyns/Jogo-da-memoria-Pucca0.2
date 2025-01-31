let flippedCards = [];
let canFlip = true;
let matchedPairs = 0;
let totalPairs = 5; // Altere para o número TOTAL de pares no jogo (ex: 3 pares = 6 cartas)

document.querySelectorAll('.card-container').forEach(card => {
    card.addEventListener('click', function() {
        if (!canFlip || this.classList.contains('matched')) return;

        const flipCardElement = this.querySelector('[id$="-flipCard"]');
        const flipClass = flipCardElement.id.replace('-flipCard', '-is-flipped');

        if (flipCardElement.classList.contains(flipClass)) return;

        flipCardElement.classList.add(flipClass);
        flippedCards.push({ element: this, flipElement: flipCardElement, pair: this.dataset.pair });

        if (flippedCards.length === 2) {
            canFlip = false;
            setTimeout(checkMatch, 1000);
        }
    });
});

// ... (código anterior permanece igual)

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.pair === card2.pair) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert("Parabéns! Você venceu! 🎉");
                embaralharCards(); // EMBARALHA PRIMEIRO
                resetGame(); // DEPOIS RESETA
            }, 1000);
        }
    } else {
        card1.flipElement.classList.remove(card1.flipElement.id.replace('-flipCard', '-is-flipped'));
        card2.flipElement.classList.remove(card2.flipElement.id.replace('-flipCard', '-is-flipped'));
    }

    flippedCards = [];
    canFlip = true;
}

function embaralharCards() {
    const container = document.getElementById('capa');
    const cards = Array.from(container.children); // Pega TODAS as cartas (incluindo as resolvidas)
    
    // Embaralha usando Fisher-Yates
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Remove todas as cartas do container
    container.innerHTML = '';
    
    // Adiciona as cartas embaralhadas
    cards.forEach(card => container.appendChild(card));
}

function resetGame() {
    // Remove o estado "matched" e desvira todas as cartas
    document.querySelectorAll('.card-container').forEach(card => {
        card.classList.remove('matched');
        const flipCard = card.querySelector('[id$="-flipCard"]');
        const flipClass = flipCard.id.replace('-flipCard', '-is-flipped');
        flipCard.classList.remove(flipClass);
    });
    
    // Reseta variáveis
    matchedPairs = 0;
    flippedCards = [];
    canFlip = true;
}

// Adicione esta linha para embaralhar as cartas no início do jogo!
window.onload = () => {
    embaralharCards(); // Embaralha ao carregar a página
};