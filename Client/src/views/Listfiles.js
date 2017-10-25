import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as fileuploadservice from '../_services/fileuploadservice';
//import ImageGridList from "./ImageGridList";
//import TextField from 'material-ui/TextField';
//import Typography from 'material-ui/Typography';
import * as listfileaction from '../_actions/listfileaction';
//import {SelectableList} from 'material-ui/SelectableList';
import DownloadLink from 'react-download-link';
import Navpage from './Navpage';
import Logout from './Logout';
import { history } from '../_helpers';
import LoginPage from './LoginPage';


class Listfiles extends React.Component {
    
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.addTodoNew()
    }
    handleShare(file){
        console.log(file);
        console.log("hey its handleShare in Fileupload");
        this.props.sharefileaction(file);
        history.push('/Fileshare');
    }
    signin()
    {
        history.push('/login');
    }
    deletefile(file)
    {
        this.props.deleteaction(file);
        
    }

    render() {
            const {item} = this.props;
            const { listoffiles  } = this.props;
        return (
            <div style={{backgroundColor: '',width:1000,height:800}}>
            <div class="row">
            <div className="col-sm-4">
            <Navpage/>
            </div>
            <div className="col-sm-6">
            <div className="card-body"> 
            {this.props.fileList.length > 0 ?
            <div><h1> Your files </h1>
            <br/>
            <br/></div> : ''}        
                {this.props.fileList.length > 0 ? 
                    this.props.fileList.map((file) => {
                        return ( <div>
                            <button className="btn btn-primary" onClick= ""><img src={require('../Star.png')}/></button> 
                            <DownloadLink
                                filename={file}
                                label= {file}
                                />
                                <button className="btn btn-primary" onClick= {()=>this.handleShare(file)}>Share</button> 
                                <button className="btn btn-primary" onClick= {()=>this.deletefile(file)}>Delete</button>  
                                <br/>
                                <br/>
                            </div>);
                    })
                    
                    : <div><h1>You are Not logged In</h1>
                    <button className="btn btn-primary" onClick= {()=>this.signin()}>SignIn</button></div>

                }
                 </div>
                 </div>
               </div>
               {this.props.fileList.length > 0 ? 
                <Logout/> : '' }
               </div>
           
        );
    }
}

function mapStateToProps(data) {
    let fileList = [];
    console.log("in component ----- ");
    if(data.listoffiles.files !== undefined) {
        fileList = data.listoffiles.files.files;
        console.log(data.listoffiles.files.files);  
        
    }
    return {fileList};
}

function mapDispatchToProps(dispatch) {
    return {
        addTodoNew : () => dispatch(listfileaction.listfiles()),
        sharefileaction:(data) => dispatch(listfileaction.sharefileaction(data)),
        deleteaction: (data)=> dispatch(listfileaction.deletefile(data))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Listfiles); 
