import "../../../styles/fillblank.css";

function FillBlank({
  sentence,
  userAnswer,
  onAnswer,
  hintOptions = [],
}) {
  const [beforeBlank = "", afterBlank = ""] =
    sentence.split("______");

  return (
    <div className="fillblank-container">

      <div className="fillblank-question-card">
        <p className="fillblank-sentence">

          {beforeBlank}

          <span className="fillblank-blank">
            {userAnswer}
          </span>

          {afterBlank}

        </p>
      </div>

      {hintOptions.length > 0 && (
        <div className="fillblank-hint-section">

          <p className="fillblank-hint-title">
            Hint Words
          </p>

          <div className="fillblank-hints">
            {hintOptions.map((option, index) => (
              <span
                key={index}
                className="fillblank-hint-chip"
              >
                {option}
              </span>
            ))}
          </div>

        </div>
      )}

      <div className="fillblank-input-section">

        <input
          type="text"
          value={userAnswer}
          placeholder="Type your answer..."
          className="fillblank-input"
          onChange={(e) => onAnswer(e.target.value)}
        />

      </div>

    </div>
  );
}

export default FillBlank;