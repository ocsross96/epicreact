// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(initialName);

  function handleChange(ev) {
    // 🐨 update the name here based on event.target.value
    setName(ev.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting initialName="Ross" />;
}

export default App;
