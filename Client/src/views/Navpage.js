import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Fileupload from './Fileupload';
import Listfiles from './Listfiles';
import { history } from '../_helpers';



class NavPage extends React.Component {
render() {
        return (
        <div >
        
        <img src={require('../Dropbox.png')} style={{width: 100, height: 100, align: 'left'}}/><h1> Dropbox </h1>
        
        <div role="list" class="ui list" floated="left">
        <div role="listitem" class="item">
        <div class="content"><button className="btn btn-primary" onClick={() => {
                                history.push('/Fileupload');
                            }}>File Upload </button>
        </div>
        <br/>
        <br/>
        </div>
        <div role="listitem" class="item">
        <div class="content">
        <button className="btn btn-primary" onClick={() => {
                               history.push('/Listfiles');
                            }}> My Files </button>
         </div>
        </div>
         </div>
        </div>
        
    );
    }
}



export default NavPage;