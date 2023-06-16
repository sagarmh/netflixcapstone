import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./Component/App";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ApolloProvider client={client}><App /></ApolloProvider>
    
  </BrowserRouter>
);

reportWebVitals();
