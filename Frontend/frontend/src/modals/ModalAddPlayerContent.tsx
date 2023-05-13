import React, {ChangeEvent, useRef, useState} from 'react';
import {IPlayer} from "../interfaces/IPlayer";
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";

const ModalAddPlayerContent = (props:{
    player: IPlayer,
    setPlayer: React.Dispatch<React.SetStateAction<IPlayer>>
}) => {

    let strings = new LocalizedStrings({
        en:{
            description:"Description",
            changeDescription: 'Change description',
            name:"Name",
            firstName: 'First name',
            lastName: 'Last name',
            birthDate: 'Birth date',
            login: 'Login',
            password: 'Password',
        },
        ua: {
            description:'Опис',
            changeDescription: 'Змінити опис',
            name:"Назва",
            firstName: 'Ім\'я',
            lastName: 'Прізвище',
            birthDate: 'Дата народження',
            login: 'Логін',
            password: 'Пароль',
        }
    });

    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (fileInput.current && fileInput.current.files) {
            const file = fileInput.current.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);

            // Implement image to base64
            convertImageToBase64(reader, file);
        }
    };


    const convertImageToBase64 = (reader: FileReader, file: File) => {
        reader.onload = (event) => {
            props.setPlayer({...props.player, Avatar: event.target?.result as string});
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className={'modal-add-post-content'}>
            <div className={`modal-add-post-image-part-wrapper`}>
                <input
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    onChange={(e) => handleChange(e)}
                />
                <div className={`modal-add-post-image-wrapper`}>
                    <img className="modal-add-post-image" src={preview?.toString()} alt="Preview" />
                </div>
            </div>


            <div className={"modal-add-post-desc-part-wrapper"}>

                <div className={'modal-add-post-desc-text'}>
                    {strings.firstName}
                </div>
                <div className="input-small">
                    <input type="text" value={props.player.FirstName} onChange={(e) => props.setPlayer({...props.player, FirstName: e.target.value})}/>
                </div>
                <div className={'modal-add-post-desc-text'}>
                    {strings.lastName}
                </div>
                <div className="input-small">
                    <input type="text" value={props.player.LastName} onChange={(e) => props.setPlayer({...props.player, LastName: e.target.value})}/>
                </div>
                <div className={'modal-add-post-desc-text'}>
                    {strings.login}
                </div>
                <div className="input-small">
                    <input type="text" value={props.player.Login} onChange={(e) => props.setPlayer({...props.player, Login: e.target.value})}/>
                </div>
                <div className={'modal-add-post-desc-text'}>
                    {strings.password}
                </div>
                <div className="input-small">
                    <input type="text" value={props.player.Password} onChange={(e) => props.setPlayer({...props.player, Password: e.target.value})}/>
                </div>
                <div className={'modal-add-post-desc-text'}>
                    {strings.birthDate}
                </div>
                <div className="input-small">
                    <input type="date" value={props.player.BirthDate} onChange={(e) => props.setPlayer({...props.player, BirthDate: e.target.value})}/>
                </div>
            </div>
        </div>
    );
};

export default ModalAddPlayerContent;