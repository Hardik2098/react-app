import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:54895/customer/get")
      .then((res) => {
        this.setState({ customers: res.data });
        console.log("Get request", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete(e, id) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => this.handleDeleteYes(e, id),
        },
        {
          label: "No",
          onClick: (e) => this.handleDeleteNo(e),
        },
      ],
    });
  }

  handleDeleteYes(e, id) {
    console.log(id);
    axios
      .delete(`http://127.0.0.1:54895/customer/delete/${id}`)
      .then((res) => {
        console.log("Delete request", res);
        axios
          .get("http://127.0.0.1:54895/customer/get")
          .then((res) => {
            this.setState({ customers: res.data });
            console.log("Get request", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.props.history.push("/customers");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDeleteNo(e) {
    this.props.history.push("/customers");
  }

  tabRow() {
    return this.state.customers.map((customer, i) => {
      return (
        <tr key={i}>
          <td>{customer.customerId}</td>
          <td>{customer.firstName}</td>
          <td>{customer.lastName}</td>
          <td>{customer.email}</td>
          <td>
            <Link
              to={{
                pathname: `/customers/${customer.customerId}`,
                state: { customer },
              }}
              className="text-decoration-none text-primary m-2"
            >
              <button type="button" className="btn btn-primary">
                Show
              </button>
            </Link>
            <Link
              to={{
                pathname: `/customers/edit/${customer.customerId}`,
                state: { customer },
              }}
              className="text-decoration-none text-primary m-2"
            >
              <button type="button" className="btn btn-primary">
                Edit
              </button>
            </Link>
            <Link
              onClick={(e) => this.handleDelete(e, customer.customerId)}
              className="text-decoration-none text-primary m-2"
            >
              <button type="button" className="btn btn-primary">
                Delete
              </button>
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="mt-5 container-fluid">
        <hr />
        <Link
          to={{
            pathname: "/customers/new",
            state: { customer: { firstName: "", lastName: "", email: "" } },
          }}
          className="text-decoration-none text-primary"
        >
          Create new customer
        </Link>
        <hr />
        <h4>Customer List</h4>
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
