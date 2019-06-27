import React from 'react'

const PaymentTable = props => (
  <table>
    <thead>
      <tr>
        <th>User Name</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {props.payments.length > 0 ? (
        props.payments.map(payment => (
          <tr key={payment.id}>
            <td>{payment.userName}</td>
            <td>{payment.amount}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No payments</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default PaymentTable