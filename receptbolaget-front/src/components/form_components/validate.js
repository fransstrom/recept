import React, { Component } from 'react';
export default function validate(values) {
    const errors = {};
    //validate the values object
    if (!values.title || values.title.length < 3) {
      errors.title = (
        <div className="alert alert-danger">
          Ange ett namn för receptet med minst 3 bokstäver!
        </div>
      );
    }
  
    if (!values.description) {
      errors.description = (
        <div className="alert alert-danger">
          Ange en beskrivning för receptet!
        </div>
      );
    }
  
    if (!values.category) {
      errors.category = (
        <div className="alert alert-danger">
          Ange minst 1 kategori för receptet!
        </div>
      );
    }
    //If errors is empty the form is fine to submit else there is errors
    return errors;
  }