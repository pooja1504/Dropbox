//import { userConstants } from '../_constants';
//import { userService } from '../_services';
//import { alertActions } from './';

import { history } from '../_helpers';
import * as fileuploadservice from '../_services/fileuploadservice';
export const LIST_FILES = 'LIST_FILES';
export const FILE_SHARE = 'FILE_SHARE';
export const AFTER_SHARE = 'AFTER_SHARE';

export function listfiles() {
	//return dispatch => {
       // dispatch(request({ reponseJson }));
       return function(dispatch){
	fileuploadservice.listfiles()
            .then((responseJson) => {
               console.log("its Listfiles actions");
               console.log(responseJson);
                dispatch(updateListFiles(responseJson));
            },
           
            );}
  }

export function updateListFiles(responseJson) {
console.log("hey its update list files");
console.log(responseJson);
	return {
		type: LIST_FILES,
		files : responseJson
	}
	
}
export function sharefileaction(file){
  return{
    type: FILE_SHARE,
    filename: file
  }
}
export function sendfileforshare(payload, sharing_email) {
  console.log("hey its sendfileforshare in listfileaction");
  console.log(payload);
  console.log("its sendfileforshare email"+sharing_email);
  return function(dispatch){
        fileuploadservice.sharefile(payload,sharing_email)
            .then((responseJson) => {
                console.log("its sendfileforshare actions");
                console.log(responseJson);
                dispatch(aftershare(responseJson));
                },
            );} 
 }        
  export function aftershare(responseJson){
    return{
      type: AFTER_SHARE,
      sharedfiledetails: {sharedfilename: responseJson.payload, shared_email: responseJson.sharing_email}
    }
  }  
  export function deletefile(file){
    return function(dispatch){
  fileuploadservice.deletefile(file)
            .then((responseJson) => {
               console.log(responseJson);
                dispatch(updateListFiles(responseJson));
            },
           
            );}
  }

