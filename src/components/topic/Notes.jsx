import "../../styles/notes.css";

function Notes({ data }) {
  return (
    <div className="notes-container">
      {data.title && (
        <div className="section-card">
          <h2 className="notes-title">{data.title}</h2>
        </div>
      )}

      {data.definition && (
        <div className="section-card">
          <h3 className="notes-heading">Definition</h3>
          <p className="notes-text">{data.definition}</p>
        </div>
      )}

      {data.content?.length > 0 && (
        <div className="section-card">
          <h3 className="notes-heading">Key Points</h3>
          <div className="notes-content-list">
            {data.content.map((item) => (
              <div key={item.id} className="notes-content-item">
                <h4 className="notes-item-heading">{item.heading}</h4>
                <p className="notes-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.examples?.length > 0 && (
        <div className="section-card">
          <h3 className="notes-heading">Examples</h3>
          <div className="examples-chips">
            {data.examples.map((example, index) => (
              <span key={index} className="example-chip">
                {example}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
