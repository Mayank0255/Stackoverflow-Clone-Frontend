import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import setAuthToken from "./redux/auth/auth.utils";
import { loadUser } from "./redux/auth/auth.actions";

import HomePage from './pages/HomePage/HomePage.component';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage.component';
import TagsPage from './pages/TagsPage/TagsPage.component';
import UsersPage from './pages/UsersPage/UsersPage.component';
import Register from "./pages/Register/Register.component";
import Login from "./pages/Login/Login.component";
import Post from "./pages/Post/Post.component";
import PostForm from "./pages/PostForm/PostForm.component";
import TagPage from './pages/TagPage/TagPage.component';
import UserPage from './pages/UserPage/UserPage.component';
import Alert from './components/Alert/Alert.component';
import PageTitle from "./components/PageTitle/PageTitle.component";
import Header from "./components/Header/Header.component";
import PageContainer from "./components/PageContainer/PageContainer.component";

import './App.css';

if (localStorage.token){
    setAuthToken(localStorage.token);
}

const withTitle = ({ component: Component, title }) => {
    return class Title extends React.Component {
        render() {
            return (
                <React.Fragment>
                    <PageTitle title={title} />
                    <Component {...this.props} />
                </React.Fragment>
            );
        }
    };
};

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
                    <Route exact path='/' component={withTitle({
                        component: PageContainer({ component: HomePage }),
                        title: 'CLONE Stack Overflow - Where Developers Learn, Share, & Build Careers'
                    })} />
                    <Route exact path='/questions' component={withTitle({
                        component: PageContainer({ component: QuestionsPage }),
                        title: 'All Questions - CLONE Stack Overflow'
                    })} />
                    <Route exact path='/tags' component={withTitle({
                        component: PageContainer({ component: TagsPage }),
                        title: 'Tags - CLONE Stack Overflow'
                    })} />
                    <Route exact path='/users' component={withTitle({
                        component: PageContainer({ component: UsersPage }),
                        title: 'Users - CLONE Stack Overflow'
                    })} />
                    <Route exact path='/jobs' component={withTitle({
                        component: PageContainer({ component: HomePage }),
                        title: 'CLONE Stack Overflow - Where Developers Learn, Share, & Build Careers'
                    })} />
                    <Route exact path='/register' component={withTitle({
                        component: Register,
                        title: 'Sign Up - CLONE Stack Overflow'
                    })} />
                    <Route exact path='/login' component={withTitle({
                        component: Login,
                        title: 'Log In - CLONE Stack Overflow'
                    })} />
                    <Route exact path='/questions/:id' component={PageContainer({ component: Post })} />
                    <Route exact path='/users/:id' component={PageContainer({ component: UserPage })} />
                    <Route exact path='/tags/:tagname' component={PageContainer({ component: TagPage })} />
                    <Route exact path='/add/question' component={withTitle({
                        component: PostForm,
                        title: 'Ask a Question - CLONE Stack Overflow'
                    })} />
                    <Route path='*' component={withTitle({
                        component: PageContainer({ component: HomePage }),
                        title: 'CLONE Stack Overflow - Where Developers Learn, Share, & Build Careers'
                    })} />
                </Switch>
            </div>
        </Provider>
    );
};

export default App;
