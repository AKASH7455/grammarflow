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
        return null;

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

  const renderExamplesTable = (examples, key) => (
    <div className="notes-table-wrap" key={key}>
      <table className="notes-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{language === "hindi" ? "उदाहरण" : "Example"}</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((example, index) => (
            <tr key={index}>
              <td className="notes-table-number">{index + 1}</td>
              <td>{typeof example === "string" ? example : example.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSectionContent = (items = []) => {
    const output = [];
    for (let index = 0; index < items.length; index += 1) {
      if (items[index].type !== "example") {
        output.push(renderContent(items[index], index));
        continue;
      }

      const examples = [];
      while (index < items.length && items[index].type === "example") {
        examples.push(items[index]);
        index += 1;
      }
      index -= 1;
      output.push(renderExamplesTable(examples, `examples-${index}`));
    }
    return output;
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

          {renderSectionContent(section.content)}

        </section>
      ))}

      {content.examples?.length > 0 && (
        <section className="notes-section">

          <h2 className="notes-section-heading">
            Examples
          </h2>

          {renderExamplesTable(content.examples, "top-level-examples")}

        </section>
      )}

    </article>
  );
}

export default Notes;
