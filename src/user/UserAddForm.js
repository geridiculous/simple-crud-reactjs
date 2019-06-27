import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const UserAddForm = props => {
	const GET_COUNTRIES = gql`
    {
      countries{
        name
        code
      }
    }`;
	const initialFormState = { 
		id: null, 
		name: '', 
		email: '', 
		countryCode:'ID',
		bankName:'BCA',
		accountNumber:'',
		balance:0
	}
	const banks=[]
	const [ user, setUser ] = useState(initialFormState)
	const [ bank, setBank ] = useState(banks)
	useEffect(() => {
		const fetchData = async () => {
		  const result = await JSON.parse(localStorage.getItem("banks"))
	
		  setBank(result);
		};
		fetchData();
	}, []);

  const handleInputChange = event => {
		console.log(event.target)
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				console.log(user)
				if (!user.name || !user.email || !user.accountNumber || !user.bankName ) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Email</label>
			<input type="email" name="email" value={user.email} onChange={handleInputChange} />
			<label>Country</label>
			<Query query={GET_COUNTRIES}>
				{({ data, loading, error }) => {
				if(loading) return <option value="">Please Wait</option>
				if(error) return <option value="">Select Country</option>
				return (
					
					<select name="countryCode" className="choose" onChange={handleInputChange} value={user.countryCode}>
					{data.countries.map(element => (
						<option key={element.code} value={element.code}>{element.name}</option>
					))}
					</select>
				)
				}}
			</Query>
			<label>Bank</label>
			<select name="bankName" className="choose" onChange={handleInputChange} value={user.bankName}>
				{bank.map(element => (
					<option key={element.code} value={element.name}>{element.name}</option>
				))}
			</select>
			<label>Bank Account Number</label>
			<input type="text" name="accountNumber" value={user.accountNumber} onChange={handleInputChange} />
			<button>Add new user</button>
			
		</form>
	)
}

export default UserAddForm