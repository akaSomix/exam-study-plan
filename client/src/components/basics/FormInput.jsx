
import  React from 'react';
import PropTypes from 'prop-types';

import {FaUserShield, FaKey} from 'react-icons/fa';


function FormInput({type, value, onChange, className}) {
  return (
    <div className= {`${className} px-4 py-2 bg-background-200 text-primary-100 flex rounded-sm`}>
      {
        type === 'password' ? (
          <FaKey className='text-2xl'/>
        ) 
        : (
          <FaUserShield className='text-2xl'/>
        )
      }
      <input 
        className='px-6 text-xl bg-transparent text-paragraph-100 focus:outline-none w-full'
        type={type}
        value={value}
        maxLength='32'
        onChange={onChange}
      >
      </input>
    </div>
  )
}

FormInput.propTypes = {
   type: PropTypes.string.isRequired,
   value: PropTypes.string,
   onChange: PropTypes.func.isRequired,
}

export default FormInput
