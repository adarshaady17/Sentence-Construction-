import { useState, useEffect, useCallback, useRef } from 'react';
import { quizData } from './data/quizData';
import useTimer from './hooks/useTimer';
import QuestionCard from './components/QuestionCard';
import FeedbackScreen from './components/FeedbackScreen';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const resetTimerRef = useRef();

  const handleNextQuestion = useCallback(() => {
    // Ensure we have questions and current question exists
    if (!questions.length || currentQuestionIndex >= questions.length) {
      setQuizCompleted(true);
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion?.correctAnswer || [];
    const isCorrect = correctAnswer.length > 0 && 
                      selectedWords.length === correctAnswer.length &&
                      correctAnswer.every((word, index) => selectedWords[index] === word);

    // Save user answer
    setUserAnswers(prev => [...prev, {
      questionId: currentQuestion.questionId,
      answers: [...selectedWords],
      isCorrect
    }]);

    // Update score if correct
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedWords([]);
      resetTimerRef.current?.();
    } else {
      setQuizCompleted(true);
    }
  }, [questions, currentQuestionIndex, selectedWords]);

  const { timeLeft, resetTimer } = useTimer(30, handleNextQuestion);
  
  useEffect(() => {
    resetTimerRef.current = resetTimer;
  }, [resetTimer]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setQuestions(quizData.data?.questions || []);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleWordSelect = (word, index) => {
    const newSelectedWords = [...selectedWords];
    const insertIndex = index >= newSelectedWords.length ? newSelectedWords.length : index;
    newSelectedWords[insertIndex] = word;
    setSelectedWords(newSelectedWords.filter(word => word !== ''));
  };

  const handleWordRemove = (index) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords[index] = '';
    setSelectedWords(newSelectedWords.filter(word => word !== ''));
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedWords([]);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    resetTimer();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl animate-pulse">Loading questions...</div>
      </div>
    );
  }

  // Render feedback screen when quiz is completed
  if (quizCompleted || !questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <FeedbackScreen
          questions={questions}
          userAnswers={userAnswers}
          score={score}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // Get current question with fallback
  const currentQuestion = questions[currentQuestionIndex] || {};
  const correctAnswer = currentQuestion.correctAnswer || [];

  // Render quiz interface
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Sentence Construction</h1>
          <div className="text-gray-600">
            Question {currentQuestionIndex +1} of {questions.length}
          </div>
        </div>

        {currentQuestion.question && (
          <QuestionCard
            question={currentQuestion}
            selectedWords={selectedWords}
            onWordSelect={handleWordSelect}
            onWordRemove={handleWordRemove}
            timeLeft={timeLeft}
          />
        )}
        
        <div className="mt-6 text-center">
          <button
            onClick={handleNextQuestion}
            disabled={selectedWords.length !== correctAnswer.length}
            className={`px-6 py-2 rounded-md transition-colors ${
              selectedWords.length === correctAnswer.length
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;