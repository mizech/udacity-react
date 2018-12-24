import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import * as BooksAPI from "./../model/BooksAPI";
import Book from "./Book";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      substr: "",
      bookInventory: []
    };
  }

  handleInputChange = event => {
    this.setState({ substr: event.target.value }, () => {
      this.queryBooks();
    });
  };

  queryBooks() {
    let queryStr = this.state.substr;

    if (queryStr < 1) {
      this.setState({
        bookInventory: []
      });
      return;
    }

    BooksAPI.search(this.state.substr)
      .then(booksData => {
        let searchWrapper = document.querySelector("#search-error-message");
        searchWrapper.style.display = "none";

        if (booksData.error) {
          return false;
        }

        if (booksData.length) {
          this.setState({
            bookInventory: booksData
          });

          return true;
        }
      })
      .then(result => {
        if (!result) {
          this.setState({
            bookInventory: []
          });

          let searchWrapper = document.querySelector("#search-error-message");
          searchWrapper.style.display = "block";
        }

        let bookInventory = _.cloneDeep(this.state.bookInventory);
        // Make sure there's a default value
        bookInventory.forEach(book => {
          book.category = "none";
        });

        // Overwrite the default value in case the book is in access.
        bookInventory.forEach(book => {
          this.props.booksInAccess.forEach(bookInAccess => {
            if (book.id === bookInAccess.id) {
              book.category = bookInAccess.shelf;
            }
          });
        });

        this.setState({
          bookInventory
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    let booksItems = this.state.bookInventory.map((bookData, index) => {
      return (
        <li key={index}>
          <Book
            thumbnail={_.get(bookData, "imageLinks.smallThumbnail", "")}
            title={bookData.title || "Unknown"}
            authors={bookData.authors || []}
            book={bookData}
            update={this.props.update}
            category={bookData.category}
          />
        </li>
      );
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={event => {
                this.handleInputChange(event);
              }}
              placeholder="Search by title or author"
            />
          </div>
          <div id="search-error-message">
            No books found using the given search term!
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{booksItems}</ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
