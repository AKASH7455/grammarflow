import "../../../styles/fillblank.css";

function FillBlank({
  sentence,
  userAnswer,
  onAnswer,
}) {
  const sentenceParts =
    sentence.split("______");

  return (
    <div className="fillblank-container">

      <p className="fillblank-sentence">
        {sentenceParts[0]}

        <span className="fillblank-blank">
          ______
        </span>

        {sentenceParts[1]}
      </p>

      <input
        type="text"
        value={userAnswer}
        className="fillblank-input"
        placeholder="Type your answer"
        onChange={(e) =>
          onAnswer(
            e.target.value
          )
        }
      />

    </div>
  );
}

export default FillBlank;
