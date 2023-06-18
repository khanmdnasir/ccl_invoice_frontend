import React from "react";
import "./settings.css";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 settings_page">
          <h6>General</h6>
          <Link to="/app/company_settings">
            <div
              className="card"
              style={{
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <h4>Organization Detail</h4>
              <p>Address, Logo & basic financial information </p>
            </div>
          </Link>
          <Link to="/app/users">
            <div className="card">
              <h4>Users</h4>
              <p>Add, Remove & modify users of this organisation</p>
            </div>
          </Link>
          <Link to="/app/roles">
            <div className="card">
              <h4>Roles</h4>
              <p>Add,modify roles for users </p>
            </div>
          </Link>
          <Link to="/app/currency">
            <div className="card">
              <h4>Currencies</h4>
              <p>Add, modify currency for this organisation</p>
            </div>
          </Link>
          
        </div>
        <div className="col-md-6 settings_page">
          <h6>Feature</h6>
          <Link to="/app/chart_of_accounts">
            <div className="card border-b">
              <h4>Chart of accounts</h4>
              <p>Add chart of account of this organisation</p>
            </div>
          </Link>
          <Link to="/app/key_account_manager">
            <div
              className="card"
              style={{
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <h4>Key account manager</h4>
              <p>Add key account manager of this organisation</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
