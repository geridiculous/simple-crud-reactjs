import React, { useState, useEffect } from 'react'

const DepositAddForm = props => {
	const initialFormState = { 
        id: null, 
        userId: '', 
        userName: '',
        amount:'',
      }
  const userData=[]
	const [ deposit, setDeposit ] = useState(initialFormState)
  const [ user, setUser ] = useState(userData)
	useEffect(() => {
		const fetchData = async () => {
		  const result = await JSON.parse(localStorage.getItem("users"))
	
		  setUser(result);
		};
		fetchData();
	}, []);
	const handleInputChange = event => {
		const { name, value } = event.target

		setDeposit({ ...deposit, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
        event.preventDefault()
        user.map(el=>{
          if (el.id==deposit.userId) {
              deposit.userName=el.name
              el.balance=parseInt(el.balance)+parseInt(deposit.amount)
          }
        })
        localStorage.setItem("users",JSON.stringify(user))
				if (!deposit.amount || !deposit.userId) return
                
				props.addDeposit(deposit)
				setDeposit(initialFormState)
			}}
		>
      <label>User</label>
			<select name="userId" className="choose" onChange={handleInputChange} >
        <option value="">Select user</option>
				{user.map(element => (
					<option key={element.id} value={element.id}>{element.name}</option>
				))}
			</select>
			<label>Amount</label>
			<input type="number" name="amount" value={deposit.amount} onChange={handleInputChange} />
			<button>Add New Deposit</button>
		</form>
	)
}

export default DepositAddForm