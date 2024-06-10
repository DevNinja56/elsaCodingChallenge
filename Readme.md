Real-Time Quiz System
The Real-Time Quiz System is a web-based application that allows users to participate in quizzes, compete with others, and see live updates of their scores on a leaderboard. This project provides both the backend server and frontend client components necessary to implement the real-time quiz feature.

Features
User participation: Users can join quiz sessions using a unique quiz ID.
Real-time score updates: Scores are updated in real-time as users submit answers.
Real-time leaderboard: A leaderboard displays the current standings of all participants.
Technologies Used
Backend:

Node.js: JavaScript runtime environment for the server-side application.
Express.js: Web application framework for building APIs.
PostgreSQL: Relational database management system for storing quiz data.
Socket.IO: Library for real-time bidirectional event-based communication.
Frontend:

HTML/CSS/JavaScript: Frontend development languages.
React.js: JavaScript library for building user interfaces.
Socket.IO Client: Library for real-time communication between the client and server.


Usage
Joining a Quiz:
Users can join a quiz session by entering a unique quiz ID.
Answering Questions:
Once joined, users can submit answers to quiz questions in real-time.
Viewing Leaderboard:
Users can view the live leaderboard to see their scores and rankings compared to other participants.


Database Schema
The Real-Time Quiz System uses the following PostgreSQL tables:

users:

id: UUID (Primary Key)
origin: VARCHAR (Origin of the user)
quizzes:

id: UUID (Primary Key)
name: VARCHAR (Name of the quiz)
questions:

id: UUID (Primary Key)
quiz_id: UUID (Foreign Key referencing quizzes.id)
question_text: TEXT (Text of the question)
answers:

id: UUID (Primary Key)
question_id: UUID (Foreign Key referencing questions.id)
answer_text: TEXT (Text of the answer)
is_correct: BOOLEAN (Indicates whether the answer is correct)
scores:

id: UUID (Primary Key)
user_id: UUID (Foreign Key referencing users.id)
quiz_id: UUID (Foreign Key referencing quizzes.id)
score: INTEGER (Score of the user in the quiz)
