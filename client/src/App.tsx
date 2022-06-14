import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import SignupForm from './components/forms/SignUpForm';
import ForgotPasswordForm from './components/forms/ForgotPasswordForm';
import LoginForm from './components/forms/LoginForm';
import VerifyUser from './pages/VerifyUser';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token') || cookies.get('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='container-fluid'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/signup' component={SignupForm} />
            <Route exact path='/forgotPassword' component={ForgotPasswordForm} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/confirm/:userId' component={VerifyUser} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
