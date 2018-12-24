import React from "react";
import { Component } from "react";

class Book extends Component {
  render() {
    const category = this.props.category || "";
    let categoryValue = "";

    if (category.toLowerCase() === "currentlyreading") {
      categoryValue = "currentlyReading";
    } else if (category.toLowerCase() === "wanttoread") {
      categoryValue = "wantToRead";
    } else if (category.toLowerCase() === "read") {
      categoryValue = "read";
    } else {
      categoryValue = "none";
    }

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: 'url("' + this.props.thumbnail + '")'
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={categoryValue}
              onChange={event => {
                this.props.update(this.props.book, event.target.value);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(", ")}</div>
      </div>
    );
  }
}

export default Book;
