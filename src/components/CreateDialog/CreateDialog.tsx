import React from 'react'
import MyInput from '../../UI/Input/MyInput'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setNumber, setName, createSubscriber, resetValue } from '../../redux/slices/contactsSlice'
import {SaveTwoTone} from '@ant-design/icons'
import '../CreateDialog/CreateDialog.css'

const CreateDialog: React.FC = () => {

    const dispatch = useAppDispatch()
    const { name, number } = useAppSelector(state => state.contactsSlice.subscriber)
    const { arraySubscribers } = useAppSelector(state => state.contactsSlice)


    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setName(e.currentTarget.value));
    }
    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setNumber(e.currentTarget.value));
    }

    const create = async (e: React.FormEvent) => {
        e.preventDefault(); // чтобы страница не перезагружалась
        if (name.length >= 3 && number.length >= 11) {
            await dispatch(createSubscriber())
            dispatch(resetValue())
        } else alert('Поля "номер абонента" и "имя абонента" должны быть корректно заполнены.')
    }


    return (
        <div className='addSubscriberDiv'>
            <form onSubmit={create}>
                <div className='addSubscriberInputsDiv'>
                    <div style={{width:'85%'}}>
                    <MyInput value={number} onChange={onChangeNumber} type="text" placeholder="Введите номер абонента... (в формате - 79*********)." className='addSubscriberInput'></MyInput>
                    <MyInput value={name} onChange={onChangeName} type="text" placeholder="Введите имя абонента..." className='addSubscriberInput'></MyInput>
                    </div>
                    <div className='addSubscriberButtonDiv'><button className='addSubscriberButton'><SaveTwoTone twoToneColor="rgba(37, 211, 102, 1)"/></button></div>
                </div>    
            </form>
        </div>
    )
}

export default CreateDialog;
