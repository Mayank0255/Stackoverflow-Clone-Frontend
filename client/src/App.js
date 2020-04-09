import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'

import './App.css';

import HomePage from './pages/HomePage/HomePage.component';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage.component';
import TagsPage from './pages/TagsPage/TagsPage.component';
import UsersPage from './pages/UsersPage/UsersPage.component';
import Register from "./pages/Register/Register.component";
import Login from "./pages/Login/Login.component";
import Post from "./pages/Post/Post.component";
import PostForm from "./pages/PostForm/PostForm.component";
import TagPage from './pages/TagPage/TagPage.component';

import Alert from './components/alert/alert.component';
import { loadUser } from "./redux/auth/auth.actions";

import Header from "./components/header/header.component";
import setAuthToken from "./redux/auth/auth.utils";

if (localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    } , []);

    return (
        <Provider store={store}>
            <div className="App">
                <Header />
                <Alert />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/questions' component={QuestionsPage} />
                    <Route exact path='/tags' component={TagsPage} />
                    <Route exact path='/users' component={UsersPage} />
                    <Route exact path='/jobs' component={HomePage} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/questions/:id' component={Post} />
                    <Route exact path='/tags/:tagname' component={TagPage} />
                    <Route exact path='/add/question' component={PostForm} />
                </Switch>
            </div>
        </Provider>
    );
};

export default App;
