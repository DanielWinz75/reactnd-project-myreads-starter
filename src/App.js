import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch.js'
import BookShelfs from './BookShelfs.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    sortedBooks: []
  }

  showSearchPage = () => this.setState({ showSearchPage: true })

  hideSearchPage = () => this.setState({ showSearchPage: false })

  updateBookShelf = (sortedBooks) => this.setState( (prevState) => ({books: [...prevState.sortedBooks, sortedBooks]}) )

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch onHideSearchPage={this.hideSearchPage} onUpdateBookShelf={this.updateBookShelf} ></BookSearch>
        ) : (
          <BookShelfs onShowSearchPage={this.showSearchPage} ></BookShelfs>
        )}
      </div>
  
    )
  }
}

export default BooksApp
