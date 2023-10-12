import React, { useEffect, useState } from 'react';
import { Gift, getGiftList } from '../list';
import { GiftComponent } from './GiftComponent';
import "./ListComponent.css";

export const ListComponent: React.FC = () => {
    const [gifts, setGifts] = useState<Gift[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await getGiftList();
            setGifts(result);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Caricamento...</p>;
    }

    return (
        <div className='list'>
            {gifts?.map((gift, index) => (
                <GiftComponent
                    key={index}
                    name={gift.name}
                    link={gift.link}
                    price={gift.price}
                    imageUrl={gift.img}
                />
            ))}
        </div>
    );
}
