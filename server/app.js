const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(
	`mongodb+srv://andrewcbuensalida:${process.env.DB_PASSWORD}@graphql-net-ninja-books.iirvr.mongodb.net/graphql-net-ninja-books-db?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
	console.log("connected to the database i hope");
});

// bind express with graphql
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Hello. Now listening for requests on port ${PORT}`);
});
