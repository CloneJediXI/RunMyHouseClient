import logo from './logo.svg';
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, LogIn } from "./components";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      auth: 'false'
    };
  }
  validate() {
    this.setState({
      auth: 'true'
    });
  }
  logOut() {
    this.setState({
      auth: 'false'
    });
  }

  render() {
    let test = <div className="App"><h1 className="text-center">Oops! Something went wrong!</h1></div>;
    if (this.state.auth === 'false'){
      test = <LogIn validate={this.validate}></LogIn>;
    }else {
      test = <div className="App">
        <Router>
          <Navigation logOut={this.logOut}/>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/contact" exact component={() => <Contact />} />
          </Switch>
          <Footer />
        </Router>
      </div>;
    }
    
    return (test);
  }
}

export default App;
