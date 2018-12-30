import React from 'react';

const InstructionList = ({ instructions }) => (
  <ol className="list">
    {instructions.map((item, index) => {
      return <li key={'instruction' + index}>{item.step}</li>;
    })}
  </ol>
);
export default InstructionList;
