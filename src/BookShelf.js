import React from 'react'
import './App.css'
import { throws } from 'assert';

class BookShelf extends React.Component {
  /**
  * @description Render Book shelf page
  * @returns {Object} JSX - Displays shelf and its content sorted by type (boards)
  */
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">

          <ol className="books-grid">
            {this.props.booksInShelf(this.props.shelfType).map( (sortedBook) => (
              <li key={sortedBook.book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={
                      {
                        width: 128, 
                        height: 193, 
                        backgroundImage: `url("${sortedBook.book.imageLinks.thumbnail}")`
                      }
                    }></div>
                    <div className="book-shelf-changer">
                      <select onChange={this.props.onMoveBook} id={sortedBook.book.id} value={this.props.shelfType}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{sortedBook.book.title}</div>
                  <div className="book-authors">{sortedBook.book.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>            
    )
  }
}

export default BookShelf
