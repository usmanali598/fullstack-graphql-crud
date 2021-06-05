import React, { useState, useEffect } from 'react';

function AuthorQuery() {
  const [authors, setAuthors] = useState();

  useEffect(()=>{
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: "{ authors{id name books{id name}} }" })
    })
      .then(r => r.json())
      .then(data => setAuthors(data.data.authors));
  },[])

  console.log(authors, 'authors')
    return (<>
      {authors && authors.map(({ id, name, books }) => {
        return <div key={id}>
          <p>
            <b>{id} - {name}</b> <ul> {books.map(it => <li>{it.name}</li>)}</ul>
          </p>
        </div>})
      }
        </>);
}

export default AuthorQuery;