import React from "react";
import { Component } from "react";

import Book from "./Book";

class BookShelf extends Component {
  render() {
    const compareCategory = this.props.category.replace(/\s/g, "");
    let booksData = this.props.books.filter(book => {
      return book.shelf.toLowerCase() === compareCategory.toLowerCase();
    });

    let books = booksData.map((bookData, index) => {
      return (
        <li key={index}>
          <Book
            thumbnail={bookData.imageLinks.smallThumbnail}
            title={bookData.title}
            authors={bookData.authors}
            shelf={bookData.shelf}
            book={bookData}
            update={this.props.update}
            category={compareCategory}
          />
        </li>
      );
    });

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{books}</ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
