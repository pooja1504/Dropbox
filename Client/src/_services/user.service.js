import { authHeader } from '../_helpers';
import { history } from '../_helpers';
export const userService = {
    login,
   logout,
    register,
    getuserdetails
    /*getAll,
    getById,
    update,
    delete: _delete*/
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch('http://localhost:3001/auth/login', requestOptions)
       /* .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }})*/
         
        .then((response) => response.json()).then((responseJson) => {
    return responseJson;
});
}
function register(user) {
    const requestOptions = {
        method: 'POST',
       // credentials:'include',
       // mod:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('http://localhost:3001/auth/signup', requestOptions).then(handleResponse);
}

function getuserdetails()
{
    fetch('http://localhost:3001/getuserdetails').then((response) => response.json()).then((responseJson) => {
       console.log(responseJson);
       return responseJson; 
}
)
}
function logout() {
    history.push('/login');
}

/*function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

*/
function handleResponse(response) 
{
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}