import logo from './logo.svg';
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, LogIn, NewUser, NewContractor, ContractorHome } from "./components";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.logOut = this.logOut.bind(this);
    this.exitCreate = this.exitCreate.bind(this);
    this.enterCreate = this.enterCreate.bind(this);
    this.enterCreateContractor = this.enterCreateContractor.bind(this);
    this.exitCreateContractor = this.exitCreateContractor.bind(this);
    this.state = {
      auth: 'false',
      message: '',
      newUser: 'false',
      newContractor: 'false',
      contractor: 'false',
      id: '-1',
    };
  }
  validate(contractorFlag, idNum) {
    
    this.setState({auth: 'true', contractor: contractorFlag, id:idNum});
  }
  logOut() {
    this.setState({auth: 'false', message:"" });
  }
  exitCreate(success){
    if(success){
      this.setState({ newUser: 'false', message: "Account creation successful, please log in"});
    }else{
      this.setState({ newUser: 'false', message:""});
    }
    
  }
  enterCreate(){
    this.setState({ newUser: 'true'});
  }
  enterCreateContractor(){
    this.setState({ newContractor: 'true'});
  }
  exitCreateContractor(success){
    if(success){
      this.setState({ newContractor: 'fase', message: "Account creation successful, please log in"});
    }else{
      this.setState({ newContractor: 'fase', message:""});
    }
    
  }

  render() {
    let test = <div className="App m-0"><h1 className="text-center">Oops! Something went wrong!</h1></div>;
    if (this.state.auth === 'false'){
      if (this.state.newUser === 'true'){
        test = <NewUser validate={this.validate}
                  exitCreate={this.exitCreate}></NewUser>;
      }else if(this.state.newContractor === 'true'){
        test = <NewContractor validate={this.validate}
                  exitCreateContractor={this.exitCreateContractor}></NewContractor>;
      }else{
        test = <LogIn validate={this.validate} 
                  enterCreate={this.enterCreate}
                  enterCreateContractor={this.enterCreateContractor}
                  message={this.state.message}
                  ></LogIn>;
      }
    }else if(this.state.contractor) {
      test = <div className="App m-0">
        <Router>
          <Navigation logOut={this.logOut} isContractor={true}/>
          <Switch>
            <Route path="/" exact component={() => <ContractorHome id={this.state.id}/>} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/contact" exact component={() => <Contact />} />
          </Switch>
          <Footer />
        </Router>
      </div>;
    }else{
      test = <div className="App m-0">
        <Router>
          <Navigation logOut={this.logOut} isContractor={false}/>
          <Switch>
            <Route path="/" exact component={() => <Home id={this.state.id}/>} />
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
