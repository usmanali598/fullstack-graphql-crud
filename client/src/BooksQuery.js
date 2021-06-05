import React, { useState, useEffect } from 'react';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksQuery = ()=> {
  const [books, setBooks] = useState();

  const addBook = (name, authorId) => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `mutation{ addBook(name:${name}, authorId:${authorId}){id name authorId} }`
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

  // const addBooks = (e)=>{
  //   addBook(e.target.id);
  //   getBooks();
  // }
  console.log(books, 'book')
    return (
        <div>
        <Form >
            <Label for="exampleEmail">Name</Label>
            <Input type="email" name="name" id="bookName" placeholder="Name of book" />
          <FormGroup>
            <Label for="examplePassword">Author</Label>
            <Input type="password" name="authorId" id="examplePassword" placeholder="Author" />
          </FormGroup>
          <Button color="success">Submit</Button>
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

// function App() {
//   let input;
//   const { data, loading, error } = useQuery(READ_TODOS);
//   const [createTodo] = useMutation(CREATE_TODO);
//   const [deleteTodo] = useMutation(REMOVE_TODO);
//   const [updateTodo] = useMutation(UPDATE_TODO);

//   if (loading) return <p>loading...</p>;
//   if (error) return <p>ERROR</p>;
//   if (!data) return <p>Not found</p>;

//   return (
//     <div className="app">
//       <h3>Create New Todo</h3>
//       <form onSubmit={e => {
//         e.preventDefault();
//         createTodo({ variables: { text: input.value } });
//         input.value = '';
//         window.location.reload();
//       }}>
//         <input className="form-control" type="text" placeholder="Enter todo" ref={node => { input = node; }}></input>
//         <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
//       </form>
//       <ul>
//         {data.todos.map((todo) =>
//           <li key={todo.id} className="w-100">
//             <span className={todo.completed ? "done" : "pending"}>{todo.text}</span>
//             <button className="btn btn-sm btn-danger rounded-circle float-right" onClick={() => {
//               deleteTodo({ variables: { id: todo.id } });
//               window.location.reload();
//             }}>X</button>
//             <button className={`btn btn-sm float-right ${todo.completed ? "btn-success" : "btn-info"}`} onClick={() => {
//               updateTodo({ variables: { id: todo.id } });
//               window.location.reload();
//             }}>{todo.completed ? <span>Completed</span> : <span>Not completed</span>}</button>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;