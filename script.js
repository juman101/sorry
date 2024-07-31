const puzzleContainer = document.getElementById('puzzle-container');
const successMessage = document.getElementById('success-message');
const successVideo = document.getElementById('success-video');
const pieces = [
    { id: 0, backgroundPosition: '0px 0px' },
    { id: 1, backgroundPosition: '-100px 0px' },
    { id: 2, backgroundPosition: '-200px 0px' },
    { id: 3, backgroundPosition: '0px -100px' },
    { id: 4, backgroundPosition: '-100px -100px' },
    { id: 5, backgroundPosition: '-200px -100px' },
    { id: 6, backgroundPosition: '0px -200px' },
    { id: 7, backgroundPosition: '-100px -200px' },
    { id: 8, backgroundPosition: '-200px -200px' }
];

const correctPositions = [
    { top: '0px', left: '0px' },
    { top: '0px', left: '100px' },
    { top: '0px', left: '200px' },
    { top: '100px', left: '0px' },
    { top: '100px', left: '100px' },
    { top: '100px', left: '200px' },
    { top: '200px', left: '0px' },
    { top: '200px', left: '100px' },
    { top: '200px', left: '200px' }
];

// Shuffle the pieces initially
const shuffledPositions = [...correctPositions].sort(() => Math.random() - 0.5);

// Create puzzle pieces
pieces.forEach((piece, index) => {
    const div = document.createElement('div');
    div.className = 'piece';
    div.style.backgroundImage = 'url("puzzle-image.jpg")';
    div.style.backgroundPosition = piece.backgroundPosition;
    div.style.top = shuffledPositions[index].top;
    div.style.left = shuffledPositions[index].left;
    div.draggable = true;
    div.addEventListener('dragstart', dragStart);
    div.addEventListener('dragover', dragOver);
    div.addEventListener('drop', drop);
    document.getElementById('puzzle').appendChild(div);
});

let draggedElement = null;

function dragStart(event) {
    draggedElement = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (event.target.className === 'piece') {
        let targetTop = event.target.style.top;
        let targetLeft = event.target.style.left;
        let draggedTop = draggedElement.style.top;
        let draggedLeft = draggedElement.style.left;

        event.target.style.top = draggedTop;
        event.target.style.left = draggedLeft;
        draggedElement.style.top = targetTop;
        draggedElement.style.left = targetLeft;

        checkPuzzle();
    }
}

function checkPuzzle() {
    console.log('Checking puzzle...');
    let isSolved = Array.from(document.getElementById('puzzle').children).every((piece, index) => {
        let correctPosition = correctPositions[index];
        let pieceTop = piece.style.top;
        let pieceLeft = piece.style.left;
        let pieceBackgroundPosition = piece.style.backgroundPosition;
        let correctTop = correctPosition.top;
        let correctLeft = correctPosition.left;
        let correctBackgroundPosition = pieces[index].backgroundPosition;

        console.log(`Piece ${index}:`, {
            currentTop: pieceTop,
            currentLeft: pieceLeft,
            currentBackgroundPosition: pieceBackgroundPosition,
            correctTop: correctTop,
            correctLeft: correctLeft,
            correctBackgroundPosition: correctBackgroundPosition,
            isCorrect: pieceTop === correctTop && pieceLeft === correctLeft && pieceBackgroundPosition === correctBackgroundPosition
        });

        return pieceTop === correctTop && pieceLeft === correctLeft && pieceBackgroundPosition === correctBackgroundPosition;
    });

    console.log('Puzzle is solved:', isSolved);
    if (isSolved) {
        puzzleContainer.style.display = 'none';
        successMessage.style.display = 'flex';
        successVideo.play(); // Play the video when the puzzle is solved
    }
}
