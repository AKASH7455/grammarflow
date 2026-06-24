import { useContext } from "react";
import { LanguageContext } from "../../context/AppContexts";

function VerbCard({ verb }) {
  const { language } = useContext(LanguageContext);

  const meaning =
    verb?.meaning?.[language] ||
    verb?.meaning?.hinglish ||
    "";

  const exampleEnglish =
    verb?.sentence?.english ||
    "Example not available";

  const exampleTranslation =
    verb?.sentence?.[language] ||
    verb?.sentence?.hinglish ||
    "";

  return (
    <article className="verb-card">

      <div className="verb-card__header">
        <h3 className="verb-card__v1">
          {verb.v1}
        </h3>
      </div>

      <div className="verb-card__body">

        <div className="verb-card__form">
          <span className="verb-card__label">
            V2
          </span>

          <span className="verb-card__value">
            {verb.v2}
          </span>
        </div>

        <div className="verb-card__form">
          <span className="verb-card__label">
            V3
          </span>

          <span className="verb-card__value">
            {verb.v3}
          </span>
        </div>

      </div>

      <div className="verb-card__footer">

        <div className="verb-card__meaning-box">
          <span className="verb-card__meaning-label">
            Meaning
          </span>

          <span className="verb-card__meaning">
            {meaning}
          </span>
        </div>

        <div className="verb-card__example">

          <span className="verb-card__example-label">
            Example
          </span>

          <p className="verb-card__example-en">
            {exampleEnglish}
          </p>

          <p className="verb-card__example-translation">
            {exampleTranslation}
          </p>

        </div>

      </div>

    </article>
  );
}

export default VerbCard;