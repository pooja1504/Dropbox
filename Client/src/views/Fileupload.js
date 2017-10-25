import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as fileuploadservice from '../_services/fileuploadservice';
import * as listfileaction from '../_actions/listfileaction';
import DownloadLink from 'react-download-link';
//import {listfileaction} from '../actions/listfileaction';
//import ImageGridList from "./ImageGridList";
//import TextField from 'material-ui/TextField';
//import Typography from 'material-ui/Typography';
import Navpage from './Navpage';
import { history } from '../_helpers';
import Logout from './Logout';

class Fileupload extends React.Component {

    handleFileUpload = (event) => {

        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        console.log("inside handleUpoad");
        console.log(payload);
        fileuploadservice.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    console.log("file uploaded");
                   this.props.addTodoNew();
                }
            });

    };
    handleStar(file){
       const payload = file;
       console.log(payload);
        console.log("inside handleSubmit for starfile");
        //console.log(payload.fieldName);
        fileuploadservice.starfile(payload)
            .then((status) => {
                if (status === 204) {
                    console.log("file starred in Listfiles.js");
                   this.props.addTodoNew();
                }
            });
    };
    handleShare(file){
        console.log(file);
        console.log("hey its handleShare in Fileupload");
        this.props.sharefileaction(file);
        history.push('/Fileshare');
    }

    render() {
        return (
            <div style={{backgroundColor: '',width:1000,height:800}}>
                
             <div className="row" >
                <div className="col-sm-6">
            <Navpage/>
            </div>
           

                 <div className="col-sm-4">
                <h2> <b> Upload your files here </b></h2>
                
                <input
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
                  <div className="card-body">
                          
                {this.props.fileList.length > 0 ? 
                    this.props.fileList.map((file) => {
                        return ( <div>
                        <button className="btn btn-primary" onClick= {()=>this.handleStar(file)}><img src={require('../Star.png')}/></button> 
                        <DownloadLink filename={file} label= {file}/><button className="btn btn-primary" onClick= {()=>this.handleShare(file)}>Share</button>  
<br/>
                                <br/>
                        </div>
                        );
                    })
                    
                    : ''}
                
              </div>
              </div>
              <div className="col-sm-2">
              
              <Logout/>
              </div>

            </div>
            </div>

        );
    }
}
function mapStateToProps(data) {
    let fileList = [];
    if(data.listoffiles.files !== undefined) {
        fileList = data.listoffiles.files.files;
        console.log(data.listoffiles.files.files);  
        
    }
    return {fileList};
}
function mapDispatchToProps(dispatch) {
    return {
        addTodoNew : () => dispatch(listfileaction.listfiles()),
        sharefileaction:(data) => dispatch(listfileaction.sharefileaction(data))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Fileupload); 

