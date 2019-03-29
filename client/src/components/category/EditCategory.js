import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { editCategory, getCategoryById } from "../../actions/categoryAction";
import AdminRoute from "../../HOC/AdminRoute";

class EditCategory extends Component {
  state = {
    _id: "",
    name: "",
    description: "",
    isAvailable: true,
    errors: {}
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getCategoryById(id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
    if (this.props.category !== prevProps.category) {
      const {
        _id,
        name,
        description,
        isAvailable
      } = this.props.category.category;
      this.setState({
        _id: _id,
        name: name,
        description: description !== null ? description : "",
        isAvailable: isAvailable
      });
    }
  }
  onChange = e => {
    const { name, value, type, checked } = e.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };
  onSubmit = async e => {
    e.preventDefault();
    const category = {
      _id: this.state._id,
      name: this.state.name,
      description: this.state.description,
      isAvailable: this.state.isAvailable
    };
    console.log(category);
    await this.props.editCategory(category, this.props.history);
  };
  render() {
    const { name, description, isAvailable, errors } = this.state;
    return (
      <div>
        <section className="forms">
          <h2>Edit Category</h2>
          <Link to="/admin/edit-category/categories" className="btn-back">
            Back
          </Link>
          <CategoryForm
            name={name || ""}
            description={description || ""}
            isAvailable={isAvailable || true}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            checked={isAvailable || true}
            errors={errors}
            btnValue="Submit"
          />
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  category: state.category,
  errors: state.errors.error
});
export default connect(
  mapStateToProps,
  { editCategory, getCategoryById }
)(AdminRoute(withRouter(EditCategory)));
