import React from "react";
import getServer from '../enviroment';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.validate = props.validate.bind(this);
    this.exitCreate = props.exitCreate.bind(this);
    this.newUser = this.newUser.bind(this);
    this.state = {
      username: "",
      password: "",
      fullName: "",
      email: "",
      err: 'false',
      message: '',
    };
  }
  checkLogIn(error, id){
    this.setState({err: error})
    if(error == 'false'){
      this.setState({message: 'Success! '});
      this.exitCreate(true);
      //this.validate(false, id);
    }else{
      this.setState({message: 'That Username is taken '});
    }
  }
  newUser(){
    fetch('http://'+getServer()+':80/runmyhouseserver/login.php?username='+this.state.username+'&password='+this.state.password+'&name='+this.state.fullName+'&email='+this.state.email, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.checkLogIn(data.err, data.id))
        .catch(error => {
          this.setState({ message: error.toString() });
          console.error('There was an error!', error);
        });;
    
  }
  render(){
    let html = <div className="row m-0" >
        <div className="col-md-4 col-1"></div>
        <div className="col-10 col-md-4">
            <div className="container bg-dark text-light p-5 m-0 text-center">
                <h1 className="text-center text-warning">New Account</h1>
                <h4 className="text-danger">{this.state.message}</h4>
                <br/>
                <input className="m-1" type="text" value={this.state.fullName} placeholder="Name" onChange={(event) => this.setState({fullName: event.target.value})}/>
                <br/>
                <input className="m-1" type="text" value={this.state.email} placeholder="Email" onChange={(event) => this.setState({email: event.target.value})}/>
                <br/>
                <input className="m-1" type="text" value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
                <br/>
                <input className="m-1" type="text" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                <br/>
                <button className="btn btn-primary m-3 mb-5 text-center" onClick={() => this.newUser()}>Create Account</button>
                <br/>
                <button className="btn btn-warning m-3" onClick={() => this.exitCreate(false)}>Back</button>
            </div>
        </div>
    </div>;
    return (html);
  }
}

export default NewUser;