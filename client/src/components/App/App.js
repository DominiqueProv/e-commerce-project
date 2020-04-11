import React, {
  useState,
  useEffect,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import GlobalStyles from '../GlobalStyles';
import Navbar from '../Navbar';
import Feed from '../Feed';
import { BigItem } from '../Items';
import Cart from '../Cart';
import HomePage from '../HomePage';
function App() {
  const [anItem, setAnItem] = useState(null)
  useEffect(() => {
    fetch('/items')
      .then(res => res.json())
      .then(res => setAnItem(res.filtered))
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Cart />
      <Switch>
        <Route path='/items' exact>
          {anItem ? <Feed /> : <div>not yet</div>}
        </Route>
        <Route path='/items/:itemId' >
          {/*render the page component*/}
          <BigItem />
        </Route>
      </Switch>
      {/*Footer*/}
    </Router>
  );
}

export default App;
