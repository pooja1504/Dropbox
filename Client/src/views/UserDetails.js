import React, {Component} from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';


class UserDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.userdata.length);
        console.log(this.props.userdata.firstName);
        return (
            <div style={{backgroundColor: '',width:1000,height:800}}>
            <h2> User Details </h2>
            <b> FirstName:  </b> {this.props.userdata.firstName}
            <br/>
            <b> LastName:  </b>{this.props.userdata.lastName}
            <br/>
            <b> Email:  </b>{this.props.userdata.email}
            

               </div>
            

           
        );
    }
}

function mapStateToProps(data) {
    let userdata = [];
    console.log("in component ----- ");
    if(data.authentication.users !== undefined) {
        userdata = data.authentication.users;
        console.log(userdata);  
        
    }
    return {userdata};
}


export default connect(mapStateToProps)(UserDetails); 
