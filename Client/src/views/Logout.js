import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class Logout extends React.Component {



handleLogout(){
	userActions.logout();
};
    render() {
        return (
            <div>
            <img src={require('../userimage.jpg')} style={{width: 100, height: 100, alignment:"right"}}/>
            <button className="btn btn-primary" onClick= {()=>this.handleLogout()}>Logout</button>
        	</div>
);
        }

}

export default Logout;