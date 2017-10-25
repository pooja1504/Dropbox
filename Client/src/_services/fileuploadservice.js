const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


export const getImages = () =>
    fetch(`${api}/files/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload,mypic) =>
//console.log(uploadFiles);

    fetch(`${api}/files/upload`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
            console.log("This is error");
            return error;
        });

export const listfiles= () =>
fetch(`${api}/listfiles`, {
        method: 'POST',
        credentials:'include',
        mode:'cors'
       // body: payload
    }).then((response) => response.json()).then((responseJson) => {
        console.log("hii its response JSon"+ responseJson);
                return responseJson;
    //}).then(res => {
        //return res.status;
    }).catch(error => {
            console.log("This is error");
            return error;
        });

   export const starfile = (payload) =>
   fetch(`${api}/starfile`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
            console.log("This is error");
            return error;
        });
export const sharefile = (payload,sharing_email) =>
   fetch(`${api}/sharefile`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload,sharing_email})
    }).then((response) => response.json()).then((responseJson) => {
                return responseJson;
    }).catch(error => {
            console.log("This is error");
            return error;
        });

    export const deletefile= (file)=>
    fetch(`${api}/deletefile`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file})
    }).then((response) => response.json()).then((responseJson) => {
                return responseJson;
    }).catch(error => {
            console.log("This is error");
            return error;
        });