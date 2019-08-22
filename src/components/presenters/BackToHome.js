import React from "react";

class BackToHome extends React.Component {
  render() {
    return (
      <div className="home-icon">
        <a href="/" className="home-icon__hyperlink">
          <span
            className="home-icon__emoji"
            role="img"
            aria-label="Go back to home."
          >
            &#x1F3E0;
          </span>
        </a>
      </div>
    );
  }
}

export default BackToHome;
