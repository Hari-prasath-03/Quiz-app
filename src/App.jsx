import { useState, useEffect } from "react";
import questions from "./question.json";
import "./NewApp.css";
// import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  const [timer, setTimer] = useState(59);
  const [isStart, setisStart] = useState(false);
  const [isViewAnsOpen, setIsViewAnsOpen] = useState(false);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [isCorrectAns, setIsCorrectAns] = useState([]);

  const checkOption = (option) => {
    const newChosenAnswers = [...chosenAnswers, option];
    setChosenAnswers(newChosenAnswers);

    const isCorrect = (option === questions[currentQuestion].answer) 
    if(isCorrect){
      setScore(score + 1);
    }

    const newCorrectAnswers = [...isCorrectAns, isCorrect];
    setIsCorrectAns(newCorrectAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(59);
    } else {
      setDisplayScore(true);
    }
  };

  const restartQuix = () => {
    setCurrentQuestion(0);
    setScore(0);
    setDisplayScore(false);
    setTimer(59);
    setisStart(false);
    setIsViewAnsOpen(false);
    setChosenAnswers([]);
    setIsCorrectAns([]);
  };

  useEffect(() => {
    let timeIntervel;
    if (timer > 0 && !displayScore && isStart) {
      timeIntervel = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      clearInterval(timeIntervel);
      !isStart ? null : setDisplayScore(true);
    }
    return () => clearInterval(timeIntervel);
  }, [currentQuestion, timer, displayScore, isStart]);

  const handleViewAns = () => {
    setIsViewAnsOpen(!isViewAnsOpen);
  };

  return (
    <>
      <div className="body">
        <div className="app-container">
          {!isStart && (
            <div className="starting">
              <h2>Let&apos;s start the Quiz</h2>
              <button onClick={() => setisStart(!isStart)}>Start</button>
            </div>
          )}
          {displayScore && isStart && !isViewAnsOpen && (
            <div className="score-section">
              <h2>
                Your Score : {score}/{questions.length}
              </h2>
              <button onClick={restartQuix}>Restart</button>
              <button onClick={handleViewAns}>View answers</button>
            </div>
          )}
          {!displayScore && isStart && (
            <div className="question-section">
              <h2>Question {questions[currentQuestion].id}</h2>
              <p>{questions[currentQuestion].question}</p>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button onClick={() => checkOption(option)} key={index}>
                    {option}
                  </button>
                ))}
              </div>
              <div className="timer-section">
                Time left : <span>{timer}s</span>
              </div>
            </div>
          )}
          {isViewAnsOpen && (
            <div className="view-ans">
              <h2>Answers</h2>
              <ol>
                {questions.map((question, i) => (
                  <li key={i} className={isCorrectAns[i]?`correct-ans`:`wrong-ans`}>
                    <p>{question.question}</p>
                    <p>Correct Answer: {question.answer}</p>
                    <p>Your Answer: {chosenAnswers[i]}</p>
                  </li>
                ))}
              </ol>
              <div className="btn-group">
                <button onClick={restartQuix}>Restart</button>
                <button onClick={handleViewAns}>Close answers</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
