import React from "react";
import getServer from '../enviroment';

class NewContractor extends React.Component {
  constructor(props) {
    super(props);
    this.validate = props.validate.bind(this);
    this.exitCreateContractor = props.exitCreateContractor.bind(this);
    this.newUser = this.newUser.bind(this);
    this.newType = this.newType.bind(this);
    this.state = {
      companyName: "",
      password: "",
      service: "",
      routingNumber: "",
      acountNumber: "",
      err: 'false',
      message: '',
      types: [],
      newType: "",
    };
    
  }
  componentDidMount() {
    this.getServiceTypes();
  }
  getServiceTypes(){
    fetch('http://'+getServer()+':80/runmyhouseserver/typesOfService.php', {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.setState({types: data.services}))
        .catch(error => {
          this.setState({ message: error.toString() });
          console.error('There was an error!', error);
        });;
  }
  newType(){
    fetch('http://'+getServer()+':80/runmyhouseserver/typesOfService.php?add='+this.state.newType, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.setState({service: this.state.newType}))
        .then(() => this.setState({newType: ""}))
        .then(() => this.getServiceTypes())
        .catch(error => {
          this.setState({ message: error.toString() });
          console.error('There was an error!', error);
        });;
    
  }
  checkLogIn(error, id){
    this.setState({err: error})
    if(error == 'false'){
      this.setState({message: 'Success! '});
      this.exitCreateContractor(true);
      //this.validate(true, id);
    }else{
      this.setState({message: 'That Username is taken '});
    }
  }
  newUser(){
    fetch('http://'+getServer()+':80/runmyhouseserver/login.php?username='+this.state.companyName+'&password='+this.state.password+'&service='+this.state.service+'&routing='+this.state.routingNumber+'&account='+this.state.acountNumber, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.checkLogIn(data.err, data.id))
        .catch(error => {
          this.setState({ message: error.toString() });
          console.error('There was an error!', error);
        });;
    
  }
  render(){
    let html = <div className="contact">
        <div className="container">
            <h1 className="text-center">Create new Contractor Account</h1>
            <p className="text-danger">{this.state.message}</p>
            <br/>
            <input type="text" value={this.state.companyName} placeholder="Company Name" onChange={(event) => this.setState({companyName: event.target.value})}/>
            <br/>
            <input type="text" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
            <br/>
            <select value={this.state.service} onChange={(event) => this.setState({service: event.target.value})}>
                {this.state.types.map(element => <option value={element} key={element}>{element}</option>)}
            </select>
            <label>Add New Service</label>
            <input type="text" value={this.state.newType} placeholder="New Type of Service" onChange={(event) => this.setState({newType: event.target.value})}/>
            <button className="btn btn-success" onClick={() => this.newType()}>Submit</button>
            <br/>
            <input type="text" value={this.state.routingNumber} placeholder="Bank Routing number" onChange={(event) => this.setState({routingNumber: event.target.value})}/>
            <br/>
            <input type="text" value={this.state.acountNumber} placeholder="Bank Account Number" onChange={(event) => this.setState({acountNumber: event.target.value})}/>
            <br/>
            <button className="btn btn-primary" onClick={() => this.newUser()}>Create Account</button>
            <br/>
            <button className="btn btn-warning" onClick={() => this.exitCreateContractor(false)}>Back</button>
        </div>
    </div>;
    return (html);
  }
}

export default NewContractor;