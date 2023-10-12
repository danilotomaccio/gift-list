import React from 'react';
import "@material/web/elevation/elevation"
import { MdElevationComponent } from '../wrappers/elevation-wrapper';
import "./GiftComponent.css";

interface Props {
    name: string;
    link: string;
    price: string;
    imageUrl: string;
    description?: string;
}

export const GiftComponent: React.FC<Props> = ({ name, link, imageUrl, description, price }) => {
    return (
        <div className='giftComponent'>
            <MdElevationComponent></MdElevationComponent>
            <div className="text">
                <h2>{name}</h2>
                <p>{description}</p>
                <div className="price">{price}</div>
                <a href={link} target="_blank" rel="noopener noreferrer">Vai al link</a>
            </div>
            <div className="image">
            <img src={imageUrl} alt={name} />
            </div>
        </div>
    );
}
