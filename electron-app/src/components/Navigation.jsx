import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

            <Link className="navbar-brand" to="/">
                Run My House
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link class={`nav-link  ${
                        props.location.pathname === "/" ? "active" : ""
                        }`} to="/">
                        Home
                    </Link>
                    <Link class={`nav-link  ${
                        props.location.pathname === "/about" ? "about" : ""
                        }`} to="/about">
                        About
                    </Link>
                    <Link class={`nav-link  ${
                        props.location.pathname === "/contact" ? "active" : ""
                        }`} to="/contact">
                        Contact
                    </Link>
                </div>
            </div>

        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);