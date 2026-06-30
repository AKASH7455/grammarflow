import { FiBookOpen, FiFlag } from "react-icons/fi";
import { useLanguage } from "../../hooks/useLanguage";

import "../../styles/notes.css";

function Notes({ data }) {
  const { language } = useLanguage();

  if (!data) return null;

  const content = data[language] || data.hinglish || data;

  const renderContent = (item, index) => {
    switch (item.type) {
      case "paragraph":
        return (
          <p key={index} className="notes-paragraph">
            {item.text}
          </p>
        );

      case "heading": {
        const HeadingTag = item.level || "h3";

        return (
          <HeadingTag
            key={index}
            className={`notes-subheading notes-subheading--${
              item.level || "h3"
            }`}
          >
            {item.text}
          </HeadingTag>
        );
      }

      case "list":
        return (
          <ol key={index} className="notes-list">
            {item.items?.map((listItem, listIndex) => (
              <li
                key={listIndex}
                className="notes-list-item"
              >
                {listItem}
              </li>
            ))}
          </ol>
        );

      case "example":
        return (
          <div
            key={index}
            className="notes-example"
          >
            <span className="notes-example-number">
              {index + 1}.
            </span>

            <span className="notes-example-text">
              {item.text}
            </span>
          </div>
        );

      case "important":
        return (
          <div
            key={index}
            className="notes-important"
          >
            <FiFlag className="notes-important-icon" />

            <div className="notes-important-content">
              <span className="notes-important-label">
                {language === "hindi"
                  ? "महत्वपूर्ण"
                  : "Important"}
              </span>

              <span className="notes-important-text">
                {item.text}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <article className="notes-article">

      {content.title && (
        <h1 className="notes-article-title">
          <FiBookOpen className="notes-title-icon" />
          {content.title}
        </h1>
      )}

      {content.sections?.map((section, index) => (
        <section
          key={index}
          className="notes-section"
        >

          {section.heading && (
            <h2 className="notes-section-heading">
              {section.heading}
            </h2>
          )}

          {section.content?.map(renderContent)}

        </section>
      ))}

      {content.examples?.length > 0 && (
        <section className="notes-section">

          <h2 className="notes-section-heading">
            Examples
          </h2>

          <ol className="notes-examples">

            {content.examples.map(
              (example, index) => (
                <li
                  key={index}
                  className="notes-example-item"
                >
                  {example}
                </li>
              )
            )}

          </ol>

        </section>
      )}

    </article>
  );
}

export default Notes;