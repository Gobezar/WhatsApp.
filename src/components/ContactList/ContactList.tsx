import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setCurrentSubscriber, deleteSubscriber } from '../../redux/slices/contactsSlice'
import { ISubscriber } from '../../models'

import '../ContactList/ContactList.css'
import { MinusCircleTwoTone } from '@ant-design/icons'


const ContactList = () => {

    const dispatch = useAppDispatch()
    const { arraySubscribers } = useAppSelector(state => state.contactsSlice)

    const setCurrent = (subscriber: ISubscriber) => {
        dispatch(setCurrentSubscriber(subscriber))
    }




    return (
        <div>
            {arraySubscribers.map((obj) => (
                <div className='arraySubscribersDiv' key={obj.number}>
                    <ul className='arraySubscribersUl'>
                        <div onClick={() => setCurrent(obj)} className='itemSubscribers'>
                            <li className='arraySubscribersLi'>
                                <div className='itemSubscriber'>
                                    <div><button onClick={() => dispatch(deleteSubscriber(obj.number))} className='itemSubscriberDeleteButton'><MinusCircleTwoTone twoToneColor="rgba(37, 211, 102, 1)" /></button></div>
                                    <div className='contactListImgDiv'><img src='https://socpartnerstvo.org/img/avatar_male.png' /></div>
                                    <div>
                                        <p>Имя: </p> <span>{obj.name}</span>
                                        <p> Телефон: </p> <span>+{obj.number}</span>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            ))}

        </div>
    )
}

export default ContactList; 
