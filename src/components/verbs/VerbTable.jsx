import { useContext } from "react";
import { LanguageContext } from "../../context/AppContexts";

function VerbTable({ verbs = [] }) {
  const { language } = useContext(LanguageContext);

  if (!verbs.length) {
    return (
      <div className="verb-table-empty">
        No verbs found.
      </div>
    );
  }

  return (
    <div className="verb-table-container">
      <table className="verb-table">
        <thead className="verb-table__head">
          <tr>
            <th>#</th>
            <th>V1</th>
            <th>V2</th>
            <th>V3</th>
            <th>Meaning</th>
          </tr>
        </thead>

        <tbody className="verb-table__body">
          {verbs.map((verb, index) => {
            const meaning =
              verb?.meaning?.[language] ||
              verb?.meaning?.hinglish ||
              "-";

            return (
              <tr
                key={verb.id || `${verb.v1}-${index}`}
                className="verb-table__row"
              >
                <td className="verb-table__cell verb-table__number">
                  {index + 1}
                </td>

                <td className="verb-table__cell">
                  <strong>{verb.v1 || "-"}</strong>
                </td>

                <td className="verb-table__cell">
                  {verb.v2 || "-"}
                </td>

                <td className="verb-table__cell">
                  {verb.v3 || "-"}
                </td>

                <td className="verb-table__cell verb-table__meaning">
                  {meaning}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default VerbTable;