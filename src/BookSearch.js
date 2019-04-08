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

    /**
     * @description Constructor, registers a debouncer. Debouncer defers search input change.
     * @param {Object} props - Props from parent compoment
     */    
    constructor(props){
        super(props);
        this.handleSearchDebounced = _.debounce(this.searchAPI, 400);
    };

    /**
     * @description Search the API for books by book title and author. Stores result to component state.
     */     
    searchAPI = () => {
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
    }

    /**
     * @description Search for books. Calls the function searchAPI indirectly. Makes use of the debouncer that is implemented in the constructor. 
     * @param {Object} event - Event triggered by changes in the book search input field.
     */       
    searchBooks = (event) => {
        this.setState({query: event.target.value});
        this.handleSearchDebounced();
    }

    /**
     * @description Pass the book and the selected shelf to the parent compoment
     * @param {Object} event - Event triggered when changing the shelf by the drop down select that get attached to every book
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

    /**
    * @description Get style of book's thumbnail and its URL. Return dummy svg if URL does not exsit.
    * @returns {Object} Style object with width, height and URL to thumbnail
    */
    getThumbnailStyle(book) {
        const dummyThumbnail = '../public/dummy.svg';
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
    * @description Render Book search page
    * @returns {Object} JSX - Containing search input and the result of the book API search
    */
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
                                    <div className="book-cover" style={this.getThumbnailStyle(book)}></div>
                                    <ShelfSelect 
                                        booksInShelf={this.props.booksInShelf} 
                                        onPassBookToParent={this.passBookToParent}
                                        onMoveBook={this.props.onMoveBook}
                                        bookid={book.id}>
                                    </ShelfSelect>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
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
