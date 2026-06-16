import "../../../styles/fillblank.css";

function FillBlank({
  sentence,
  userAnswer,
  onAnswer,
  hintOptions = [],
}) {
  const sentenceParts =
    sentence.split("______");

  return (
    <div className="fillblank-container">
      <div className="fillblank-question-card">
        <p className="fillblank-sentence">
          {sentenceParts[0]}

          <span className="fillblank-blank">
            {userAnswer || "______"}
          </span>

          {sentenceParts[1]}
        </p>
      </div>

      <div className="fillblank-input-wrapper">
        <input
          type="text"
          value={userAnswer}
          placeholder="Type your answer..."
          className="fillblank-input"
          onChange={(e) =>
            onAnswer(e.target.value)
          }
        />
      </div>

      {hintOptions.length > 0 && (
        <div className="fillblank-hint-section">
          <h4 className="fillblank-hint-title">
            Hint Words
          </h4>

          <div className="fillblank-hints">
            {hintOptions.map(
              (option, index) => (
                <span
                  key={index}
                  className="fillblank-hint-chip"
                >
                  {option}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FillBlank;