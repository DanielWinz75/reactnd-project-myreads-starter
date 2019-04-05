import React from 'react'
import './App.css'
import BookSearch from './BookSearch.js'
import BookShelf from './BookShelf.js'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    sortedBooks: [],
  }

  addBook = (book, shelf) => {
    const sortedBook = {
      book, shelf
    }
    this.setState( (prevState) => ({sortedBooks: [...prevState['sortedBooks'], sortedBook]}) );
  }

  moveBook = (event) => {
    event.preventDefault();
    const bookid = event.target.id;
    const targetShelf = event.target.value;
    let sortedBooksCopy = [...this.state.sortedBooks];
    let index = sortedBooksCopy.findIndex( sortedBook => sortedBook.book.id === bookid );
    // Remove book
    if ( targetShelf === 'none') { 
      sortedBooksCopy.splice(index, 1);
    } 
    // Move book
    else {
      sortedBooksCopy[index].shelf = targetShelf;
    }
    this.setState( { sortedBooks: sortedBooksCopy } );
  }  

  booksInShelf = (shelfType) => {
    return this.state.sortedBooks.filter( book => book.shelf === shelfType );
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch onSortBook={this.addBook} booksInShelf={this.state.sortedBooks} ></BookSearch>
        )} />
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf shelfType={'currentlyReading'} shelfName={'Currently reading'} booksInShelf={this.booksInShelf} onMoveBook={this.moveBook} ></BookShelf>
              <BookShelf shelfType={'wantToRead'} shelfName={'Want to read'} booksInShelf={this.booksInShelf} onMoveBook={this.moveBook} ></BookShelf>
              <BookShelf shelfType={'read'} shelfName={'Read'} booksInShelf={this.booksInShelf} onMoveBook={this.moveBook} ></BookShelf>
            </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
