import React from "react";
import getServer from '../enviroment';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.validate = props.validate.bind(this);
    this.enterCreate = props.enterCreate.bind(this);
    this.logIn = this.logIn.bind(this);
    this.state = {
      username: "",
      password: "",
      auth: 'false',
      message: '',
    };
  }
  checkLogIn(valid){
    this.setState({auth: valid})
    if(valid == 'true'){
      this.setState({message: 'Success! '});
      this.validate();
    }else{
      this.setState({message: 'Invalid Password or Username '});
    }
  }
  logIn(){
    fetch('http://'+getServer()+':80/runmyhouseserver/login.php?username='+this.state.username+'&password='+this.state.password, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.checkLogIn(data.auth))
        .catch(error => {
          this.setState({ message: error.toString() });
          console.error('There was an error!', error);
        });;
    
  }
  render(){
    let html = <div className="contact">
        <div className="container">
          <h1 className="text-center">Log In</h1>
          <p className="text-danger">{this.state.message}</p>
          <input type="text" value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
          <input type="text" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
          <button className="btn btn-primary" onClick={() => this.logIn()}>Log Me In</button>
          <br/>
          <br/>
          <button className="btn btn-success" onClick={() => this.enterCreate()}>Create Account</button>
          
        </div>
      </div>;
    return (html);
  }
}

export default LogIn;