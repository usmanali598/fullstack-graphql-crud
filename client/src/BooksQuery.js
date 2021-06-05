import React, { useState, useEffect } from 'react';
import { Button, Table, Form, FormGroup, Label,
  Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksQuery = (props)=> {
  const [books, setBooks] = useState();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateAuthor, setUpdateAuthor] = useState('');

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const toggle = (e) => {

    if (e.target.textContent.toLowerCase() == 'update'){
      let nodes = e.target.parentNode.parentNode;
      nodes.children[0] && setUpdateId(nodes.children[0].textContent);
      nodes.children[1] && setUpdateName(nodes.children[1].textContent);
      nodes.children[2] && setUpdateAuthor(nodes.children[2].textContent);
    }

    if (e.target.textContent.toLowerCase() == 'save'){
      updateBook();
      getBooks();
    }

    setModal(!modal)
  };
  const changeUnmountOnClose = e => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  }

  const {
    buttonLabel,
    className
  } = props;

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

  const updateBook = () => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `mutation{ updateBook(id:${Number(updateId)} , name:"${updateName}", authorId:${Number(updateAuthor)}){id name authorId} }`
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
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="bookName" placeholder="Name of book" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Author</Label>
            <Input type="text" value={author} name="authorId" onChange={(e) => setAuthor(e.target.value)} id="examplePassword" placeholder="Author" />
          </FormGroup>
          <Button color="success" onClick={addBooks}>Submit</Button>
        </Form>

        <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
          <ModalHeader toggle={toggle}>Update</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">ID</Label>
              <Input type="text" name="name" value={updateId} onChange={(e) => setUpdateId(e.target.value)} id="bookName" placeholder="Name of book" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input type="text" name="name" value={updateName} onChange={(e) => setUpdateName(e.target.value)} id="bookName" placeholder="Name of book" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Author</Label>
              <Input type="text" value={updateAuthor} name="authorId" onChange={(e) => setUpdateAuthor(e.target.value)} id="examplePassword" placeholder="Author" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

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
                    <td><Button color="primary" onClick={toggle}>update</Button></td>
                    <td><Button color="danger" id={book.id} onClick={(event) => removeBook(event)}>remove</Button></td>
                  </tr>
            })
          }
          </tbody>
        </Table>
        </div>
    );
}

export default BooksQuery;