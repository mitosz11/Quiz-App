export default function Endscreen({ restartGame, percentage }) {
  let message = "Congratulations!";
  let color = "bg-green-500";

  if (percentage < 50) {
    message = "You can do better!";
    color = "bg-red-500"; 
  } else if (percentage < 75) {
    message = "Not bad!";
    color = "bg-yellow-500";
  }

  return (
    <div className="bg-gray-500 shadow-lg rounded-lg p-6 text-center">
      <div className="text-2xl font-semibold mb-4">Quiz Completed</div>
      <div className={`text-white text-xl py-2 px-4 rounded mb-4 ${color}`}>
        {message}
      </div>
      <h3 className="text-2xl mb-6">Your final score: {percentage}%</h3>
      <button
        className={`py-2 px-4 text-white rounded ${color} hover:opacity-80 transition`}
        onClick={restartGame}
      >
        Restart Quiz
      </button>
    </div>
  );
}
