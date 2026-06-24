import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, } from "react-icons/fi";

import VerbSearch from "../components/verbs/VerbSearch";
import VerbFilter from "../components/verbs/VerbFilter";
import VerbTable from "../components/verbs/VerbTable";
import VerbCard from "../components/verbs/VerbCard";
import EmptyState from "../components/verbs/EmptyState";
import verbService from "../services/verbService";

import "../styles/verbforms.css";

function VerbSetDetail() {
const { setName } = useParams();
const navigate = useNavigate();

const [searchTerm, setSearchTerm] = useState("");
const [activeFilter, setActiveFilter] = useState("all");
const [viewMode, setViewMode] = useState("table");

const setTitles = {
daily: "Daily Verbs",
set1: "Verb Set 1",
set2: "Verb Set 2",
set3: "Verb Set 3",
set4: "Verb Set 4",
set5: "Verb Set 5",
all: "All Verbs",
};

const filters = [
{ label: "All", value: "all" },
{ label: "Regular", value: "regular" },
{ label: "Irregular", value: "irregular" },
{ label: "Daily", value: "daily" },
{ label: "Most Used", value: "most-used" },
];

const verbs = verbService.getVerbsBySet(setName);

const filteredVerbs = verbService.filterVerbs(
activeFilter,
verbs
);

const searchedVerbs = verbService.searchVerbs(
searchTerm,
filteredVerbs
);

return ( <main className="verb-set-detail-page">

  <section className="verb-set-header">

  <button
    className="verb-set-header__back-btn"
    onClick={() => navigate("/verbs")}
  >
    <FiArrowLeft />
  </button>

  <h1 className="verb-set-header__title">
    {setTitles[setName] || "Verb Forms"}
  </h1>

</section>

  <section className="verb-toolbar">

    <VerbSearch
      value={searchTerm}
      onSearch={setSearchTerm}
      viewMode={viewMode}
      onViewChange={setViewMode}
    >
      <VerbFilter
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </VerbSearch>

  </section>

  <section className="verb-set-detail-page__content">

    {searchedVerbs.length === 0 ? (
      <EmptyState
        message="No verbs match your search"
      />
    ) : viewMode === "table" ? (
      <VerbTable verbs={searchedVerbs} />
    ) : (
      <div className="verb-cards-grid">
        {searchedVerbs.map((verb) => (
          <VerbCard
            key={verb.id}
            verb={verb}
          />
        ))}
      </div>
    )}

  </section>

</main>

);
}

export default VerbSetDetail;
