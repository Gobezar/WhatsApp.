import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import '../DialogHeader/DialogHeader.css'


const DialogHeader: React.FC = () => {

    const { name, number } = useAppSelector(state => state.contactsSlice.currentSubscriber)
    const { currentSubscriber } = useAppSelector(state => state.contactsSlice)



    return (
        <>
        {Object.keys(currentSubscriber).length ?
        <div className='dialogHeader'>
            <div className='dialogHeaderImgDiv'><img src='https://socpartnerstvo.org/img/avatar_male.png' /></div>
            <div>
                <div><p style={{margin:'4px'}}><span style={{fontWeight: 'bold'}}>Имя:</span> {name}</p></div>
                <div><p style={{margin:'4px'}}><span style={{fontWeight: 'bold'}}>Номер:</span> +{number}</p></div>
            </div>
        </div> : <></>
        }
        </>
    )
}

export default DialogHeader