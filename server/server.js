const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { buildSchema } = require('graphql');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/graphql_mongoose_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});
const Book = mongoose.model('Book', bookSchema);

// Define a GraphQL schema
const schema = buildSchema(`
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`);

// Define GraphQL resolvers
const root = {
  books: async () => {
    return await Book.find();
  },
  addBook: async ({ title, author }) => {
    const newBook = new Book({ title, author });
    return await newBook.save();
  },
};

// Set up GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
