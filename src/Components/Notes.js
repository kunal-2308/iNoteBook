import React from "react";

function Notes(props) {
  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <span className="badge text-bg-danger">{props.tag}</span>
          <br/>
          <a href="/" className="btn btn-primary my-2">
            Update <i className="fa-solid fa-pen"></i>
          </a>
          <a href="/" className="btn btn-primary my-2 mx-3">
            Delete <i className="fa-solid fa-trash"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Notes;
