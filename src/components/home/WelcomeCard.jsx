import "../../styles/welcomecard.css";

import grammarHero from "../../assets/images/grammar-hero.png";

function WelcomeCard() {
  return (
    <section className="welcome-card">
      <div className="welcome-content">
       

        <h1 className="welcome-title">
          GrammarFlow
        </h1>

        <p className="welcome-text">
          Master English Grammar with daily
          practice, quizzes and exercises.
        </p>

      </div>

      <div className="welcome-image">
        <img
          src={grammarHero}
          alt="Grammar Learning"
        />
      </div>
    </section>
  );
}

export default WelcomeCard;