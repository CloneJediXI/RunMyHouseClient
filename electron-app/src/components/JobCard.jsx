import React from "react";

function JobCard(props) {
  return (
    <div className="card text-dark bg-light mb-3 border-warning" >
        <div className="card-header">
            <h5 className="card-title">{props.data.job_title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Posted by {props.data.poster}</h6>
        </div>
        <div className="card-body fw-bold">
            
            <p className={(props.data.ticket_status == "Open")? "card-text text-success" : "card-text text-muted"}>Status: {props.data.ticket_status}</p>
            <p className="card-text">Job Cost: ${props.data.current_cost}</p>
            <p className="card-text fw-lighter fst-italic">Contractor: {props.data.company_name}</p>
            <p className="card-text fw-lighter">Description: {props.data.job_description}</p>
            
        </div>
        <div className="card-footer">
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
        </div>
    </div>
  );
}

export default JobCard;