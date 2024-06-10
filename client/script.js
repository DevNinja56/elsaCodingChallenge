const socket = io('http://localhost:4000');

function joinQuiz() {
    const quizId = document.getElementById('quiz-id').value;
    const userId = document.getElementById('user-id').value;

    if (quizId && userId) {
        socket.emit('joinQuiz', quizId, userId);
        document.getElementById('join-quiz').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
    } else {
        alert('Please enter both Quiz ID and User ID');
    }
}

function submitAnswer() {
    const quizId = document.getElementById('quiz-id').value;
    const userId = document.getElementById('user-id').value;
    const answer = document.getElementById('answer').value;

    if (answer) {
        socket.emit('submitAnswer', quizId, userId, answer);
        document.getElementById('answer').value = '';
    } else {
        alert('Please enter an answer');
    }
}

socket.on('initialLeaderboard', (leaderboard) => {
    updateLeaderboard(leaderboard);
});

socket.on('updateLeaderboard', (leaderboard) => {
    updateLeaderboard(leaderboard);
});

socket.on('error', (message) => {
    alert(message);
});

function updateLeaderboard(leaderboard) {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    leaderboard.forEach((entry) => {
        const li = document.createElement('li');
        li.textContent = `User ${entry.user_id}: ${entry.score}`;
        leaderboardList.appendChild(li);
    });
}
