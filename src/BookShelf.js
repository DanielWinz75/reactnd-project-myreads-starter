import React from 'react'
import './App.css'
import ShelfSelect from './ShelfSelect.js'

class BookShelf extends React.Component {

  /**
  * @description Get style of book's thumbnail and its URL. Return dummy svg if URL does not exsit.
  * @returns {Object} Style object with width, height and URL to thumbnail
  */
  getThumbnailStyle(book) {
    const dummyThumbnail = './icons/dummy.svg';
    let thumbnailUrl;
    if (book.imageLinks === undefined) {
        thumbnailUrl = dummyThumbnail;
    } 
    else if (book.imageLinks.thumbnail === undefined || book.imageLinks.thumbnail === '') {
        thumbnailUrl = dummyThumbnail;
    }         
    else {
        thumbnailUrl = book.imageLinks.thumbnail;
    }
    return {
        width: 128, 
        height: 193, 
        backgroundImage: `url("${thumbnailUrl}")`
    };  
  }

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
                    <div className="book-cover" style={this.getThumbnailStyle(sortedBook)}></div>                  
                    <ShelfSelect 
                      shelfType={this.props.shelfType}
                      onMoveBook={this.props.onMoveBook}
                      bookid={sortedBook.book.id}>
                    </ShelfSelect>
                  </div>
                  <div className="book-title">{sortedBook.book.title}</div>
                  <div className="book-authors">{sortedBook.book.authors}</div>
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
