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
        <a href={link} target="_blank" rel="noopener noreferrer" className='giftComponent'>
            <MdElevationComponent></MdElevationComponent>
            <div className="text">
                <div className='display-small'>{name}</div>
                <p>{description}</p>
                <div className="body-small">{price}</div>
            </div>
            <div className="image">
            <img src={imageUrl} alt={name} />
            </div>
        </a>
    );
}
