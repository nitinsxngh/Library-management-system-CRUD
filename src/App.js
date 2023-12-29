import React, { Component } from "react";
import QRCode from "qrcode.react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          text: "A1",
          id: "1",
          isbn: "ISBN1",
          category: "Category1",
          rowNo: "Row1",
          bookCount: 10,
          cost: "$20",
          availability: "Available",
          showHide: false,
        },
        {
          text: "B1",
          id: "2",
          isbn: "ISBN2",
          category: "Category2",
          rowNo: "Row2",
          bookCount: 5,
          cost: "$15",
          availability: "Unavailable",
          showHide: false,
        },
      ],
      text: "",
      isbn: "",
      category: "",
      rowNo: "",
      bookCount: 0,
      cost: "",
      availability: "",
      updateText: "",
      updateISBN: "",
      updateCategory: "",
      updateBookCount: 0,
      updateCost: "",
      updateAvailability: "",
      search: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateChange = this.updateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBookCountChange = this.handleBookCountChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
  }

  render() {
    const filteredItems = this.state.items.filter(
      (item) =>
        item.text.toLowerCase().includes(this.state.search.toLowerCase()) ||
        item.isbn.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div>
        <h1>Admin: Library</h1>

        <form onSubmit={this.handleSubmit} className="form">
          <label className="form-label">
            Book Name:&nbsp;
            <input
              type="text"
              value={this.state.text}
              placeholder="Enter Name"
              onChange={this.handleInputChange.bind(this, "text")}
            />
          </label>

          <label className="form-label">
            ISBN:&nbsp;
            <input
              type="text"
              value={this.state.isbn}
              placeholder="Enter ISBN"
              onChange={this.handleInputChange.bind(this, "isbn")}
            />
          </label>

          <label className="form-label">
            Book Count:&nbsp;
            <input
              type="number"
              value={this.state.bookCount}
              placeholder="Enter Book Count"
              onChange={this.handleBookCountChange}
            />
          </label>

          <label className="form-label">
            Category:&nbsp;
            <input
              type="text"
              value={this.state.category}
              placeholder="Enter Category"
              onChange={this.handleInputChange.bind(this, "category")}
            />
          </label>

          <label className="form-label">
            Cost:&nbsp;
            <input
              type="number"
              value={this.state.cost}
              placeholder="Enter Cost"
              onChange={this.handleInputChange.bind(this, "cost")}
            />
          </label>

          <label className="form-label">
            Availability:&nbsp;
            <input
              type="text"
              value={this.state.availability}
              placeholder="Enter Availability"
              onChange={this.handleInputChange.bind(this, "availability")}
            />
          </label>

          <button type="submit" className="btn save-btn">
            Save
          </button>
        </form>

        <h1>Books List</h1>

        <input
          type="text"
          value={this.state.search}
          placeholder="Search by ISBN or Book Name"
          onChange={this.handleInputChange.bind(this, "search")}
          className="search-input"
        />

        <table className="crud-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Book Count</th>
              <th>Cost</th>
              <th>Availability</th>
              <th>QR Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className={item.showHide ? "hidden" : ""}>{item.text}</td>
                <td className={item.showHide ? "hidden" : ""}>{item.isbn}</td>
                <td className={item.showHide ? "hidden" : ""}>{item.category}</td>
                <td className={item.showHide ? "hidden" : ""}>{item.bookCount}</td>
                <td className={item.showHide ? "hidden" : ""}>{item.cost}</td>
                <td className={item.showHide ? "hidden" : ""}>{item.availability}</td>
                <td className={item.showHide ? "hidden" : ""}>
                  <QRCode value={`ISBN: ${item.isbn}, Name: ${item.text}`} />
                </td>

                <td className={item.showHide ? "" : "hidden"}>
                  <div className="update-inputs">
                    <div>
                      <span>Update Name:</span>
                      <input
                        type="text"
                        onChange={(e) => this.updateChange("updateText", e)}
                        value={this.state.updateText}
                        placeholder="Update Name:&nbsp"
                      />
                    </div>
                    <div>
                      <span>Update ISBN:</span>
                      <input
                        type="text"
                        onChange={(e) => this.updateChange("updateISBN", e)}
                        value={this.state.updateISBN}
                        placeholder="Update ISBN:&nbsp;"
                      />
                    </div>
                    <div>
                      <span>Update Category:</span>
                      <input
                        type="text"
                        onChange={(e) => this.updateChange("updateCategory", e)}
                        value={this.state.updateCategory}
                        placeholder="Update Category:&nbsp;"
                      />
                    </div>
                    <div>
                      <span>Update Book Count:</span>
                      <input
                        type="number"
                        onChange={(e) => this.updateChange("updateBookCount", e)}
                        value={this.state.updateBookCount}
                        placeholder="Update Book Count:&nbsp;"
                      />
                    </div>
                    <div>
                      <span>Update Cost:&nbsp;</span>
                      <input
                        type="number"
                        onChange={(e) => this.updateChange("updateCost", e)}
                        value={this.state.updateCost}
                        placeholder="Update Cost:&nbsp;"
                      />
                    </div>
                    <div>
                      <span>Update Availability:</span>
                      <input
                        type="text"
                        onChange={(e) => this.updateChange("updateAvailability", e)}
                        value={this.state.updateAvailability}
                        placeholder="Update Availability"
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <button
                    className={item.showHide ? "hidden" : "btn save-btn"}
                    onClick={() => this.update(item)}
                  >
                    Update
                  </button>
                  <button
                    className={item.showHide ? "btn save-btn" : "hidden"}
                    onClick={() => this.save(item)}
                  >
                    Save
                  </button>
                  <button
                    className="btn del-btn"
                    onClick={() => this.delete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  delete(item) {
    const updatedItems = this.state.items.filter((i) => i !== item);
    this.setState({ items: updatedItems });
  }

  updateChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  update(item) {
    const updatedItems = this.state.items.map((i) =>
      i === item ? { ...i, showHide: true } : { ...i, showHide: false }
    );
    this.setState({
      items: updatedItems,
      updateText: item.text,
      updateISBN: item.isbn,
      updateCategory: item.category,
      updateBookCount: item.bookCount,
      updateCost: item.cost,
      updateAvailability: item.availability,
    });
  }

  save(item) {
    const updatedItems = this.state.items.map((i) =>
      i === item
        ? {
            ...i,
            text: this.state.updateText,
            isbn: this.state.updateISBN,
            category: this.state.updateCategory,
            bookCount: this.state.updateBookCount,
            cost: this.state.updateCost,
            availability: this.state.updateAvailability,
            showHide: false,
          }
        : i
    );
    this.setState({
      items: updatedItems,
      updateText: "",
      updateISBN: "",
      updateCategory: "",
      updateBookCount: 0,
      updateCost: "",
      updateAvailability: "",
    });
  }

  handleInputChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  handleBookCountChange(e) {
    const bookCount = parseInt(e.target.value, 10);
    this.setState({ bookCount });
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.value });
  }

  handleCostChange(e) {
    this.setState({ cost: e.target.value });
  }

  handleAvailabilityChange(e) {
    this.setState({ availability: e.target.value });
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.trim()) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now().toString(),
      isbn: this.state.isbn,
      category: this.state.category,
      rowNo: this.state.rowNo,
      bookCount: this.state.bookCount,
      cost: this.state.cost,
      availability: this.state.availability,
      showHide: false,
    };

    this.setState((prevState) => ({
      items: [newItem, ...prevState.items],
      text: "",
      isbn: "",
      category: "",
      rowNo: "",
      bookCount: 0,
      cost: "",
      availability: "",
    }));
  }
}

export default App;
