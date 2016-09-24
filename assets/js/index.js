import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

main();

function main() {
  const app = document.getElementById("container")
  ReactDOM.render(<App />, app);
};