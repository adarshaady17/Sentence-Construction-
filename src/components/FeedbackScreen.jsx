import React from 'react';

const FeedbackScreen = ({ questions = [], userAnswers = [], score = 0, onRestart }) => {
  // Calculate percentage score
  const percentage = Math.round((score / questions.length) * 100);
  
  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Not bad!";
    return "Keep practicing!";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Quiz Results</h2>
      
      {/* Score Summary */}
      <div className="text-center mb-8 p-6 bg-blue-50 rounded-lg">
        <div className="text-5xl font-bold text-blue-600 mb-2">
          {score}/{questions.length}
        </div>
        <div className="text-2xl mb-2">{percentage}%</div>
        <div className="text-xl font-semibold text-gray-700">
          {getPerformanceMessage()}
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index] || {};
          const isCorrect = userAnswer.isCorrect;
          
          return (
            <div 
              key={question.questionId} 
              className={`p-4 border rounded-lg ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="font-semibold mb-2">
                Question {index + 1}: {isCorrect ? "✓ Correct" : "✗ Incorrect"}
              </div>
              
              {/* Display the question with user answers */}
              <div className="mb-3">
                {question.question.split('_____________').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < question.correctAnswer.length && (
                      <span className={`inline-block mx-1 px-2 py-1 rounded ${
                        isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {userAnswer.answers?.[i] || '______'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Show correct answer if wrong */}
              {!isCorrect && (
                <div className="mt-3 p-3 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Correct answer:</div>
                  <div>
                    {question.question.split('_____________').map((part, i) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < question.correctAnswer.length && (
                          <span className="inline-block mx-1 px-2 py-1 rounded bg-green-100">
                            {question.correctAnswer[i]}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Restart Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;