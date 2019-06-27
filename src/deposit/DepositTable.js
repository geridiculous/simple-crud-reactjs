import React from 'react'

const DepositTable = props => (
  <table>
    <thead>
      <tr>
        <th>User Name</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {props.deposits.length > 0 ? (
        props.deposits.map(deposit => (
          <tr key={deposit.id}>
            <td>{deposit.userName}</td>
            <td>{deposit.amount}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No deposits</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default DepositTable