import React from "react";
import getServer from '../enviroment';
import { JobCard } from "../components";

class CustomerBids extends React.Component {
    constructor(props) {
        super(props);
        this.getJobs = this.getJobs.bind(this);
        this.closeBidding = this.closeBidding.bind(this);
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
      componentDidMount() {
        this.getJobs();
      }
      getJobs(){
        fetch('http://'+getServer()+':80/runmyhouseserver/job.php?status=Bidding&userId='+this.state.id, {method: 'GET', 
        mode: 'cors', crossDomain:true,})
            .then(response => response.json())
            .then(data => this.setState({jobs: data.data}))
            .catch(error => {
              this.setState({ message: error.toString() });
              console.error('There was an error!', error);
            });;
      }
      closeBidding(ticket){
        fetch('http://'+getServer()+':80/runmyhouseserver/job.php?ticketId='+ticket+'&biddingComplete=true', {method: 'GET', 
        mode: 'cors', crossDomain:true,})
            .then(response => response.json())
            .then(data => this.getJobs())
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
                  <h1 className="font-weight-light">Jobs Open for Bidding</h1>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                    {this.state.jobs.map(element => <JobCard data={element} key={element.ticket_id} bidding={true} closeBidding={this.closeBidding} contractor={false}></JobCard>)}
                  </div>
                  <hr/>
                  
                </div>
              </div>
            </div>
          </div>;
        return (html);
      }
}

export default CustomerBids;