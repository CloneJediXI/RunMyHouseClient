import logo from './logo.svg';
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, LogIn, NewUser } from "./components";
import getServer from './enviroment';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.logOut = this.logOut.bind(this);
    this.exitCreate = this.exitCreate.bind(this);
    this.enterCreate = this.enterCreate.bind(this);
    this.state = {
      auth: 'false',
      message: 'Nothing',
      newUser: 'false'
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
  exitCreate(){
    this.setState({ newUser: 'false'});
  }
  enterCreate(){
    this.setState({ newUser: 'true'});
  }

  render() {
    let test = <div className="App"><h1 className="text-center">Oops! Something went wrong!</h1></div>;
    if (this.state.auth === 'false'){
      if (this.state.newUser === 'true'){
        test = <NewUser validate={this.validate}
                  exitCreate={this.exitCreate}></NewUser>;
      }else{
        test = <LogIn validate={this.validate} 
                  enterCreate={this.enterCreate}
                  ></LogIn>;
      }
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
