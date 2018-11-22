import React from 'react';
export const Title = field => {
  return (
    <div className="form-group">
      <label>{field.label}</label>
      <input className="form-control" type="text" {...field.input} />
    </div>
  );
};
