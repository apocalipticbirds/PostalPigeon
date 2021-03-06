import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch, Redirect, withRouter} from "react-router-dom";
import NotFound from "./components/NotFound";
import LogoutPage from "./components/LogoutPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import MainPage from "./components/MainPage";
import RegistrationPage from "./components/RegistrationPage";
 

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: false,
            token: "",
            userId: "",
            tokenExpiration: ""
        };
    }

    componentDidMount(){
        this.initSession();
    };

    initSession = () => {
        const token = localStorage.getItem('token');
        this.setState({token: token ? token : "",
                        isSignIn: token ? true : false });
        console.log(this.state.token);

    };

    changeToken = value => {
        localStorage.setItem('token', value);
        this.setState(prevState => {
            return {token: value};
        });
    };

    changeUserId = value => {
        this.setState(prevState => {
            return {userId: value};
        });
    };

    changeTokenExpiration = value => {
        this.setState(prevState => {
            return {tokenExpiration: value};
        });
    };

    changeAutorizationStatus = () => {
        this.setState(prevState => {
            return {isSignIn: !prevState.isSignIn};
        });
        console.log(this.state.isSignIn);
    };
 

    render() {
        return (
            <BrowserRouter style={{height: "100%"}}>
                {console.log(`User id by App.js = ${this.state.userId}`)}
                <div style={{height: "100%"}}>
                    <Navigation autorizationStatus={this.state.isSignIn}/>
                    <Switch className="bg-dark" style={{height: "100%"}}>
                        <Route
                            path="/"
                            render={() =>
                                this.state.isSignIn ? (
                                    <MainPage isSignIn={this.state.isSignIn} userId={this.state.userId}/>
                                ) : (
                                    <Redirect to="/login"/>
                                )
                            }
                            exact
                        />
                        <Route
                            path="/logout"
                            render={() => (
                                <LogoutPage
                                    changeToken={this.changeToken}
                                    changeUserId={this.changeUserId}
                                    changeTokenExpiration={this.changeTokenExpiration}
                                    changeAutorizationStatus={this.changeAutorizationStatus}
                                />
                            )}
                            exact
                        />
                        <Route
                            path="/login"
                            render={() =>
                                !this.state.isSignIn ? (
                                    <LoginPage
                                        changeToken={this.changeToken}
                                        changeUserId={this.changeUserId}
                                        changeTokenExpiration={this.changeTokenExpiration}
                                        changeAutorizationStatus={this.changeAutorizationStatus}
                                        isSignIn={this.state.isSignIn}
                                    />
                                ) : (
                                    <Redirect to="/"/>
                                )
                            }
                            exact
                        />
                        <Route path="/registration"
                            render={() => !this.state.isSignIn ? <RegistrationPage redirectToMain={this.redirectToMain}/> : <Redirect to="/" />} exact/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

//Previous version from switch
/*<Route path="/"
    render={() => <MainPage onConvarsationChange={this.getMessagesForConversation}
        getChatName={this.getChatName}
        actualConversationID={this.state.conversations[0].id} />} exact />  */

export default App;
