import React from "react";

const InstructionList = ({ instructions }) => (
  <div>
    <h3>Instruktioner</h3>
    <ol className="list">
      {instructions.map((item, index) => {
        return <li key={"instruction" + index}>{item.step}</li>;
      })}
    </ol>
  </div>
);
export default InstructionList;
