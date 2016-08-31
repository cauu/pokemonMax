import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../container/App.jsx';
import Index from '../page/Index.jsx';
import PokemonCalc from '../page/PokemonCalc.jsx';

const rootRoute = {
  path: '/',
  component: App,
  indexRoute: { 
    component: Index 
  },
  onEnter(nextState, replace) {
  }
};

export default function(history) {
  return (
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Index } />
        <Route path="calc/:id" component={ PokemonCalc } />
      </Route>
    </Router>
  );
}
