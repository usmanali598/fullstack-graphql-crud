import React, { useState, useEffect } from 'react';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksQuery = ()=> {
  const [books, setBooks] = useState();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = () => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `mutation{ addBook(name:"${name}", authorId:${Number(author)}){id name authorId} }`
      })
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  }

  const getBooks = () => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: "{ books{id name authorId author{id name} } }"
      })
    })
      .then(r => r.json())
      .then(data => setBooks(data.data.books));
  }

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = (id) => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `mutation{ deleteBook(id:${id}){id} }` })
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  }

  const removeBook = (e)=>{
    deleteBook(e.target.id);
    getBooks();
  }

  const addBooks = ()=>{
    addBook();
    getBooks();
  }
  console.log(name, author, 'book')
    return (
        <div>
        <Form >
            <Label for="exampleEmail">Name</Label>
          <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="bookName" placeholder="Name of book" />
          <FormGroup>
            <Label for="examplePassword">Author</Label>
            <Input type="text" value={author} name="authorId" onChange={(e) => setAuthor(e.target.value)} id="examplePassword" placeholder="Author" />
          </FormGroup>
          <Button color="success" onClick={addBooks}>Submit</Button>
        </Form>
   
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AUTHOR</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books && books.map((book) => {
            return <tr key={book.id}>
                    <td>{book.id && book.id}</td>
                    <td>{book.name && book.name}</td>
                    <td>{book.author && book.author.name}</td>
                    <td><Button color="primary">update</Button></td>
                    <td><Button color="danger" id={book.id} 
                onClick={(event) => removeBook(event)}>remove</Button></td>
                  </tr>
            })
          }
          </tbody>
        </Table>
        </div>
    );
}

export default BooksQuery;