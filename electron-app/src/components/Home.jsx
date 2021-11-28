import React from "react";
import getServer from '../enviroment';
import { JobCard } from "../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getJobs = this.getJobs.bind(this);
    this.newType = this.newType.bind(this);
    this.state = {
      companyName: "",
      password: "",
      service: "",
      routingNumber: "",
      acountNumber: "",
      err: 'false',
      message: '',
      jobs: [],
      id: props.id,
      viewAll: false
    };
    
  }
  componentDidUpdate(prevProps, prevState){
    if (prevState.viewAll != this.state.viewAll) {
      this.getJobs();
    }
  }
  componentDidMount() {
    this.getJobs();
  }
  getJobs(){
    fetch('http://'+getServer()+':80/runmyhouseserver/job.php?userId='+this.state.id+'&viewAll='+this.state.viewAll, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.setState({jobs: data.data}))
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
    let html = <div className="home">
        <div className="container">
          <div className="row align-items-center my-5">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <h1 className="font-weight-light">{(this.state.viewAll)? "All Jobs":"Open Jobs"}</h1>
              <div className="row mt-0 mb-3">
                <div className="col-8"></div>
                <div className="col-4">
                  <button className="float-end btn btn-sm btn-primary ms-5" onClick={(event) => {this.setState({viewAll: (!this.state.viewAll)});}}>{(this.state.viewAll)? "Show Open Jobs":"Show All Jobs"}</button>

                </div>
              </div>
              
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {this.state.jobs.map(element => <JobCard data={element} key={element.ticket_id}></JobCard>)}
              </div>
              
              <hr/>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>;
    return (html);
  }
}

export default Home;