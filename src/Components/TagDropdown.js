import React, { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";

function TagDropdown({ value, onChange }) {
  const context = useContext(NoteContext);

  const handleTagChange = (event, tag) => {
    event.preventDefault();
    if (onChange) {
      onChange({ target: { value: tag } });
    } else {
      context.setTag(tag);
    }
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {value || context.tag}
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={(e) => handleTagChange(e, "General")}
            >
              General
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={(e) => handleTagChange(e, "Personal")}
            >
              Personal
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={(e) => handleTagChange(e, "Fitness")}
            >
              Fitness
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={(e) => handleTagChange(e, "Grocery")}
            >
              Grocery
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={(e) => handleTagChange(e, "Medical")}
            >
              Medical
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TagDropdown;
