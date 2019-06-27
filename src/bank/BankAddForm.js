import React, { useState } from 'react'

const BankAddForm = props => {
	const initialFormState = { 
        id: null, 
        name: '', 
        code: '',
      }
	const [ bank, setBank ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setBank({ ...bank, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!bank.name || !bank.code) return

				props.addBank(bank)
				setBank(initialFormState)
			}}
		>
			<label>Bank Name</label>
			<input type="text" name="name" value={bank.name} onChange={handleInputChange} />
			<label>Bank Code</label>
			<input type="text" name="code" value={bank.code} onChange={handleInputChange} />
			<button>Add New Bank</button>
		</form>
	)
}

export default BankAddForm