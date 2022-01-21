// See https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

import React from "react";
import BlogPost from "./components/BlogPost";
import Deadlines from "./components/Deadlines";
import "./App.css";

function App() {
  return (
    <div>
      <Deadlines></Deadlines>
      <BlogPost></BlogPost>
    </div>
  );
}

export default App;
