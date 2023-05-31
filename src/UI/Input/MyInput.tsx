import React from 'react'
import '../Input/MyInput.css'

interface MyInputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string, 
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    type?: string,
    placeholder?: string, 
    className?: string, 
    props?: any,
}


const MyInput: React.FC<MyInputProps> = (props) => {
    return (
        <div>
            <input className='myInput'{...props} />
        </div>
    )
}
export default MyInput