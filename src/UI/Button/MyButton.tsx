import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

import '../Button/MyButton.css'

interface MyButtonProps {
  onClick?: () => void, 
  children?: React.ReactNode,
  className?: string, 

}

const MyButton: React.FC<MyButtonProps> = ({children, ...props}) => {

  const { name, number } = useAppSelector(state => state.contactsSlice.subscriber)


  return (
    <button disabled={name.length < 3 || number.length < 11 ? true: false} {...props} className='myBtn'>
        {children}
    </button>
  )
}

export default MyButton;
