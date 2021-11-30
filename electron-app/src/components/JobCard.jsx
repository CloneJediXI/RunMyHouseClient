import React from "react";

class JobCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bid:'',
          jobCost:'',
          jobDesc:'',
          err: 'false',
          message: '',
          jobs: [],
          id: props.id,
          viewAll: false
        };
        
    }
    render(){
        let footer = <span></span>;
        if(this.props.bidding && this.props.contractor){
            footer = <span>
                <input className="m-1" type="number" value={this.state.bid} placeholder="Estimated Cost" onChange={(event) => this.setState({bid: event.target.value})}/>
                <button className="btn btn-success ms-2" onClick={()=>this.props.submitBid(this.state.bid, this.props.data.ticket_id)}>Submit Bid</button>
            </span>;
        }else if(this.props.bidding && !this.props.contractor){
            footer = <button className="btn btn-success ms-2" onClick={()=>this.props.closeBidding(this.props.data.ticket_id)}>Close Bidding</button>;
        }else if(!this.props.bidding && !this.props.contractor && this.props.data.ticket_status == "Open"){
            footer = <button className="btn btn-success ms-2" onClick={()=>this.props.submitBid(this.state.bid, this.props.data.ticket_id)}>Mark Job as Complete</button>;
        }
        return (
            <div className="col">
          <div className="card text-dark bg-light mb-3 border-warning h-100" style={{minWidth:"15rem"}}>
              <div className="card-header">
                  <h5 className="card-title">{this.props.data.job_title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Posted by {this.props.data.poster}</h6>
              </div>
              <div className="card-body fw-bold">
                  
                  <p className={(this.props.data.ticket_status == "Open")? "card-text text-success" : "card-text text-muted"}>Status: {this.props.data.ticket_status}</p>
                  <p className="card-text">Job Cost: ${this.props.data.current_cost}</p>
                  <p className="card-text fw-lighter fst-italic">Contractor: {this.props.data.company_name}</p>
                  <p className="card-text fw-lighter">Description: {this.props.data.job_description}</p>
                  
              </div>
              <div className="card-footer">
                  {footer}
              </div>
          </div>
          </div>
        );
    }
}

export default JobCard;