import { useContext } from "react";
import { LanguageContext } from "../../context/AppContexts";

function VerbCard({ verb }) {
  const { language } = useContext(LanguageContext);
  const meaning = verb.meaning[language] || verb.meaning.hinglish;

  return (
    <div className="verb-card">
      <div className="verb-card__header">
        <h3 className="verb-card__v1">{verb.v1}</h3>
      </div>
      <div className="verb-card__body">
        <div className="verb-card__form">
          <span className="verb-card__label">V2:</span>
          <span className="verb-card__value">{verb.v2}</span>
        </div>
        <div className="verb-card__form">
          <span className="verb-card__label">V3:</span>
          <span className="verb-card__value">{verb.v3}</span>
        </div>
      </div>
      <div className="verb-card__footer">
        <span className="verb-card__meaning-label">Meaning:</span>
        <span className="verb-card__meaning">{meaning}</span>
      </div>
    </div>
  );
}

export default VerbCard;
