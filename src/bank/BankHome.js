import React, { useState, Fragment, useEffect } from 'react';
import BankAddForm from './BankAddForm';
import BankEditForm from './BankEditForm';
import BankTable from './BankTable';

function BankHome() {
  // Data
	const banksData = []

	const initialFormState = { 
    id: null, 
    name: '', 
    code: '',
    countryCode:'',
  }

	// Setting state
	const [ banks, setBanks ] = useState(banksData)
	const [ currentBank, setCurrentBank ] = useState(initialFormState)
    const [ editing, setEditing ] = useState(false)
  
  // fetch Data From localstorage
  useEffect(() => {
    const fetchData = async () => {
      const result = await JSON.parse(localStorage.getItem("banks"))

      setBanks(result);
    };
    fetchData();
  }, []);
	// CRUD operations
	const addBank = async bank => {
    bank.id = banks.length + 1
    await setBanks([ ...banks, bank ])
    console.log([ ...banks, bank ])
    localStorage.setItem("banks",JSON.stringify([ ...banks, bank ]))
	}

	const deleteBank = id => {
		setEditing(false)

    setBanks(banks.filter(bank => bank.id !== id))
    localStorage.setItem("banks",JSON.stringify(banks.filter(bank => bank.id !== id)))
	}

	const updateBank = (id, updatedBank) => {
		setEditing(false)

    setBanks(banks.map(bank => (bank.id === id ? updatedBank : bank)))
    localStorage.setItem("banks",JSON.stringify(banks.map(bank => (bank.id === id ? updatedBank : bank))))
	}

	const editRow = bank => {
		setEditing(true)

		setCurrentBank({ id: bank.id, name: bank.name, code: bank.code })
	}

	return (
		<div className="container">
			<h1>CRUD Banks</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit bank</h2>
							<BankEditForm
								editing={editing}
								setEditing={setEditing}
								currentBank={currentBank}
								updateBank={updateBank}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add bank</h2>
							<BankAddForm addBank={addBank} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View banks</h2>
					<BankTable banks={banks} editRow={editRow} deleteBank={deleteBank} />
				</div>
			</div>
		</div>
	)
}

export default BankHome;