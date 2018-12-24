import React from "react";
import { Switch, Route } from "react-router-dom";

import * as BooksAPI from "./model/BooksAPI";
import ListBooks from "./view/ListBooks";
import SearchPage from "./view/SearchPage";
import "./App.css";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookInventory: [],
      categories: ["Currently Reading", "Want to Read", "Read"]
    };
  }

  componentWillMount() {
    BooksAPI.getAll().then(booksAvailable => {
      this.setState({
        bookInventory: booksAvailable
      });
    });
  }

  updateBookInventory = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(newBookInventory => {
        book.shelf = shelf;
        this.setState(state => ({
          bookInventory: state.bookInventory
            .filter(currentBook => {
              return currentBook.id !== book.id;
            })
            .concat(book)
        }));
      });
    });
  };

  render() {
    return (
      <Switch className="app">
        <Route
          path="/search"
          exact
          render={history => {
            return (
              <SearchPage
                update={this.updateBookInventory}
                booksInAccess={this.state.bookInventory}
              />
            );
          }}
        />
        <Route
          path="/"
          exact
          render={() => {
            return (
              <ListBooks
                categories={this.state.categories}
                books={this.state.bookInventory}
                update={this.updateBookInventory}
              />
            );
          }}
        />
      </Switch>
    );
  }
}

export default BooksApp;
