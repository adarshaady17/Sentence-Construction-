import React from 'react';
import BlankWord from './BlankWord';
import WordOption from './WordOption';
import Timer from './Timer';

const QuestionCard = ({
  question = {},
  selectedWords = [],
  onWordSelect = () => {},
  onWordRemove = () => {},
  timeLeft = 30,
  showResult = false
}) => {
  if (!question.question) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <div className="text-red-500">Question data is incomplete</div>
      </div>
    );
  }

  const questionParts = question.question.split('_____________');
  const blankCount = questionParts.length - 1;
  const options = question.options || [];
  const correctAnswer = question.correctAnswer || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <Timer timeLeft={timeLeft} />
      
      <div className="mb-6 text-lg">
        {questionParts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < blankCount && (
              <BlankWord
                word={selectedWords[index]}
                onClick={() => onWordRemove(index)}
                isCorrect={showResult ? selectedWords[index] === correctAnswer[index] : undefined}
                showResult={showResult}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {options.map((word, idx) => {
          const usedIndex = selectedWords.indexOf(word);
          return (
            <WordOption
              key={`${word}-${idx}`}
              word={word}
              onClick={() => {
                const nextBlankIndex = selectedWords.findIndex(w => !w);
                onWordSelect(word, nextBlankIndex !== -1 ? nextBlankIndex : selectedWords.length);
              }}
              disabled={usedIndex !== -1}
              used={usedIndex !== -1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;