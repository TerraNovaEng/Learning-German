let currentIndex = 0;
let wordData = [];

// Helper to shuffle the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function loadWords() {
    try {
        const response = await fetch('./data/words.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        wordData = await response.json();
        shuffle(wordData); 
        renderWord();
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

function renderWord() {
    // Safety check: ensure wordData has content before accessing index
    if (wordData.length === 0) return;

    const word = wordData[currentIndex];
    const container = document.getElementById('word-container');
    
    container.innerHTML = `
        <p class="phrase">${word.phrase}</p>
        <p class="transliteration">${word.transliteration}</p>
        <p class="root">Root: [${word.root}]</p>
        <p class="meaning">${word.meaning}</p>
        <p class="progress">Word ${currentIndex + 1} of ${wordData.length}</p>
    `;
}

document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + wordData.length) % wordData.length;
    renderWord();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % wordData.length;
    renderWord();
});

loadWords();
