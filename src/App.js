import React from 'react';
import UserHome from './user/UserHome';
import BankHome from './bank/BankHome';
import PaymentHome from './payment/PaymentHome';
import DepositHome from './deposit/DepositHome';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  //init data
  const users=[
    { 
      id: 1, 
      name: 'Geri', 
      email: 'geriarif@getMaxListeners.com', 
      phone:'08123456789',
      address:'Malang',
      countryCode:'ID',
      bankName:'BCA',
      accountNumber:'123qweasdzc',
      balance:0
    }
  ]
  const banks=[
    {
      id:1,
      name:"BCA",
      code:"bca"
    }
  ]
  const payments=[]
  const deposits=[]
  localStorage.setItem("users",JSON.stringify(users))
  localStorage.setItem("banks",JSON.stringify(banks))
  localStorage.setItem("payments",JSON.stringify(payments))
  localStorage.setItem("deposits",JSON.stringify(deposits))

  return (
    <Router>
      <div className="header">
        <div className="container">
          <div className="flex-row">
            <div className="flex-large">
            <Link className="button" to="/">User</Link>
            <Link className="button" to="/bank/">Bank</Link>
            <Link className="button" to="/payment/">Payment</Link>
            <Link className="button" to="/deposit/">Deposit</Link>
            </div>
          </div>
        </div>
      </div>
      <section>
        <Route path="/" exact component={UserHome} />
        <Route path="/bank/" component={BankHome} />
        <Route path="/payment/" component={PaymentHome} />
        <Route path="/deposit/" component={DepositHome} />
      </section>
      
    </Router>
  );
}

export default App;
