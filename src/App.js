import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import store from './redux/store';
import setAuthToken from './redux/auth/auth.utils';
import { loadUser } from './redux/auth/auth.actions';

import Header from './components/organisms/Header/Header.component';
import SideBar from './components/organisms/SideBar/SideBar.component';
import Alert from './components/Alert/Alert.component';
import HomePage from './modules/HomePage/HomePage.component';
import QuestionsPage from './modules/QuestionsPage/QuestionsPage.component';
import AllTagsPage from './modules/AllTagsPage/AllTagsPage.component';
import AllUsersPage from './modules/AllUsersPage/AllUsersPage.component';
import Register from './modules/Register/Register.component';
import Login from './modules/Login/Login.component';
import Post from './modules/Post/Post.component';
import PostForm from './modules/PostForm/PostForm.component';
import TagPage from './modules/TagPage/TagPage.component';
import ProfilePage from './modules/ProfilePage/ProfilePage.component';
import NotFound from './modules/NotFound/NotFound.component';

import { FlexBox, Box } from './components/atoms/box.atom';

import { PrivateRoute } from './Router';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Box className='App'>
        <Header/>
        <Alert/>
        <FlexBox height={`calc(100vh - 80px)`}>
          <SideBar/>
          <Box flex='1 1 0%' overflowY='scroll'>
            <Switch>
              <PrivateRoute
                exact
                path='/'
                title='Devcomm - Where Developers Learn, Share, & Build Careers'
              >
                <Redirect to='/home' />
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/home'
                title='Devcomm - Where Developers Learn, Share, & Build Careers'
              >
                <HomePage/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/questions'
                title='All Questions - Devcomm'
              >
                <QuestionsPage/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/tags'
                title='Tags - Devcomm'
              >
                <AllTagsPage/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/users'
                title='Users - Devcomm'
              >
                <AllUsersPage/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/register'
                title='Sign Up - Devcomm'
                withRightSideBar={false}
              >
                <Register/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/login'
                title='Log In - Devcomm'
                withRightSideBar={false}
              >
                <Login/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/questions/:id'
                title='Users - Devcomm'
              >
                <Post/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/users/:id'
                title='Users - Devcomm'
              >
                <ProfilePage/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/tags/:tagname'
                title='Users - Devcomm'
              >
                <TagPage/>
              </PrivateRoute>
              <PrivateRoute
                exact
                path='/add/question'
                title='Ask a Question - Devcomm'
                withRightSideBar={false}
              >
                <PostForm/>
              </PrivateRoute>
              <PrivateRoute
                path='*'
                title='Error 404'
              >
                <NotFound/>
              </PrivateRoute>
            </Switch>
          </Box>
        </FlexBox>
      </Box>
    </Provider>
  );
};

export default App;
