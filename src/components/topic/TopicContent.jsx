function TopicContent({
  activeTab,
  data,
}) {
  if (!data) {
    return (
      <section className="topic-content">
        No Content Found
      </section>
    );
  }

  if (activeTab === "notes") {
    return (
      <section className="topic-content">
        <div className="topic-content__section">
          <h2>{data.title}</h2>

          <p>
            {data.definition}
          </p>

          <ul>
            {data.examples.map(
              (example) => (
                <li key={example}>
                  {example}
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    );
  }

  if (activeTab === "mcq") {
    return (
      <section className="topic-content">
        {data.map((question) => (
          <div
            key={question.id}
            className="topic-content__section"
          >
            <h3>
              {question.question}
            </h3>

            {question.options.map(
              (option) => (
                <p key={option}>
                  {option}
                </p>
              )
            )}
          </div>
        ))}
      </section>
    );
  }

  if (activeTab === "fill-blanks") {
    return (
      <section className="topic-content">
        {data.map((item) => (
          <div
            key={item.id}
            className="topic-content__section"
          >
            <p>
              {item.question}
            </p>
          </div>
        ))}
      </section>
    );
  }

  if (activeTab === "ai-practice") {
    return (
      <section className="topic-content">
        {data.map((item) => (
          <div
            key={item.id}
            className="topic-content__section"
          >
            <p>
              {item.prompt}
            </p>
          </div>
        ))}
      </section>
    );
  }

  return null;
}

export default TopicContent;