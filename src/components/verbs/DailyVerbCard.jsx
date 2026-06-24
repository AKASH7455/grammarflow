import { useContext } from "react";
import { LanguageContext } from "../../context/AppContexts";

function DailyVerbCard({ verb }) {
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
    <article className="daily-verb-card">

      <div className="daily-verb-card__badge">
        Daily Verb
      </div>

      <div className="daily-verb-card__content">

        <h3 className="daily-verb-card__v1">
          {verb.v1}
        </h3>

        <div className="daily-verb-card__forms">

          <div className="daily-verb-card__form">
            <span className="daily-verb-card__label">
              V2
            </span>

            <span className="daily-verb-card__value">
              {verb.v2}
            </span>
          </div>

          <div className="daily-verb-card__form">
            <span className="daily-verb-card__label">
              V3
            </span>

            <span className="daily-verb-card__value">
              {verb.v3}
            </span>
          </div>

        </div>

        <div className="daily-verb-card__meaning">

          <span className="daily-verb-card__meaning-label">
            Meaning
          </span>

          <span className="daily-verb-card__meaning-value">
            {meaning}
          </span>

        </div>

        <div className="daily-verb-card__example">

          <span className="daily-verb-card__example-label">
            Example
          </span>

          <p className="daily-verb-card__example-en">
            {exampleEnglish}
          </p>

          <p className="daily-verb-card__example-translation">
            {exampleTranslation}
          </p>

        </div>

      </div>

    </article>
  );
}

export default DailyVerbCard;