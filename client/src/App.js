import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// import Apollo Client
import client from './config/graphql';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';

// import pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import TV from './pages/TV';
import Favorites from './pages/Favorites';
import DetailMovie from './pages/DetailMovie';
import DetailTV from './pages/DetailTV';
import EditMovie from './pages/EditMovie';
import EditTV from './pages/EditTV';
import AddMovie from './pages/AddMovie';
import AddTV from './pages/AddTV';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/movies">
              <Movies />
            </Route>
            <Route exact path="/tv">
              <TV />
            </Route>
            <Route exact path="/movies/add">
              <AddMovie />
            </Route>
            <Route exact path="/tv/add">
              <AddTV />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route path="/movies/:id/edit">
              <EditMovie />
            </Route>
            <Route path="/tv/:id/edit">
              <EditTV />
            </Route>
            <Route path="/movies/:id">
              <DetailMovie />
            </Route>
            <Route path="/tv/:id">
              <DetailTV />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
