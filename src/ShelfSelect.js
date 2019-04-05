import React from 'react'

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
