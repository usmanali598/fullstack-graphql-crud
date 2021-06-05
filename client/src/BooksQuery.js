import React, { useState, useEffect } from 'react';
import { Button, Table, Form, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksQuery = ()=> {
  const [books, setBooks] = useState();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateAuthorId, setUpdateAuthorId] = useState('');
  const [updateAuthor, setUpdateAuthor] = useState('');

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const toggle = (e) => {

    if (e.target.textContent.toLowerCase() == 'update'){
      let nodes = e.target.parentNode.parentNode;
      console.log(nodes, 'nodes')
      nodes.children[0] && setUpdateId(nodes.children[0].textContent);
      nodes.children[1] && setUpdateName(nodes.children[1].textContent);
      nodes.children[2] && setUpdateAuthorId(nodes.children[2].textContent);
      nodes.children[3] && setUpdateAuthor(nodes.children[3].textContent);
    }

    if (e.target.textContent.toLowerCase() == 'save'){
      updateBook();
      getBooks();
    }

    setModal(!modal)
  };

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
      // .then(data => console.log('data returned:', data));
      setName('');
      setAuthor('');
  }

  const updateBook = () => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `mutation{ updateBook(id:${Number(updateId)} , name:"${updateName}", authorId:${Number(updateAuthorId)}){id name authorId} }`
      })
    })
      .then(r => r.json())
      // .then(data => console.log('data returned:', data));
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
      // .then(data => console.log('data returned:', data));
  }

  const removeBook = (e)=>{
    deleteBook(e.target.id);
    getBooks();
  }

  const addBooks = ()=>{
    addBook();
    getBooks();
  }
    return (
        <div>
        <div style={{display:'grid', placeItems:'center'}}>
          <Form inline>
            <h2>Add Books</h2>
            <FormGroup>
              <Label for="name" hidden>Name</Label>
              <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="bookName" placeholder="Name of book" />
            </FormGroup>
            {' '}
            <FormGroup>
              <Label for="author" hidden>Author</Label>
              <Input type="number" value={author} name="authorId" onChange={(e) => setAuthor(e.target.value)} id="examplePassword" placeholder="Author" />
            </FormGroup>
            {' '}
            <p></p>
            <Button color="success" onClick={addBooks}>Submit</Button>
          </Form>
        </div>

        <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
          <ModalHeader toggle={toggle}>Update</ModalHeader>
          <ModalBody>
            <FormGroup disabled>
              <Label for="id">ID</Label>
              <Input type="text" name="name" value={updateId} onChange={(e) => setUpdateId(e.target.value)} id="bookId" placeholder="" disabled/>
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" value={updateName} onChange={(e) => setUpdateName(e.target.value)} id="bookName" placeholder="" />
            </FormGroup>
            <FormGroup>
              <Label for="authorId">Author Id</Label>
              <Input type="number" value={updateAuthorId} name="authorId" onChange={(e) => setUpdateAuthorId(e.target.value)} id="authorId" placeholder="" />
            </FormGroup>
            <FormGroup disabled>
              <Label for="authorName">Author Name</Label>
              <Input type="text" value={updateAuthor} name="authorName" onChange={(e) => setUpdateAuthor(e.target.value)} id="authorName" placeholder="" disabled/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>AUTHOR ID</th>
              <th>AUTHOR</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books && books.map((book) => {
            return <tr key={book.id}>
                    <td>{book.id && book.id}</td>
                    <td>{book.name && book.name}</td>
                    <td>{book.author && book.author.id}</td>
                    <td>{book.author && book.author.name}</td>
                  <td><Button color="primary" onClick={toggle}>update</Button> <Button color="danger" id={book.id} onClick={(event) => removeBook(event)}>remove</Button></td>
                  </tr>
            })
          }
          </tbody>
        </Table>
        </div>
    );
}

export default BooksQuery;