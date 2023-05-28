import React, {ChangeEvent, useRef, useState} from 'react';
import {IPlayerInfo} from "../interfaces/IPlayerInfo";
import LocalizedStrings from "react-localization";

const EditPlayerModalContent = (props:{
    player: IPlayerInfo,
    setPlayer: React.Dispatch<React.SetStateAction<IPlayerInfo>>,
}) => {
    let strings = new LocalizedStrings({
        en:{
            lastName: 'Last name',
            firstName: 'First name',
        },
        ru: {
            lastName: 'Прізвище',
            firstName: 'Ім\'я',
        }
    });

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    const fileInput = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.player.avatar);

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
            props.setPlayer({...props.player, avatar: event.target?.result as string});
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

            <div className={"input-wrapper"}>
                <div className={'modal-add-post-desc-text'}>
                    {strings.lastName}
                </div>
                <div>
                    <input className={"input"} type="text" value={props.player.lastName} onChange={(e) => props.setPlayer({...props.player, lastName: e.target.value})}/>
                </div>
                <div className={'modal-add-post-desc-text'}>
                    {strings.firstName}
                </div>
                <div>
                    <input type="text" value={props.player.firstName} onChange={(e) => props.setPlayer({...props.player, firstName: e.target.value})}/>
                </div>
            </div>
        </div>
    );
};

export default EditPlayerModalContent;