import logo from './logo.svg';
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, LogIn } from "./components";
import getServer from './enviroment';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.logOut = this.logOut.bind(this);
    this.connectToServer = this.connectToServer.bind(this);
    this.testDevice = this.testDevice.bind(this);
    this.state = {
      auth: 'false',
      message: 'Nothing',
      testResult: 'Not Run'
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
  testDevice(){
    this.setState({testResult: getServer()});
  }
  connectToServer(){
    fetch('http://'+getServer()+':80/runmyhouseserver/login.php?username=test&password=test', {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.setState({ message: data.message }))
        .catch(error => {
          this.setState({ message: error.toString() });
          console.error('There was an error!', error);
        });;
  }

  render() {
    let test = <div className="App"><h1 className="text-center">Oops! Something went wrong!</h1></div>;
    if (this.state.auth === 'false'){
      test = <LogIn validate={this.validate} connect={this.connectToServer} message={this.state.message} testDevice={this.testDevice} testResult={this.state.testResult}></LogIn>;
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
