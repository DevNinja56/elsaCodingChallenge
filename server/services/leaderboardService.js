const getLeaderboard = async (redisClient, pool, quizId) => {
    return new Promise((resolve, reject) => {
      redisClient.get(`leaderboard:${quizId}`, async (err, data) => {
        if (err) return reject(err);
        if (data) {
          return resolve(JSON.parse(data));
        } else {
          const scores = await pool.query(
            'SELECT user_id, score FROM scores WHERE quiz_id = $1 ORDER BY score DESC',
            [quizId]
          );
          redisClient.setex(`leaderboard:${quizId}`, 60, JSON.stringify(scores.rows));
          return resolve(scores.rows);
        }
      });
    });
  };
  
  module.exports = {
    getLeaderboard,
  };
  