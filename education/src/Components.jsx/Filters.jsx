import React from "react";
import "../Styles/Filters.css";

function Filters({ setRatingFilter, setDurationFilter }) {
  return (
    <div className="filters">
      <h3>Ratings</h3>
      <ul>
        <li>
          <input
            type="radio"
            id="4.5"
            name="rating"
            onChange={() => setRatingFilter(4.5)}
          />
          <label htmlFor="4.5">4.5 & up</label>
        </li>
        <li>
          <input
            type="radio"
            id="4.0"
            name="rating"
            onChange={() => setRatingFilter(4.0)}
          />
          <label htmlFor="4.0">4.0 & up</label>
        </li>
        <li>
          <input
            type="radio"
            id="3.5"
            name="rating"
            onChange={() => setRatingFilter(3.5)}
          />
          <label htmlFor="3.5">3.5 & up</label>
        </li>
        <li>
          <input
            type="radio"
            id="3.0"
            name="rating"
            onChange={() => setRatingFilter(3.0)}
          />
          <label htmlFor="3.0">3.0 & up</label>
        </li>
      </ul>

      <h3>Video Duration</h3>
      <ul>
        <li>
          <input
            type="checkbox"
            id="0-1"
            onChange={() => setDurationFilter("0-1")}
          />
          <label htmlFor="0-1">0-1 Hour</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="1-3"
            onChange={() => setDurationFilter("1-3")}
          />
          <label htmlFor="1-3">1-3 Hours</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="3-6"
            onChange={() => setDurationFilter("3-6")}
          />
          <label htmlFor="3-6">3-6 Hours</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="6-17"
            onChange={() => setDurationFilter("6-17")}
          />
          <label htmlFor="6-17">6-17 Hours</label>
        </li>
      </ul>
    </div>
  );
}

export default Filters;
