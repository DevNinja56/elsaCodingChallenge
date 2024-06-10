async function verifyQuiz(pool,quizId) {
  try {
      const query = 'SELECT id FROM quizzes WHERE id = $1';
      const { rows } = await pool.query(query, [quizId]);
      
      if (rows.length > 0) {
          console.log(`Quiz with ID ${quizId} exists.`);
          return true;
      } else {
          console.log(`Quiz with ID ${quizId} does not exist.`);
          return false;
      }
  } catch (error) {
      console.error('Error verifying quiz:', error);
      throw error;
  }
}

const validateAnswer = async (pool, quizId, answer) => {
  // For the sake of the example, we'll assume any answer is correct.
  return true;
};

async function updateScore(pool, userId, quizId) {
  try {

      // Check if the user exists
      const userExistsQuery = 'SELECT id FROM users WHERE id = $1';
      const userExistsResult = await pool.query(userExistsQuery, [userId]);

      if (userExistsResult.rows.length === 0) {
          // User doesn't exist, create a new user
          const createUserQuery = 'INSERT INTO users (id,username) VALUES ($1,$2)';
          await pool.query(createUserQuery, [userId,userId]);
      }
      const result = await pool.query(
          'INSERT INTO scores (user_id, quiz_id, score) VALUES ($1, $2, 1) ON CONFLICT (user_id,quiz_id) DO UPDATE SET score = scores.score + 1',
          [userId, quizId]
      );
      console.log('Score updated successfully');
      return result;
  } catch (error) {
      console.error('Error updating score:', error);
      throw error;
  }
}



module.exports = { verifyQuiz, validateAnswer, updateScore };
