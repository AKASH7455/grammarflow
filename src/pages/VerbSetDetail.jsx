import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import VerbSearch from "../components/verbs/VerbSearch";
import VerbFilter from "../components/verbs/VerbFilter";
import ViewToggle from "../components/verbs/ViewToggle";
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
    all: "All Verbs"
  };

  const filters = [
    { label: "All", value: "all" },
    { label: "Regular", value: "regular" },
    { label: "Irregular", value: "irregular" },
    { label: "Daily", value: "daily" },
    { label: "Most Used", value: "most-used" }
  ];

  const verbs = verbService.getVerbsBySet(setName);
  const filteredVerbs = verbService.filterVerbs(activeFilter, verbs);
  const searchedVerbs = verbService.searchVerbs(searchTerm, filteredVerbs);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <main className="verb-set-detail-page">
      <section className="verb-set-detail-page__header">
        <button
          className="verb-set-detail-page__back"
          onClick={() => navigate("/verbs")}
        >
          <FiArrowLeft />
          <span>Back</span>
        </button>

        <h1 className="verb-set-detail-page__title">{setTitles[setName] || "Verb Forms"}</h1>
      </section>

      <section className="verb-set-detail-page__controls">
        <VerbSearch onSearch={handleSearch} placeholder="Search verbs..." />
        
        <div className="verb-set-detail-page__actions">
          <VerbFilter
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />
        </div>
      </section>

      <section className="verb-set-detail-page__content">
        {searchedVerbs.length === 0 ? (
          <EmptyState message="No verbs match your search or filter" />
        ) : viewMode === "table" ? (
          <VerbTable verbs={searchedVerbs} />
        ) : (
          <div className="verb-cards-grid">
            {searchedVerbs.map((verb) => (
              <VerbCard key={verb.id} verb={verb} />
            ))}
          </div>
        )}
      </section>

      <section className="verb-set-detail-page__stats">
        <span className="verb-set-detail-page__count">
          Showing {searchedVerbs.length} of {verbs.length} verbs
        </span>
      </section>
    </main>
  );
}

export default VerbSetDetail;
