import React from 'react'

/**
* @description Render shelf selector that is attached to the books on the search page. If book is already in shelf the button style differs.
* @constructor
* @param {Object} props - Properties from the parent compoment / component that is calling this stateless functional component
* @returns {Object} JSX - Displays the drop down where the book should be added to
*/
function ShelfSelect(props) {
    const shelfType = getShelfType(props);
    const isShelfed = (shelfType !== 'move') ? true : false;
    const className = isShelfed ?  "book-shelf-changer shelfed" : "book-shelf-changer";
    const firstItemText = isShelfed ? "In shelf ..." : "Move to ...";
    return (
        <div className={className}>
            <select onChange={props.onPassBookToParent} id={props.bookid} value={shelfType}>
                <option value="move" disabled>{firstItemText}</option>
                <option value="currentlyReading" disabled={isShelfed}>Currently Reading</option>
                <option value="wantToRead" disabled={isShelfed}>Want to Read</option>
                <option value="read" disabled={isShelfed}>Read</option>
            </select>
        </div>
    );
}

/**
* @description Get the type of the shelf/board where is book is already sorted to.
* @param {Object} props - Properties from the parent compoment forewared by function ShelfSelect
* @returns {string} shelfType - Type of shelf/board
*/
function getShelfType(props) {
    const shelfedBooks = props.booksInShelf;
    let shelfType = 'move';
    if (shelfedBooks && shelfedBooks.length > 0) {
        const shelfedBook = (shelfedBooks.filter( (shelfedBook) => props.bookid === shelfedBook.book.id ));
        if (shelfedBook.length > 0) {
            shelfType = shelfedBook[0].shelf;
        }
    }
    return shelfType;
}

export default ShelfSelect
