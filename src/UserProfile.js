import {memo} from "react";

export function UserProfileRenderer(props) {
    const toggleFavorite = () => props.setFavorite(oldVal => ({
        ...oldVal,
        [props.id]: !Boolean(oldVal[props.id])
    }))

    return <div className={"UserProfile"}>
        <img className={"ProfileImage"} src={props.image}/>
        <h3>{props.name} - {props.id}</h3>
        <button onClick={toggleFavorite}>
            {props.favorite ? <span>🌟</span> :
                <span style={{width: 20, height: 20}}>☆</span>}</button>
    </div>
};


export const UserProfile = memo(UserProfileRenderer)
