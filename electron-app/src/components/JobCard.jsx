import React from "react";

class JobCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bid:'',
          rating:'',
          review:'',
          err: 'false',
          message: '',
          id: props.id,
        };
        
    }
    clamp (num){ 
        num = parseFloat(num);
        return Math.min(Math.max(num, 1), 5);
    }
    render(){
        let modal = <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Leave Contractor Review</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-start">
                        <input className="m-1" type="number" value={this.state.rating} placeholder="Conractor Rating" onChange={(event) => this.setState({rating: this.clamp(event.target.value)})}/>
                        <br/>
                        <label className="w-50 text-start">Review</label>
                        <br/>
                        <textarea rows="4" className="m-1 w-75" type="text" value={this.state.review} onChange={(event) => this.setState({review: event.target.value})}/>
                        <br/>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button className="btn btn-primary ms-2" data-bs-dismiss="modal" onClick={()=>this.props.markJobComplete(this.props.data.ticket_id, this.state.rating, this.state.review)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>;
        let footer = <span></span>;
        if(this.props.bidding && this.props.contractor){
            footer = <span>
                <input className="m-1" type="number" value={this.state.bid} placeholder="Estimated Cost" onChange={(event) => this.setState({bid: event.target.value})}/>
                <button className="btn btn-success ms-2" onClick={()=>this.props.submitBid(this.state.bid, this.props.data.ticket_id)}>Submit Bid</button>
            </span>;
        }else if(this.props.bidding && !this.props.contractor){
            footer = <button className="btn btn-success ms-2" onClick={()=>this.props.closeBidding(this.props.data.ticket_id)}>Close Bidding</button>;
        }else if(!this.props.bidding && !this.props.contractor && this.props.data.ticket_status == "Open"){
            footer = <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Mark Job as Complete
          </button>;
        }
        return (
            <div className="col">{(!this.props.bidding && !this.props.contractor && this.props.data.ticket_status == "Open")? modal : <span></span>}
          <div className="card text-dark bg-light mb-3 border-warning h-100" style={{minWidth:"15rem"}}>
              <div className="card-header">
                  <h5 className="card-title">{this.props.data.job_title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Posted by {this.props.data.poster}</h6>
              </div>
              <div className="card-body fw-bold">
                  
                  <p className={(this.props.data.ticket_status == "Open")? "card-text text-success" : "card-text text-muted"}>Status: {this.props.data.ticket_status}</p>
                  <p className="card-text">Job Cost: ${this.props.data.current_cost}</p>
                  <p className="card-text fw-lighter fst-italic">Contractor: {this.props.data.company_name} ({this.props.data.overall_stars})</p>
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