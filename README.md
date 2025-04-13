# Sentence-Construction-

# Sentence Construction Quiz

An interactive quiz application where users complete sentences by selecting the correct words to fill in blanks. Built with React, Vite, and Tailwind CSS.

## Features

- 30-second timer per question
- 10 different sentence completion challenges
- Immediate answer validation
- Detailed feedback after quiz completion
- Option to restart the quiz
- Fully responsive design

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Custom timer hook
- JavaScript ES6+

## project structure

sentence-construction/
├── src/
│   ├── components/
│   │   ├── BlankWord.jsx       # Blank word component
│   │   ├── ErrorBoundary.jsx   # Error boundary component
│   │   ├── FeedbackScreen.jsx  # Results screen
│   │   ├── QuestionCard.jsx    # Main quiz card
│   │   ├── Timer.jsx           # Timer component
│   │   └── WordOption.jsx      # Word option button
│   ├── data/
│   │   └── quizData.js         # Quiz questions data
│   ├── hooks/
│   │   └── useTimer.js         # Custom timer hook
│   ├── App.jsx                 # Main application
│   └── main.jsx                # Entry point
├── public/
├── package.json
└── README.md