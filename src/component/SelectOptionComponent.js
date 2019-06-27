import React, { useState, Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SelectOptionComponent = props => {
	const GET_COUNTRIES = gql`
    {
      countries{
        name
        code
      }
    }
  `;

	return (
		
      <Query query={GET_COUNTRIES}>
        {({ data, loading, error }) => {
          if(loading) return <option value="">Select Country</option>
          if(error) return <option value="">Select Country</option>
          console.log(data.countries)
          return (
            
            <select name="countryCode" className="choose" onChange={() => props.handleInputChange}>
              <Fragment>
              {data.countries.map(element => (
                <option key={element.code} value={element.code}>{element.name}</option>
              ))}
              </Fragment>
            </select>
          )
        }}
      </Query>
    
	)
}

export default SelectOptionComponent