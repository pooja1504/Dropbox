import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { HomePage } from './views/HomePage';
import { LoginPage } from './views/LoginPage';
import { RegisterPage } from './views/RegisterPage';
import Fileupload from './views/Fileupload';
import Listfiles from './views/Listfiles';
import Logout from './views/Logout';
import Navpage from './views/Navpage';
import Fileshare from './views/Fileshare';
import UserDetails from './views/UserDetails';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={LoginPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage}/>
                                <Route path="/homepage" component={HomePage}/>
                                <Route path="/fileupload" component={Fileupload}/>
                                <Route path="/Listfiles" component={Listfiles}/>
                                <Route path="/Navpage" component={Navpage}/>
                                <Route path="/Fileshare" component={Fileshare}/>
                                <Route path="/Logout" component={Logout}/>
                                <Route path="/UserDetails" component={UserDetails}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 