const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
const { findByIdAndDelete } = require("../models/book");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			// parent being the book, resolve grabs data we need
			resolve(parent, args) {
				return Author.findById(parent.authorId);
			},
		},
	}),
});
//schema of what an author is
const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({ authorId: parent.id });
			},
		},
	}),
});

// how to initially jump into graph. for querying
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			// code to get data from db / other source.
			resolve(parent, args) {
				console.log(`in the root query book`);
				return Book.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({});
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				console.log(`in the root query authors`);
				return Author.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			//args comes from front end
			resolve(parent, args) {
				// new Author from mongoose
				let author = new Author({
					name: args.name,
					age: args.age,
				});
				return author.save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				console.log(`adding book`);

				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			},
		},
		deleteBook: {
			type: BookType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				console.log(`deleting book`);

				let id = Book.findByIdAndDelete(args.id);
				return id;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
