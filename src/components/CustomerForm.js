import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      noOfAccounts: "",
      listOfAccountNo: Array(5).fill(""),
      listOfType: Array(5).fill(""),
      listOfBranch: Array(5).fill(""),
      listOfBalance: Array(5).fill(""),
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

  getNoOfAccounts(e) {
    this.setState({
      noOfAccounts: e.target.value,
    });
  }

  getAccountNo(e, i) {
    let listOfAccountNo = this.state.listOfAccountNo;
    listOfAccountNo[i] = e.target.value;
    this.setState({
      listOfAccountNo: listOfAccountNo,
    });
  }

  getType(e, i) {
    let listOfType = this.state.listOfType;
    listOfType[i] = e.target.value;
    this.setState({
      listOfType: listOfType,
    });
  }

  getBranch(e, i) {
    let listOfBranch = this.state.listOfBranch;
    listOfBranch[i] = e.target.value;
    this.setState({
      listOfBranch: listOfBranch,
    });
  }

  getBalance(e, i) {
    let listOfBalance = this.state.listOfBalance;
    listOfBalance[i] = e.target.value;
    this.setState({
      listOfBalance: listOfBalance,
    });
  }

  showAccountFields() {
    const noOfAccounts = this.state.noOfAccounts;
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
              onChange={(e) => this.getAccountNo(e, i)}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="type"
              placeholder="Type of Account"
              onChange={(e) => this.getType(e, i)}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="branch"
              placeholder="Branch"
              onChange={(e) => this.getBranch(e, i)}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="balance"
              placeholder="Balance"
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
    customer.accountDetails = [];
    const noOfAccounts = this.state.noOfAccounts;
    for (let i = 0; i < noOfAccounts; i++) {
      let account = {};
      account.accountNo = this.state.listOfAccountNo[i];
      account.type = this.state.listOfType[i];
      account.branch = this.state.listOfBranch[i];
      account.balance = this.state.listOfBalance[i];
      customer.accountDetails.push(account);
    }

    axios
      .post("http://127.0.0.1:54895/customer/new", customer)
      .then((res) => {
        console.log("Post request", res);
        this.props.history.push("/customers");
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      noOfAccounts: "",
      listOfAccountNo: Array(5).fill(""),
      listOfType: Array(5).fill(""),
      listOfBranch: Array(5).fill(""),
      listOfBalance: Array(5).fill(""),
    });
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/customers" className="text-decoration-none text-primary m-2">
          &#60; Back to Customer List
        </Link>
        <hr />
        <h4 className="mb-5">Add Customer</h4>
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
          <div className="form-group row mb-3">
            <div className="col-sm-2">
              <label htmlFor="firstName" className="col-form-label ">
                No of Accounts:
              </label>
            </div>
            <div className="col-sm-4">
              <select
                class="form-control"
                onChange={(e) => this.getNoOfAccounts(e)}
              >
                <option defaultValue>Choose..</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-sm-6"></div>
          </div>
          {this.showAccountFields()}
          <div className="form-group">
            <button type="submit" className="btn btn-primary mt-2">
              Create Customer
            </button>
          </div>
        </form>
      </div>
    );
  }
}
