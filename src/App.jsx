import quizData from "./constans/quizData";
import { useState } from "react";
import Endscreen from "./components/Endscreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let limit = 10;
let points = 0;

quizData.sort(() => Math.random() - 0.5);
quizData.forEach((quiz) => quiz.options.sort(() => Math.random() - 0.5));

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const progress = ((currentQuestionIndex + 1) / limit) * 100;
  const currentQuestion = quizData[currentQuestionIndex];

  function handleNextQuestion() {
    if (!currentAnswer) {
      toast.error("Please select an answer!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (currentQuestion.correctAnswer === currentAnswer) points++;
    if (limit === currentQuestionIndex + 1) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setCurrentAnswer("");
  }

  function restartGame() {
    setCurrentQuestionIndex(0);
    quizData.sort(() => Math.random() - 0.5);
    quizData.forEach((quiz) => quiz.options.sort(() => Math.random() - 0.5));
    setIsFinished(false);
    points = 0;
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl py-4 uppercase">
        My Quiz-App
      </h1>
      <div className="container mx-auto p-4">
        {isFinished ? (
          <Endscreen
            restartGame={restartGame}
            percentage={(points / limit) * 100}
          />
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <div className="text-lg font-semibold">
                Question Category: {currentQuestion.category}
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
                <div className="text-sm text-center mt-2">
                  {currentQuestionIndex + 1} / {limit}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="mb-4">{currentQuestion.question}</p>
              {currentQuestion.options.map((option) => (
                <label
                  key={option}
                  className={`block mb-3 py-2 px-4 border rounded cursor-pointer text-center ${
                    option === currentAnswer
                      ? "bg-blue-500 text-white"
                      : "bg-white border-blue-500"
                  }`}
                  onClick={() => setCurrentAnswer(option)}
                >
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleNextQuestion()}
              >
                Next Question
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
