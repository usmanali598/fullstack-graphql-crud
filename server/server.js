const express = require('express')
var cors = require('cors')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  graphql
} = require('graphql')
const app = express();

app.use(cors());

let authors = [
	{ id: 1, name: 'Habib Jalib' },
	{ id: 2, name: 'Hafeez Jailndher' },
	{ id: 3, name: 'Brian Lara' }
]

let books = [
	{ id: 1, name: 'Java', authorId: 1 },
	{ id: 2, name: 'Harry Potter reading graphql', authorId: 1 },
	{ id: 3, name: 'Javascript', authorId: 1 },
	{ id: 4, name: 'C sharp', authorId: 2 },
	{ id: 5, name: 'C++', authorId: 2 },
	{ id: 6, name: 'GO Lang', authorId: 2 },
	{ id: 7, name: 'SQL', authorId: 3 },
	{ id: 8, name: 'Mongo DB', authorId: 3 }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    updateBook: {
      type: BookType,
      description: 'Update a book',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        books[args.id - 1].name = args.name;
        books[args.id - 1].authorId = args.authorId;
        return books[args.id - 1];
      }
    },
    deleteBook: {
      type: BookType,
      description: 'delete a book',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        books = books.filter(it => it.id !== args.id);
        return books[args.id];
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    },
    updateAuthor: {
      type: AuthorType,
      description: 'Update an author',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        authors[args.id - 1].name = args.name;
        return authors[args.id - 1];
      }
    },
    deleteAuthor: {
      type: AuthorType,
      description: 'delete an author',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt)},
      },
      resolve: (parent, args) => {
        authors = authors.filter(it => it.id !== args.id);
        return authors[args.id];
      }
    }
  })
})

app.get("/books", (req, res) => {
  const query = `query{books{id name authorId author{id name}}}`
  graphql(schema, query).then(response => res.send(response)).catch(err => res.send(err));
})

app.get("/book/:id", (req, res) => {
  const query = `query{book(id:${req.params.id}){id name authorId author{id name}}}`
  graphql(schema, query).then(response => res.send(response)).catch(err => res.send(err));
})

app.get("/authors", (req, res) => {
  const query = `query{authors{id name books{id name authorId}}}`
  graphql(schema, query).then(response => res.send(response)).catch(err => res.send(err));
})

app.get("/author/:id", (req, res) => {
  const query = `query{author(id:${req.params.id}){id name books{id name authorId}}}`
  graphql(schema, query).then(response => res.send(response)).catch(err => res.send(err));
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running at 5000'))