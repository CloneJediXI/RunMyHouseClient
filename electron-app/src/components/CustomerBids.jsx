import React from "react";
import getServer from '../enviroment';
import { JobCard } from "../components";

class CustomerBids extends React.Component {
  constructor(props) {
    super(props);
    this.getJobs = this.getJobs.bind(this);
    this.state = {
      jobTitle:'',
      jobCost:'',
      jobDesc:'',
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
  newJob(){
    fetch('http://'+getServer()+':80/runmyhouseserver/job.php?jobTitle='+this.state.jobTitle+'&jobDesc='+this.state.jobDesc+'&cost='+this.state.jobCost+'&userId='+this.state.id, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.setState({err: data.data}))
        .then(data => this.setState({jobTitle: "", jobCost:"", jobDesc: ""}))
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
              <h2>Create new Job Listing</h2>
              <input className="m-1" type="text" value={this.state.jobTitle} placeholder="Job Title" onChange={(event) => this.setState({jobTitle: event.target.value})}/>
              <br/>
              <input className="m-1" type="number" value={this.state.jobCost} placeholder="Estimated Cost" onChange={(event) => this.setState({jobCost: event.target.value})}/>
              <br/>
              <label className="w-50 text-start">Job Description</label>
              <br/>
              <textarea rows="4" className="m-1 w-50" type="text" value={this.state.jobDesc} onChange={(event) => this.setState({jobDesc: event.target.value})}/>
              <br/>
              <button className="btn btn-primary m-3 mb-5 text-center" onClick={() => this.newJob()}>Create New Job</button>
            </div>
          </div>
        </div>
      </div>;
    return (html);
  }
}

export default CustomerBids;