import React, { useState, useEffect } from 'react'

const PaymentAddForm = props => {
	const initialFormState = { 
        id: null, 
        userId: '', 
        userName: '',
        amount:'',
      }
    const userData=[]
	const [ payment, setPayment ] = useState(initialFormState)
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

		setPayment({ ...payment, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
                event.preventDefault()
                user.map(el=>{
                    if (el.id==payment.userId) {
                        payment.userName=el.name
                        el.balance=el.balance-payment.amount
                    }
                })
                localStorage.setItem("users",JSON.stringify(user))
				if (!payment.amount || !payment.userId) return
                console.log("event.target",event.target)
                console.log("payment",payment)
                
				props.addPayment(payment)
				setPayment(initialFormState)
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
			<input type="number" name="amount" value={payment.amount} onChange={handleInputChange} />
			<button>Add New Payment</button>
		</form>
	)
}

export default PaymentAddForm