import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class EditCustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: props.location.state.customer.customerId,
      firstName: props.location.state.customer.firstName,
      lastName: props.location.state.customer.lastName,
      email: props.location.state.customer.email,
      accountDetails: props.location.state.customer.accountDetails,
    };
  }

  getFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  getLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  getEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  getAccountNo(e, i) {
    let updatedAccountNo = e.target.value;
    let updatedAccountDetails = this.state.accountDetails;
    updatedAccountDetails[i].accountNo = updatedAccountNo;
    this.setState({
      accountDetails: updatedAccountDetails,
    });
  }

  getType(e, i) {
    let updatedType = e.target.value;
    let updatedAccountDetails = this.state.accountDetails;
    updatedAccountDetails[i].type = updatedType;
    this.setState({
      accountDetails: updatedAccountDetails,
    });
  }

  getBranch(e, i) {
    let updatedBranch = e.target.value;
    let updatedAccountDetails = this.state.accountDetails;
    updatedAccountDetails[i].branch = updatedBranch;
    this.setState({
      accountDetails: updatedAccountDetails,
    });
  }

  getBalance(e, i) {
    let updatedBalance = e.target.value;
    let updatedAccountDetails = this.state.accountDetails;
    updatedAccountDetails[i].balance = updatedBalance;
    this.setState({
      accountDetails: updatedAccountDetails,
    });
  }

  showAccountFields() {
    const noOfAccounts = this.state.accountDetails.length;
    let accountFields = [];
    for (let i = 0; i < noOfAccounts; i++) {
      accountFields.push(
        <div className="form-group row mb-3" key={i}>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="accountNo"
              placeholder="Account No"
              value={this.state.accountDetails[i].accountNo}
              onChange={(e) => this.getAccountNo(e, i)}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="type"
              placeholder="Type of Account"
              value={this.state.accountDetails[i].type}
              onChange={(e) => this.getType(e, i)}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="branch"
              placeholder="Branch"
              value={this.state.accountDetails[i].branch}
              onChange={(e) => this.getBranch(e, i)}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="balance"
              placeholder="Balance"
              value={this.state.accountDetails[i].balance}
              onChange={(e) => this.getBalance(e, i)}
            />
          </div>
        </div>
      );
    }
    return accountFields;
  }

  handleSubmit(e) {
    e.preventDefault();
    let customer = {};
    customer.firstName = this.state.firstName;
    customer.lastName = this.state.lastName;
    customer.email = this.state.email;
    customer.accountDetails = this.state.accountDetails;
    console.log(customer);

    axios
      .put(
        `http://localhost:9000/customer/update/${this.state.customerId}`,
        customer
      )
      .then((res) => {
        console.log("Put request", res);
        this.props.history.push("/customers");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/customers" className="text-decoration-none text-primary m-2">
          &#60; Back to Customer List
        </Link>
        <hr />
        <h4 className="mb-5">Edit Customer</h4>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <h5 className="mb-3">Personal Details : </h5>
          <div className="form-group row">
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={(e) => this.getFirstName(e)}
              />
            </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={(e) => this.getLastName(e)}
              />
            </div>
            <div className="col-sm-4">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.getEmail(e)}
              />
            </div>
          </div>
          <h5 className="mt-3 mb-3">Account Details : </h5>
          {this.showAccountFields()}
          <div className="form-group">
            <button type="submit" className="btn btn-primary mt-2">
              Edit Customer
            </button>
          </div>
        </form>
      </div>
    );
  }
}
