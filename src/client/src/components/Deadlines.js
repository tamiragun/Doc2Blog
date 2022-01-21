import React, { useState } from "react";
import DeadlineForm from "./DeadlineForm";

const Deadlines = () => {
  const [addingDeadline, setAddingDeadline] = useState(false);

  const toggleAddingDeadline = () => {
    setAddingDeadline(!addingDeadline);
  };

  return (
    <div>
      {!addingDeadline && (
        <button onClick={() => toggleAddingDeadline()}>Add new deadline</button>
      )}
      {addingDeadline && (
        <DeadlineForm onComplete={toggleAddingDeadline}></DeadlineForm>
      )}
    </div>
  );
};

export default Deadlines;
