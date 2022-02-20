import React from 'react';
import { Provider } from 'react-redux';
import {store} from './store';

import OrderBook from './components/OrderBook/OrderBook';

import './App.scss';

function App() {

  store.subscribe((ev) => {
    window.sessionStorage.setItem('store', JSON.stringify(store.getState()));
  });

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h2>Demo Bitfinex Order Book widget</h2>
        </header>
        <main>
          <OrderBook />
        </main>
      </div>
    </Provider>
  );
}

export default App;
