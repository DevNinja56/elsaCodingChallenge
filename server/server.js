const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const pool = require('./utils/db');
const { verifyQuiz, validateAnswer, updateScore } = require('./controllers/quizController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('client'));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinQuiz', async (quizId, userId) => {
    if (await verifyQuiz(pool, quizId)) {
      socket.join(quizId);
      socket.quizId = quizId;
      socket.userId = userId;

      // Send initial leaderboard
      const leaderboard = await pool.query('SELECT user_id, score FROM scores WHERE quiz_id = $1 ORDER BY score DESC', [quizId]);
      socket.emit('initialLeaderboard', leaderboard.rows);

      console.log(`User ${userId} joined quiz ${quizId}`);
    } else {
      socket.emit('error', 'Invalid quiz ID');
    }
  });

  socket.on('submitAnswer', async (quizId, userId, answer) => {
    if (await validateAnswer(pool, quizId, answer)) {
      await updateScore(pool, userId, quizId);
      const leaderboard = await pool.query('SELECT user_id, score FROM scores WHERE quiz_id = $1 ORDER BY score DESC', [quizId]);
      io.in(quizId).emit('updateLeaderboard', leaderboard.rows);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
