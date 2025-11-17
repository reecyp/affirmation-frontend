import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Your Perception Is Your Reality</h1>
        <p className="tagline">
          Take control of your beliefs. Shape your future.
        </p>
      </div>

      <div className="content-section">
        <div className="belief-section">
          <h2>The Power of Belief</h2>
          <p>
            I'm a firm believer that your perception of reality <em>is</em> your reality.
            Sometimes you don't have control over what happens in your life, but you 
            <strong> always have control</strong> over how you perceive these things.
          </p>
          <p>
            It's similar to the idea of the cup being half full or half empty. 
            What if you could train your mind to always see the cup half full?
          </p>
        </div>

        <div className="training-section">
          <h2>How Do You Train Your Mind?</h2>
          <p>Through your <strong>thoughts</strong> and <strong>actions</strong>.</p>
          <p>
            Everything you think and do reaffirms beliefs which ultimately dictates what you do.
            Every time you think "I am not good at talking to strangers," you strengthen that belief.
          </p>
          <p>
            So when you're put in a situation where you have the opportunity to talk to strangers,
            you fall back on your beliefs. And what do your beliefs say? "I am not good at talking 
            to strangers." That ultimately dictates what you do in the situation.
          </p>
        </div>

        <div className="solution-section">
          <h2>Breaking The Negative Feedback Loop</h2>
          <p>
            You break this cycle through <strong>thoughts and actions</strong>. Not only do you 
            reaffirm in your mind that you are the type of person that will talk to strangers, 
            but you also <strong>take action</strong> to confirm your thoughts.
          </p>
        </div>

        <div className="purpose-section">
          <h2>How This Site Works</h2>
          <p>
            Create as many affirmations as you want, and each day <strong>3 get randomly selected</strong>.
          </p>
          <p>
            Your goal is to think each affirmation <strong>20 times</strong> throughout the day, 
            along with doing an <strong>action that confirms the affirmation</strong>.
          </p>
          <div className="tips-box">
            <h3>Tips for Success</h3>
            <ul>
              <li>Spread your thoughts throughout the day (don't rush them)</li>
              <li>Start affirmations with "I am" or "I do" to tie them to your identity</li>
              <li>Keep around <strong>8-9 affirmations max</strong> so you can consistently reaffirm them</li>
              <li>Sample affirmations are available once you login for inspiration</li>
            </ul>
          </div>
        </div>

        <div className="note-section">
          <p>
            <em>Note: The website might be a little clunky, please bear with it. If you're on iPhone, 
            you should be able to continuously access the main page as long as you don't swipe up 
            your browser.</em>
          </p>
        </div>

        <div className="closing-section">
          <h2>Take Control</h2>
          <p>
            Originally, I was planning on making this site just for myself, but I figured that 
            if this could help others, then that would be amazing.
          </p>
          <p className="final-message">
            Since birth you have been letting your beliefs determine the course of your life 
            without even knowing. I think it's about time to <strong>get out of the passenger seat</strong>.
          </p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Begin Your Journey</h2>
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
