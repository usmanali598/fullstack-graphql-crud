import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client/react';
import BooksQuery from './BooksQuery';
import AuthorQuery from './AuthorQuery';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

// client
//   .query({
//     query: gql`
//       query Query {
//         books{
//           id
//           name
//           authorId
//           author{id name}
//         }
//       }
//     `
//   })
//   .then(result => console.log(result, 'result on talla'));

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthorQuery />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
