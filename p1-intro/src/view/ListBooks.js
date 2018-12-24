import React from "react";
import { Component } from "react";

import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              category={this.props.categories[0]}
              books={this.props.books}
              update={this.props.update}
            />
            <BookShelf
              category={this.props.categories[1]}
              books={this.props.books}
              update={this.props.update}
            />
            <BookShelf
              category={this.props.categories[2]}
              books={this.props.books}
              update={this.props.update}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
