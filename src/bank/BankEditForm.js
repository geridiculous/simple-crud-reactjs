import React, { useState, useEffect } from 'react';

const BankEditForm = props => {
  const [ bank, setBank ] = useState(props.currentBank)

  useEffect(
    () => {
      setBank(props.currentBank)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setBank({ ...bank, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateBank(bank.id, bank)
      }}
    >
      <label>Bank Name</label>
      <input type="text" name="name" value={bank.name} onChange={handleInputChange} />
      <label>Bank Code</label>
      <input type="text" name="code" value={bank.code} onChange={handleInputChange} />
      <button>Update bank</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default BankEditForm