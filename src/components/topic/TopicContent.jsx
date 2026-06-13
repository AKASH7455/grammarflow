function TopicContent({
  activeTab,
  data,
}) {
  if (!data) {
    return (
      <div className="empty-state">
        No Content Available
      </div>
    );
  }

  switch (activeTab) {
    case "notes":
      return (
        <div className="learning-content">
          {data.title && (
            <h2 className="learning-title">
              {data.title}
            </h2>
          )}

          {data.definition && (
            <div className="learning-section">
              <h3>Definition</h3>
              <p>{data.definition}</p>
            </div>
          )}

          {data.content && Array.isArray(data.content) && (
            <div className="learning-section">
              <h3>Content</h3>
              {data.content.map((item) => (
                <div
                  key={item.id}
                  className="learning-item"
                >
                  {item.heading && (
                    <h4>{item.heading}</h4>
                  )}
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {data.examples && Array.isArray(data.examples) && (
            <div className="learning-section">
              <h3>Examples</h3>
              <ul>
                {data.examples.map((example, index) => (
                  <li key={index}>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case "mcq":
      return (
        <div className="practice-list">
          {Array.isArray(data) ? data.map((item, index) => (
            <div
              key={item.id || index}
              className="practice-card"
            >
              <h3>
                {item.question}
              </h3>

              <div className="options">
                {item.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`option ${
                      option === item.answer
                        ? "correct"
                        : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <p className="answer">
                Correct Answer: {item.answer}
              </p>
            </div>
          )) : <div className="empty-state">No MCQ data available</div>}
        </div>
      );

    case "fill-blanks":
      return (
        <div className="practice-list">
          {Array.isArray(data) ? data.map((item, index) => (
            <div
              key={item.id || index}
              className="practice-card"
            >
              <h3>
                {item.question}
              </h3>

              <p className="answer">
                Answer: {item.answer}
              </p>
            </div>
          )) : <div className="empty-state">No fill-in-the-blank data available</div>}
        </div>
      );

    case "translation":
      return (
        <div className="practice-list">
          {Array.isArray(data) ? data.map((item, index) => (
            <div
              key={item.id || index}
              className="practice-card"
            >
              <h3>
                {item.question}
              </h3>

              <p>
                Answer:
                {" "}
                {item.answer}
              </p>
            </div>
          )) : <div className="empty-state">No translation data available</div>}
        </div>
      );

    case "sentenceCorrection":
      return (
        <div className="practice-list">
          {Array.isArray(data) ? data.map((item, index) => (
            <div
              key={item.id || index}
              className="practice-card"
            >
              <p>
                {item.incorrect}
              </p>

              <p>
                Correct:
                {" "}
                {item.correct}
              </p>
            </div>
          )) : <div className="empty-state">No sentence correction data available</div>}
        </div>
      );

    default:
      return (
        <div className="empty-state">
          Content Not Found
        </div>
      );
  }
}

export default TopicContent;