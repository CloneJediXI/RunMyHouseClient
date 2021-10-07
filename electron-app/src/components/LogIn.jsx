import React from "react";

function LogIn(props) {
  return (
    <div className="contact">
      <div className="container">
        <h1 className="text-center">Log In</h1>
        <button className="btn btn-primary" onClick={() => props.validate()}>Log Me In</button>
        <br/>
        <button className="btn btn-secondary" onClick={() => props.connect()}>Connect To Server</button>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default LogIn;