import React from 'react'
import './App.css'
import BookShelf from './BookShelf.js'

class BookShelfs extends React.Component {
    render() {        
        return(
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <BookShelf type={'Currently Reading'}></BookShelf>
                  <BookShelf type={'Want to Read'}></BookShelf>
                  <BookShelf type={'Read'}></BookShelf>
              </div>
            </div>
            <div className="open-search">
              <button onClick={this.props.onShowSearchPage}>Add a book</button>
            </div>
          </div>            
        )
    }
}

export default BookShelfs
