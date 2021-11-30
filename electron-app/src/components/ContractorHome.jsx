import React from "react";
import getServer from '../enviroment';
import { JobCard } from "../components";

class ContractorHome extends React.Component {
  constructor(props) {
    super(props);
    this.getJobs = this.getJobs.bind(this);
    this.state = {
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
    fetch('http://'+getServer()+':80/runmyhouseserver/job.php?contractorId='+this.state.id+'&viewAll='+this.state.viewAll, {method: 'GET', 
    mode: 'cors', crossDomain:true,})
        .then(response => response.json())
        .then(data => this.setState({jobs: data.data}))
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
                {this.state.jobs.map(element => <JobCard data={element} key={element.ticket_id} contractor={true}></JobCard>)}
              </div>
              
            </div>
          </div>
        </div>
      </div>;
    return (html);
  }
}

export default ContractorHome;