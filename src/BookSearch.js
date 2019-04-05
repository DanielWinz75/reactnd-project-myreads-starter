import React from 'react'
import {search} from './BooksAPI.js'
import './App.css'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import ShelfSelect from './ShelfSelect.js'

class BookSearch extends React.Component {
    state = {
        searchedBooks: [],
        query: '',
        error: '',
    }

    constructor(props){
        super(props);
        this.handleSearchDebounced = _.debounce(function () {
            if ( this.state.query.length <= 2 ) {
                this.setState( () => ({searchedBooks: []}) );
                this.setState({error: 'Minum three characters are required to search.'});
            } else {
                search(this.state.query).then( (searchedBooks) => {
                    if (searchedBooks && searchedBooks.length > 0) {
                        this.setState({error: ''});
                        searchedBooks.map( () => 
                            this.setState( () => ({searchedBooks: searchedBooks}) )
                        )
                    } else {
                        this.setState({error: `No result for ${this.state.query}.`});
                    }
                });
            }
        }, 400);
    };

    searchBooks = (event) => {
        this.setState({query: event.target.value});
        this.handleSearchDebounced();
    }

    /**
     * Pass the book and the selected shelf to the parent compoment (App)
     */
    passBookToParent = (event) => {
        event.preventDefault();
        const bookid = event.target.id;
        const targetShelf = event.target.value;
        let selectedBook = undefined;
        for (let book of this.state.searchedBooks) {
            if(book.id === bookid) {
                selectedBook = book;
            }
        }
        this.props.onSortBook(selectedBook, targetShelf);
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
                    </div>
                </div>
                <h2 className="bookshelf-title">Search</h2>
                <h3 className="search-error">{this.state.error !== '' && this.state.error}</h3>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.error === '' && this.state.searchedBooks.map( (book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={
                                        {
                                            width: 128, 
                                            height: 193, 
                                            backgroundImage: `url("${book.imageLinks.thumbnail}")`
                                        }
                                    }></div>
                                    <ShelfSelect 
                                        booksInShelf={this.props.booksInShelf} 
                                        onPassBookToParent={this.passBookToParent}
                                        bookid={book.id}>
                                    </ShelfSelect>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.author}</div>
                            </div>
                        </li>
                    ))}
                    </ol>               
                </div>
            </div>
        )
    }
}

export default BookSearch
