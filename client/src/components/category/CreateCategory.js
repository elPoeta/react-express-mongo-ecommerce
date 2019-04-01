import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CategoryForm from "./CategoryForm";
import { addCategory } from "../../actions/categoryAction";
import AdminRoute from "../../HOC/AdminRoute";

class CreateCategory extends Component {
  state = {
    name: "",
    description: "",
    isAvailable: true,
    isAdd: false,
    errors: {}
  };
  componentDidUpdate(prevProps) {
    if (this.props.category.category !== prevProps.category.category) {
      this.setState({
        name: '',
        description: '',
        isAvailable: true,
        errors: {},
        isAdd: true
      })
    }
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
  }
  onChange = e => {
    const { name, value, type, checked } = e.target;
    type === "checkbox"
      ? this.setState({ [name]: checked, isAdd: false })
      : this.setState({ [name]: value, isAdd: false });
  };
  onSubmit = async e => {
    e.preventDefault();
    const category = {
      name: this.state.name,
      description: this.state.description,
      isAvailable: this.state.isAvailable
    };
    console.log(category);
    await this.props.addCategory(category);
  };
  render() {
    const { name, description, isAvailable, isAdd, errors } = this.state;
    return (
      <div>
        <section className="forms">
          <h2>Add Category</h2>
          <Link to="/dashboard" className="btn-back">
            Back
          </Link>
          <CategoryForm
            name={name}
            description={description}
            isAvailable={isAvailable}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            checked={isAvailable}
            errors={errors}
            isAdd={isAdd}
            btnValue="Add Category"
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
  { addCategory }
)(AdminRoute(CreateCategory));
