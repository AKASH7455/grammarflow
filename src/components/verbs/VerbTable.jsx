import { useContext } from "react";
import { LanguageContext } from "../../context/AppContexts";

function VerbTable({ verbs }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="verb-table-container">
      <table className="verb-table">
        <thead className="verb-table__head">
          <tr className="verb-table__row">
            <th className="verb-table__header">#</th>
            <th className="verb-table__header">V1</th>
            <th className="verb-table__header">V2</th>
            <th className="verb-table__header">V3</th>
            <th className="verb-table__header">Meaning</th>
          </tr>
        </thead>
        <tbody className="verb-table__body">
          {verbs.map((verb, index) => (
            <tr key={verb.id} className="verb-table__row">
              <td className="verb-table__cell" data-label="#">{index + 1}</td>
              <td className="verb-table__cell" data-label="V1">{verb.v1}</td>
              <td className="verb-table__cell" data-label="V2">{verb.v2}</td>
              <td className="verb-table__cell" data-label="V3">{verb.v3}</td>
              <td className="verb-table__cell" data-label="Meaning">
                {verb.meaning[language] || verb.meaning.hinglish}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerbTable;
