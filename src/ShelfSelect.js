import React from 'react'

/**
* @description Render shelf selector that is attached to the books on the search page. If book is already in shelf the button style differs.
* @constructor
* @param {Object} props - Properties from the parent compoment / its may be called by BookShelf or BookSearch component
* @returns {Object} JSX - Displays the drop down where the book should be added to
*/
function ShelfSelect(props) {
    // if props.shelfType was passed to this function it is called by BookShelf component:
    const calledByBookShelf = (props.shelfType) ? true : false;
    const shelfType = (calledByBookShelf) ? props.shelfType : getShelfType(props);
    // as long book was shelfed the shelfType is move:
    const isShelfed = (shelfType !== 'move') ? true : false;
    // make button orange on if book was already shelfed - only when this function was called by BookSearch component:
    const className = (isShelfed && !calledByBookShelf) ?  "book-shelf-changer shelfed" : "book-shelf-changer";
    // move if already shelfed, add otherwise:
    const handleBook = (isShelfed) ? props.onMoveBook : props.onPassBookToParent;
    return (
        <div className={className}>
            <select onChange={handleBook} id={props.bookid} value={shelfType}>
                <option value="move" disabled>Move to ...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want to Read</option>
                <option value="read" >Read</option>
                {
                    // display delete option either on BookShelf component or in case the book is already shelfed
                    (calledByBookShelf || isShelfed) && (<option value="none" >None</option>) 
                }
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
