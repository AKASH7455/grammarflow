import allVerbs from "../data/verbs";

class VerbFormService {
  constructor() {
    this.verbs = allVerbs;
  }

  getAllVerbs() {
    return this.verbs;
  }

  getVerbById(id) {
    return this.verbs.find((verb) => verb.id === id);
  }

  searchVerbs(query) {
    if (!query || query.trim() === "") {
      return this.verbs;
    }

    const searchTerm = query.toLowerCase().trim();

    return this.verbs.filter(
      (verb) =>
        verb.v1.toLowerCase().includes(searchTerm) ||
        verb.v2.toLowerCase().includes(searchTerm) ||
        verb.v3.toLowerCase().includes(searchTerm) ||
        verb.meaning.hinglish.toLowerCase().includes(searchTerm) ||
        verb.meaning.hindi.toLowerCase().includes(searchTerm)
    );
  }

  getVerbsBySet(setNumber) {
    const setSizes = [15, 15, 15];
    const startIndex = setNumber === 1 ? 0 : setNumber === 2 ? 15 : 30;
    const endIndex = startIndex + setSizes[setNumber - 1];
    return this.verbs.slice(startIndex, endIndex);
  }

  getRandomVerbs(count = 10) {
    const shuffled = [...this.verbs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  validateVerbForm(verbId, formType, answer) {
    const verb = this.getVerbById(verbId);
    if (!verb) return { correct: false, correctAnswer: "" };

    const correctAnswer = verb[formType];
    const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();

    return {
      correct: isCorrect,
      correctAnswer,
    };
  }
}

const verbFormService = new VerbFormService();

export default verbFormService;
