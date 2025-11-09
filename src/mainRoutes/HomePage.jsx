import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Transform Your Reality</h1>
        <p className="mission-statement">
          Harness the power of daily affirmations to reshape your mindset,
          manifest your desires, and create the reality you envision.
          Every thought is a seed of transformation.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>Daily Practice</h3>
          <p>Start each day with powerful, personalized affirmations</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Manifest Goals</h3>
          <p>Transform intentions into reality through focused practice</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌱</div>
          <h3>Track Growth</h3>
          <p>Watch your mindset evolve as you build positive habits</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Begin Your Journey</h2>
        <p>Join us in creating a more empowered version of yourself.</p>
        <div className="cta-buttons">
          <Link to="/login" className="cta-button login">
            Login
          </Link>
          <Link to="/sign-up" className="cta-button signup">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
