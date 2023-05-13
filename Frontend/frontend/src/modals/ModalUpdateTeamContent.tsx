import React, {ChangeEvent, useRef, useState} from 'react';
import {ITeam} from "../interfaces/ITeam";
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";

const ModalUpdateTeamContent = (props:{
    team: ITeam,
    setTeam: React.Dispatch<React.SetStateAction<ITeam>>,
}) => {
    let strings = new LocalizedStrings({
        en:{
            description:"Description",
            changeDescription: 'Change description',
            name:"Name",
        },
        ua: {
            description:'Опис',
            changeDescription: 'Змінити опис',
            name:"Назва",
        }
    });

    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.team.image);
    console.log(props.team);

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
            props.setTeam({...props.team, image: event.target?.result as string});
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
                    {strings.name}
                </div>
                <div>
                    <input type="text" value={props.team.name} onChange={(e) => props.setTeam({...props.team, name: e.target.value})}/>
                </div>
                <div className={'modal-add-post-desc-text'}>
                    {strings.description}
                </div>
                <div>
                    <textarea
                        className={'modal-add-post-textarea'}
                        name=""
                        id=""
                        value={props.team.description}
                        cols={38}
                        rows={20}
                        onChange={(e) => props.setTeam({...props.team, description: e.target.value})}
                    >
                    </textarea>

                </div>
            </div>
        </div>
    );
};

export default ModalUpdateTeamContent;