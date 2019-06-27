import React from 'react'

const BankTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Code</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.banks.length > 0 ? (
        props.banks.map(bank => (
          <tr key={bank.id}>
            <td>{bank.name}</td>
            <td>{bank.code}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(bank)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteBank(bank.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No banks</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default BankTable