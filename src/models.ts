export interface ILoginProps {
    isAuth: Boolean;
    idInstance: string;
    apiTokenInstance: string;
}

export interface IContactsProps {
    arraySubscribers: ISubscriber [];
    subscriber: ISubscriber;
    currentSubscriber: any;
}

export interface ISubscriber {
    number: string;
    name: string;
}


export interface IMessage {
    isMy: boolean, 
    textMessage: string, 
    idMessage: string
}

export interface IDialogProps {
    isLoading: boolean;
    error: string;
    message: IMessage;
    arrayMessages: any;
    receiptId: number;
}