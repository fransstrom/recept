import React from 'react';

const InstructionList = ({ instructions }) => (
  <div>
    <h4>Instruktioner</h4>
  <ol className="list">
    {instructions.map((item, index) => {
      return <li key={'instruction' + index}>{item.step}</li>;
    })}
  </ol>
  </div>
);
export default InstructionList;
