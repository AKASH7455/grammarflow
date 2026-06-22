export { saveVerbResult as saveVerb } from "./grammarFlowStorage";

import { dailyVerbs, set1, set2, set3, set4, set5, allVerbs } from "../data/verbs";

class VerbService {
  constructor() {
    this.verbSets = {
      daily: dailyVerbs,
      set1,
      set2,
      set3,
      set4,
      set5,
      all: allVerbs
    };
  }

  getVerbsBySet(setName) {
    return this.verbSets[setName] || [];
  }

  getAllVerbs() {
    return allVerbs;
  }

  getDailyVerbs() {
    return dailyVerbs;
  }

  searchVerbs(query, verbs = allVerbs) {
    if (!query || query.trim() === "") {
      return verbs;
    }

    const searchTerm = query.toLowerCase().trim();
    return verbs.filter(
      (verb) =>
        verb.v1.toLowerCase().includes(searchTerm) ||
        verb.v2.toLowerCase().includes(searchTerm) ||
        verb.v3.toLowerCase().includes(searchTerm) ||
        verb.meaning.hinglish.toLowerCase().includes(searchTerm) ||
        verb.meaning.hindi.toLowerCase().includes(searchTerm)
    );
  }

  filterVerbs(filter, verbs = allVerbs) {
    switch (filter) {
      case "regular":
        return verbs.filter((verb) => verb.type === "regular");
      case "irregular":
        return verbs.filter((verb) => verb.type === "irregular");
      case "daily":
        return verbs.filter((verb) => verb.category === "daily");
      case "most-used":
        return verbs.slice(0, 20);
      default:
        return verbs;
    }
  }

  getVerbById(id) {
    return allVerbs.find((verb) => verb.id === id);
  }
}

const verbService = new VerbService();

export default verbService;
