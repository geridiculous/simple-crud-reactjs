import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { isEmpty } from 'lodash';
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
	const [submitted, setSubmitted] = useState(false);
  	const [errors, setErrors] = useState({});
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
	const validateInputs = (submitted = false) => {
		setSubmitted(submitted);
	
		const {
			name, 
			email, 
			countryCode,
			bankName,
			accountNumber,
		} = user;
	
		const errors = {};
		// name is required
		if (!name) errors.name = 'Name is required';
	
		// email is required
		if (!email) errors.email = 'Email is required';
		
		// email format
		if(email){
			let lastAtPos = email.lastIndexOf('@');
			let lastDotPos = email.lastIndexOf('.');
 
			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
			   
				errors.email = 'Email is false';
			}
		}

		// country name is required
		if (!countryCode) errors.countryCode = 'Country is required';
	
		// bank is required
		if (!bankName) errors.bankName = 'Bank is required';
	
		// account is required
		if (!accountNumber) errors.accountNumber = 'Acount Number is required';
	
		console.log("validateInputs",user)
		console.log("errors",errors)
		setErrors(errors);
		if (isEmpty(errors) && submitted) {
			props.addUser(user)
			setUser(initialFormState)
		}
	};

	const FormNotValid = props => {
		console.log(props)
		if (submitted && !isEmpty(props.errorMessage)) {
			return (
				<small className="text-danger">{props.errorMessage}</small>
			  );
		}else{
			return (
				<small className="text-danger"></small>
			  );
		}	
	  };

	return (
		<div>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<FormNotValid errorMessage={errors.name} />
			<label>Email</label>
			<input type="email" name="email" value={user.email} onChange={handleInputChange} required/>
			<FormNotValid errorMessage={errors.email} />
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
			<FormNotValid errorMessage={errors.accountNumber} />
			<button onClick={e => validateInputs(e)}>Add new user</button>
			
		</div>
	)
}

export default UserAddForm