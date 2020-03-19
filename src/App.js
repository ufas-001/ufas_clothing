import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop-page/shop.component'
import './App.css';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page'
import Header from './component/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'




class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        }
    }
    unsubscribeFromAuth = null;
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    })
                    console.log(this.state)
                })
                this.setState({ currentUser: userAuth })
            }

        })
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return ( < div >
            <
            Header currentUser = { this.state.currentUser }
            /> <
            Switch >
            <
            Route exact path = '/'
            component = { Homepage }
            />   <
            Route exact path = '/shop'
            component = { ShopPage }
            />   <
            Route path = '/signin'
            component = { SignInAndSignUpPage }
            />  </Switch >
            <
            /div>
        );
    }
}

export default App;