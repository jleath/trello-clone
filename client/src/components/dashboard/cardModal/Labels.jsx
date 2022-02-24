import React from "react";

const Labels = ({ labels }) => {
  return (
    <li className="labels-section">
      <h3>Labels</h3>
      {labels.map(label => {
        return (
          <div key={label} className="member-container">
            <div className={`${label} label colorblindable`}></div>
          </div>
        )
      })}

      <div className="member-container">
        <i className="plus-icon sm-icon"></i>
      </div>
    </li>
  )
}

export default Labels;