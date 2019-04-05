import React from 'react'
import './App.css'
import BookSearch from './BookSearch.js'
import BookShelf from './BookShelf.js'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    sortedBooks: [],
  }

  /**
  * @description Constructor, get sorted books from local storage if exists.
  * @param {Object} props - Props from parent compoment
  */
  constructor(props) {
    super(props);
    this.state = {
      sortedBooks: JSON.parse(localStorage.getItem('sortedBooks')) || []
    }    
  }

  /**
  * @description Add a book to the shelf. Persist state to local storage.
  * @param {Object} book - The book object as received from the API
  * @param {string} shelf - The type of the shelf (board where the book is placed)
  */
  addBook = (book, shelf) => {
    const sortedBook = {
      book, shelf
    }
    let extendedBooks = [...this.state.sortedBooks, sortedBook];
    this.setState( {sortedBooks: extendedBooks} );
    localStorage.setItem('sortedBooks', JSON.stringify(extendedBooks));
  }  

  /**
  * @description Move a book to another shelf-type (board). Persist state to local storage.
  * @param {Object} event - The change event from the shelf selection drop down menu
  */
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
    localStorage.setItem('sortedBooks', JSON.stringify(sortedBooksCopy));
  }  

  /**
  * @description Get books filtered by shelf type
  * @param {string} shelfType - Type of the shelf
  * @returns {Object} booksInShelf - Array of books by shelf type
  */
  booksInShelf = (shelfType) => {
    return this.state.sortedBooks.filter( book => book.shelf === shelfType );
  }

  /**
  * @description Render App (top/main Component)
  * @returns {JSX} JSX containing routes for main page and search page
  */
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch onSortBook={this.addBook} booksInShelf={this.state.sortedBooks} onMoveBook={this.moveBook} ></BookSearch>
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
