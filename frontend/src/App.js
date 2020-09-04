import React from 'react';
import './App.css';

import ListItem from './components/ListItem/ListItem';

function App() {
  return (
    <div className='App'>
      <h1>To-Do List</h1>
      <div className='List'>
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
}

export default App;
