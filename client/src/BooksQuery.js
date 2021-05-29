import React from 'react';
import { Button, Table } from 'reactstrap';
import { useQuery, gql, useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { request, gql } from 'graphql-request'
const Books_Kirja = gql`
  query Books {
    books{
      id
      name
      authorId
      author {
          id 
          name
        }
    }
  }
`;

const CREATE_BOOKS = gql`
  mutation CreateBooks($text: String!) {
    createBooks(text: $text)
  }
`;

const REMOVE_BOOKS = gql`
  mutation RemoveBooks($id: String!) {
    removeBooks(id: $id)
  }
`;

const UPDATE_BOOKS = gql`
  mutation UpdateBooks($id: String!) {
    updateBooks(id: $id)
  }
`;

const getBooks = ()=>{
  fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query: "{ books{id name} }" })
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
}

const deleteBook = ()=>{
  fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ "query": "mutation{ deleteBook(id:1){id} }" })
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
}

const BooksQuery = ({id})=> {

  // console.log(id, 'katso')
    // const { loading, error, data } = useQuery(Books_Kirja);
    // const [deleteBook] = useMutation(REMOVE_BOOKS);

    // const handleOnClick = (event) => {
    //   event.preventDefault();

    //   deleteBook({ variables: { id } });
    // };
    // // console.log(data, 'data', Books_Kirja, 'Books')
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <div>
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
          {/* {data.books.map((book) => {
            return <tr>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.author.name}</td>
                    <td><Button color="success">update</Button></td>
                    <td><Button color="danger" 
                onClick={() => {
                  deleteBook({ variables: { id: book.id } });
                  window.location.reload();
                }}>remove</Button></td>
                  </tr>
            })
          } */}
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