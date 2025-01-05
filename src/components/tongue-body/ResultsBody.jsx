import React from 'react';
import './ResultsBody.scss';
import hospital_logo from './try.png';

const ResultsBody = ({ name, age, gender, region, result, confidence, notes, image, onTryAgain }) => {
  return (
    <div className="results-container">
      <h2 className="results-title">Results</h2>
      <div className="results-content">
        <div className="image-container">
          <img src={image} alt="Result Image" />
        </div>
        <div className="details-container">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Result:</strong> <span className={`result ${result.toLowerCase()}`}>{result}</span></p>
          <p><strong>Confidence Level:</strong> {confidence}</p>
          <p className="additional-notes">
            <em>{notes}</em>
          </p>
        </div>
      </div>
      <button className="test-again-btn" onClick={onTryAgain}>Test Again</button>
    </div>
  );
};

export default ResultsBody;
