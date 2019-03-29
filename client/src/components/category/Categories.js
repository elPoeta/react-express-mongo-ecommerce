import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import AdminRoute from "../../HOC/AdminRoute";
import { getCategories, deleteCategory } from "../../actions/categoryAction";
import Spinner from "../common/spinner/Spinner";

import "./Categories.css";

class Categories extends Component {
  state = {
    showModal: false,
    id: ""
  };
  async componentDidMount() {
    await this.props.getCategories();
  }
  handleOpenModal = id => {
    this.setState({ showModal: true, id });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleConfirmDelete = async () => {
    this.setState({ showModal: false });
    await this.props.deleteCategory(this.state.id);
  };
  render() {
    const { categories, loading } = this.props.category;
    let displayContent = "";

    if (loading) {
      return <Spinner classNames="spinne3" />;
    } else {
      displayContent = categories.map(category => (
        <li className="grid-credentials" key={category._id}>
          <span>{category.name}</span>
          <span>
            {category.isAvailable ? (
              <i className="far fa-check-square i-true" />
            ) : (
              <i className="fas fa-times i-del" />
            )}
          </span>
          <span>
            <Link to={`/admin/edit-category/${category._id}`}>
              <i className="fas fa-edit i-edit" />
            </Link>
          </span>
          <span>
            <i
              className="fas fa-trash-alt i-del"
              onClick={() => this.handleOpenModal(category._id)}
            />
          </span>
        </li>
      ));
    }
    return (
      <section className="forms">
        <div className="credentials">
          <h2>Categories</h2>
          <ul>
            <li className="grid-credentials title-credentials" key={-1}>
              <span>Name</span>
              <span>Available</span>
              <span>Edit</span>
              <span>Delete</span>
            </li>
            <hr />
            {displayContent}
            <hr />
          </ul>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={false}
            style={customStyles}
          >
            <h3>Are you sure delete this category ?</h3>
            <div className="btn-modal-container">
              <ul>
                <li>
                  <button
                    className="btn-modal-close"
                    onClick={this.handleCloseModal}
                  >
                    Cancel
                  </button>
                </li>
                <li>
                  {" "}
                  <button
                    className="btn-modal-confirm"
                    onClick={this.handleConfirmDelete}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </ReactModal>
        </div>
      </section>
    );
  }
}

ReactModal.setAppElement("#root");
const customStyles = {
  content: {
    color: "darkred",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  },
  overlay: {
    backgroundColor: "#444",
    opacity: "0.9"
  }
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories, deleteCategory }
)(AdminRoute(Categories));
