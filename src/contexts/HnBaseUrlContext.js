import React from "react";

const HnBaseUrlContext = React.createContext({
  url: `https://hacker-news.firebaseio.com/v0/`
});

export default HnBaseUrlContext;
