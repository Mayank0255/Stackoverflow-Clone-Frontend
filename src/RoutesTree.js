import React from 'react';
import {Switch, Route} from 'react-router-dom';
import withPageTitle from './services/withPageTitle';

import PageContainer from './components/PageContainer/PageContainer.component';
import HomePage from './pages/HomePage/HomePage.component';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage.component';
import AllTagsPage from './pages/AllTagsPage/AllTagsPage.component';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage.component';
import Register from './pages/Register/Register.component';
import Login from './pages/Login/Login.component';
import Post from './pages/Post/Post.component';
import PostForm from './pages/PostForm/PostForm.component';
import TagPage from './pages/TagPage/TagPage.component';
import ProfilePage from './pages/ProfilePage/ProfilePage.component';
import NotFound from './pages/NotFound/NotFound.component';

const HomePageComponent = withPageTitle({
  component: PageContainer({component: HomePage}),
  title:
    'CLONE Stack Overflow - Where Developers Learn, Share, & Build Careers',
});

const QuestionsPageComponent = withPageTitle({
  component: PageContainer({component: QuestionsPage}),
  title: 'All Questions - CLONE Stack Overflow',
});

const AllTagsPageComponent = withPageTitle({
  component: PageContainer({component: AllTagsPage}),
  title: 'Tags - CLONE Stack Overflow',
});

const AllUsersPageComponent = withPageTitle({
  component: PageContainer({component: AllUsersPage}),
  title: 'Users - CLONE Stack Overflow',
});

const RegisterComponent = withPageTitle({
  component: Register,
  title: 'Sign Up - CLONE Stack Overflow',
});

const LoginComponent = withPageTitle({
  component: Login,
  title: 'Log In - CLONE Stack Overflow',
});

const PostFormComponent = withPageTitle({
  component: PostForm,
  title: 'Ask a Question - CLONE Stack Overflow',
});

const NotFoundComponent = withPageTitle({
  component: NotFound,
  title: 'Error 404',
});

const PostComponent = PageContainer({component: Post});
const ProfilePageComponent = PageContainer({component: ProfilePage});
const TagPageComponent = PageContainer({component: TagPage});

const RoutesTree = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePageComponent} />
      <Route exact path='/questions' component={QuestionsPageComponent} />
      <Route exact path='/tags' component={AllTagsPageComponent} />
      <Route exact path='/users' component={AllUsersPageComponent} />
      <Route exact path='/register' component={RegisterComponent} />
      <Route exact path='/login' component={LoginComponent} />
      <Route exact path='/questions/:id' component={PostComponent} />
      <Route exact path='/users/:id' component={ProfilePageComponent} />
      <Route exact path='/tags/:tagname' component={TagPageComponent} />
      <Route exact path='/add/question' component={PostFormComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Switch>
  );
};

export default RoutesTree;
