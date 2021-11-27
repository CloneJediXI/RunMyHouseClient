import React from "react";
import getServer from '../enviroment';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.validate = props.validate.bind(this);
    this.enterCreate = props.enterCreate.bind(this);
    this.enterCreateContractor = props.enterCreateContractor.bind(this);
    this.logIn = this.logIn.bind(this);
    this.state = {
      username: "",
      password: "",
      auth: 'false',
      message: props.message,
    };
  }
  checkLogIn(valid, id){
    this.setState({auth: valid})
    if(valid == 'true'){
      this.setState({message: 'Success! '});
      this.validate(this.state.contractorFlag, id);
    }else{
      this.setState({message: 'Invalid Password or Username '});
    }
  }
  logIn(){
    let contractor = "";
    if(this.state.contractorFlag){
      contractor="&contractor=true";
    }
    fetch('http://'+getServer()+':80/runmyhouseserver/login.php?username='+this.state.username+'&password='+this.state.password+contractor, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.checkLogIn(data.auth, data.id))
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
          <label>If you are a contractor, check this box</label>
          <input type="checkbox" value={this.state.contractorFlag} onChange={(event) => this.setState({contractorFlag: event.target.checked})}/>
          <br/>
          <input type="text" value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
          <input type="text" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
          <button className="btn btn-primary" onClick={() => this.logIn()}>Log Me In</button>
          <br/>
          <br/>
          <button className="btn btn-success" onClick={() => this.enterCreate()}>Create Account</button>
          <br/>
          <br/>
          <button className="btn btn-success" onClick={() => this.enterCreateContractor()}>New Contractor</button>
          
        </div>
      </div>;
    return (html);
  }
}

export default LogIn;