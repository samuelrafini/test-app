import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchPage from './pages/search';
import PlayerDetailsPage from './pages/player-details';

function App() {
 
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/player-details/:id">
          <PlayerDetailsPage />
        </Route>
        <Route path="/">
          <SearchPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
