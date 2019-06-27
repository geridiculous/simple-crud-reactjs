import React, { useState, Fragment, useEffect } from 'react';
import UserAddForm from './UserAddForm';
import UserEditForm from './UserEditForm';
import UserTable from './UserTable';

function UserHome() {
  // Data
	const usersData = []

	const initialFormState = { 
		id: null, 
		name: '', 
		email: '', 
		countryCode:'',
		bankName:'',
		accountNumber:'',
		balance:0
	}

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
  const [ editing, setEditing ] = useState(false)
  
  // fetch Data From localstorage
  useEffect(() => {
    const fetchData = async () => {
      const result = await JSON.parse(localStorage.getItem("users"))

      setUsers(result);
    };
    fetchData();
  }, []);
	// CRUD operations
	const addUser = async user => {
    user.id = users.length + 1
    await setUsers([ ...users, user ])
    console.log([ ...users, user ])
    localStorage.setItem("users",JSON.stringify([ ...users, user ]))
	}

	const deleteUser = id => {
		setEditing(false)

    setUsers(users.filter(user => user.id !== id))
    localStorage.setItem("users",JSON.stringify(users.filter(user => user.id !== id)))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    localStorage.setItem("users",JSON.stringify(users.map(user => (user.id === id ? updatedUser : user))))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser(
			{
				id: user.id, 
				name: user.name, 
				email: user.email, 
				countryCode:user.countryCode,
				bankName:user.bankName,
				accountNumber:user.accountNumber,
				balance:user.balance
			}
		)
	}

	return (
		<div className="container">
			<h1>CRUD Users</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<UserEditForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<UserAddForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default UserHome;