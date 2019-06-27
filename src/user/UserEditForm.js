import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const UserEditForm = props => {
  const GET_COUNTRIES = gql`
    {
      countries{
        name
        code
      }
    }`;
  const banks=[]
  const [ bank, setBank ] = useState(banks)
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      const fetchData = async () => {
        const result = await JSON.parse(localStorage.getItem("banks"))
    
        setBank(result);
      };
      fetchData();
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
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
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default UserEditForm