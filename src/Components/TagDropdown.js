import React, { useEffect, useState } from 'react';

function TagDropdown() {
  const [tag, setTag] = useState('General');

  useEffect(() => {
    console.log('Updated:', tag);
  }, [tag]);

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {tag}
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="/" onClick={() => setTag('General')}>
              General
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/" onClick={() => setTag('Personal')}>
              Personal
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/" onClick={() => setTag('Fitness')}>
              Fitness
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/" onClick={() => setTag('Grocery')}>
              Grocery
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/" onClick={() => setTag('Medical')}>
              Medical
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TagDropdown;
