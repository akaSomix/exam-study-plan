import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


import AppLogo from './basics/AppLogo'
import Button from './basics/Button';

function Header({isLogged, user, logout}) {

  const navigate = useNavigate();

  return (
    <div className='h-28 flex justify-between pt-4 pb-4 lg:mx-56 md:mx-24 mx-4'>
      <AppLogo className="mr-12"/>
      
      <div className='p-4'>
        {
          isLogged 
          ? (
              <div className='flex justify-center items-center'>
                <h4 className='text-accent-200 font-sans text-xl'> 
                  Welcome <u><b>{user.name}</b></u>
                </h4>
                <Button 
                  className='mx-10' 
                  label='Logout' 
                  onClick={() => logout()}
                />
              </div>
          ) 
          : (
            <Button label='Go to Login' onClick={() => navigate('/login')}/>
          ) 
          
        }
      </div>
    </div>
  )
}

Header.propTypes = {
   isLogged: PropTypes.bool.isRequired,
   logout: PropTypes.func.isRequired,
   user: PropTypes.object,
}

Header.defaultProps = {
  user: {}
}
export default Header
