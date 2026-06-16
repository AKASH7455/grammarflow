import {
  FiBookOpen,
  FiCheckCircle,
  FiZap,
  FiFlag,
  FiHash,
  FiAward,
} from "react-icons/fi";

import "../../styles/notes.css";

function Notes({ data }) {
  if (!data) return null;

  return (
    <article className="notes-article">
      {data.title && (
        <h1 className="notes-article-title">
          <FiBookOpen className="notes-title-icon" />
          {data.title}
        </h1>
      )}

      {data.sections?.map((section, index) => (
        <section key={index} className="notes-section">
          {section.heading && (
            <h2 className="notes-section-heading">
              {section.heading}
            </h2>
          )}

          {section.content?.map((item, itemIndex) => {
            if (item.type === "paragraph") {
              return (
                <p
                  key={itemIndex}
                  className="notes-paragraph"
                >
                  {item.text}
                </p>
              );
            }

            if (item.type === "heading") {
              const HeadingTag = item.level || "h3";

              return (
                <div
                  key={itemIndex}
                  className="notes-heading-wrapper"
                >
                  <FiHash className="notes-heading-icon" />

                  <HeadingTag
                    className={`notes-subheading notes-subheading--${
                      item.level || "h3"
                    }`}
                  >
                    {item.text}
                  </HeadingTag>
                </div>
              );
            }

            if (item.type === "list") {
              return (
                <ul
                  key={itemIndex}
                  className="notes-list"
                >
                  {item.items?.map((listItem, listIndex) => (
                    <li
                      key={listIndex}
                      className="notes-list-item"
                    >
                      <FiCheckCircle className="notes-list-icon" />

                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (item.type === "example") {
              return (
                <div
                  key={itemIndex}
                  className="notes-example"
                >
                  <FiZap className="notes-example-icon" />

                  <div className="notes-example-content">
                    <span className="notes-example-label">
                      Example:
                    </span>

                    <span className="notes-example-text">
                      {item.text}
                    </span>
                  </div>
                </div>
              );
            }

            if (item.type === "important") {
              return (
                <div
                  key={itemIndex}
                  className="notes-important"
                >
                  <FiFlag className="notes-important-icon" />

                  <div className="notes-important-content">
                    <span className="notes-important-label">
                      Important:
                    </span>

                    <span className="notes-important-text">
                      {item.text}
                    </span>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </section>
      ))}

      {data.examples?.length > 0 && (
        <section className="notes-section">
          <h2 className="notes-section-heading">
            Examples
          </h2>

          <div className="notes-examples">
            {data.examples.map((example, index) => (
              <div
                key={index}
                className="notes-example-item"
              >
                <FiAward className="notes-example-item-icon" />

                <span>{example}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default Notes;