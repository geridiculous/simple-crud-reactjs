import React, { useState, Fragment, useEffect } from 'react';
import DepositAddForm from './DepositAddForm';
import DepositTable from './DepositTable';

function DepositHome() {
  // Data
	const depositsData = []
	// Setting state
	const [ deposits, setDeposits ] = useState(depositsData)
  
  // fetch Data From localstorage
  useEffect(() => {
    const fetchData = async () => {
      const result = await JSON.parse(localStorage.getItem("deposits"))

      setDeposits(result);
    };
    fetchData();
  }, []);
	// CRUD operations
	const addDeposit = async deposit => {
    deposit.id = deposits.length + 1
    await setDeposits([ ...deposits, deposit ])
    console.log([ ...deposits, deposit ])
    localStorage.setItem("deposits",JSON.stringify([ ...deposits, deposit ]))
	}

	return (
		<div className="container">
			<h1>Deposits</h1>
			<div className="flex-row">
				<div className="flex-large">
          <Fragment>
            <h2>Add Deposit</h2>
            <DepositAddForm addDeposit={addDeposit} />
          </Fragment>
				</div>
				<div className="flex-large">
					<h2>View deposits</h2>
					<DepositTable deposits={deposits}/>
				</div>
			</div>
		</div>
	)
}

export default DepositHome;