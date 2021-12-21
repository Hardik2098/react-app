import React from "react";
import { Link } from "react-router-dom";

export default function CustomerDetails(props) {
  function tabRow() {
    const accountDetails = props.location.state.customer.accountDetails;
    return accountDetails.map((account, i) => {
      return (
        <tr key={i}>
          <td>{account.accountNo}</td>
          <td>{account.type}</td>
          <td>{account.branch}</td>
          <td>{account.balance}</td>
        </tr>
      );
    });
  }

  return (
    <div className="mt-5 container-fluid">
      <hr />
      <Link to="/customers" className="text-decoration-none text-primary m-2">
        &#60; Back to Customer List
      </Link>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <h4>Customer Details</h4>
          <hr />
          <p>ID: {props.location.state.customer.customerId}</p>
          <p>First Name: {props.location.state.customer.firstName}</p>
          <p>Last Name: {props.location.state.customer.lastName}</p>
          <p>Email: {props.location.state.customer.email}</p>
        </div>
        <div className="col-md-8">
          <h4>List of Accounts</h4>
          <hr />
          <table class="table table-bordered table-hover">
            <thead class="table-dark">
              <tr>
                <th scope="col">Account No</th>
                <th scope="col">Type</th>
                <th scope="col">Branch</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>{tabRow()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
