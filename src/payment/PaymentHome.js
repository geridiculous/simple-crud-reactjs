import React, { useState, Fragment, useEffect } from 'react';
import PaymentAddForm from './PaymentAddForm';
import PaymentTable from './PaymentTable';

function PaymentHome() {
  // Data
	const paymentsData = []
	// Setting state
	const [ payments, setPayments ] = useState(paymentsData)
  
  // fetch Data From localstorage
  useEffect(() => {
    const fetchData = async () => {
      const result = await JSON.parse(localStorage.getItem("payments"))

      setPayments(result);
    };
    fetchData();
  }, []);
	// CRUD operations
	const addPayment = async payment => {
    payment.id = payments.length + 1
    await setPayments([ ...payments, payment ])
    console.log([ ...payments, payment ])
    localStorage.setItem("payments",JSON.stringify([ ...payments, payment ]))
	}

	return (
		<div className="container">
			<h1>Payments</h1>
			<div className="flex-row">
				<div className="flex-large">
          <Fragment>
            <h2>Add Payment</h2>
            <PaymentAddForm addPayment={addPayment} />
          </Fragment>
				</div>
				<div className="flex-large">
					<h2>View payments</h2>
					<PaymentTable payments={payments}/>
				</div>
			</div>
		</div>
	)
}

export default PaymentHome;