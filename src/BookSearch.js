import React, {Component} from 'react'
import {getAll} from './BooksAPI.js'
import {sortedBooks} from './BookShelf.js'
import './App.css'
import { stat } from 'fs';

class BookSearch extends React.Component {

    state = {
        books: [],
        sortedBooks: []
    }

    componentDidMount() {
        getAll().then( (books) => {
            books.map( (book) => 
                this.setState( (prevState) => ({books: [...prevState.books, book]}) )
            )
        });
    }

    coverStyle = (bookid) => {
        return {
            width: 128, 
            height: 193, 
            backgroundImage: 'url("http://books.google.com/books/content?id=' + bookid + '&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
        }
    }

    handleSelect = (event) => {
        const bookid = event.target.name;
        const targetShelf = event.target.value;
        let selectedBook = undefined;
        for (let book of this.state.books) {
            if(book.id === bookid) {
                selectedBook = book;
            }
        }
        const sortedBook = {
            selectedBook, targetShelf
        }
        this.setState( (prevState) => ({sortedBooks: [...prevState.sortedBooks, sortedBook]}) );
    }

    handleSubmit = () => {
        // TODO: put sorted books to the sortedbooks array in the App state
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
                    <button className="close-search" onClick={this.props.onHideSearchPage}>Close</button>
                    <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <form onSubmit={this.handleSubmit}>
                    <ol className="books-grid">
                    {this.state.books.map( (book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={this.coverStyle(book.id)}></div>
                                    <div className="book-shelf-changer">
                                    <select onChange={this.handleSelect} name={book.id}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.author}</div>
                            </div>
                        </li>
                    ))}
                    </ol>
                    </form>                    
                </div>
            </div>)
    }
}

export default BookSearch
