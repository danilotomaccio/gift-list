import React, { useEffect, useState } from 'react';
import { Gift, getGiftList } from '../list';
import { GiftComponent } from './GiftComponent';
import "./ListComponent.css";
import { MdCircularProgressComponent } from '../wrappers/circular-progress-wrapper';
import { MdIconButtonComponent } from '../wrappers/icon-button-wrapper';
import { MdIconComponent } from '../wrappers/icon-wrapper';

export const ListComponent: React.FC = () => {
    const [gifts, setGifts] = useState<Gift[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [orderAsc, setOrderAsc] = useState(true);


    function priceToInt(priceString: string) {
        return parseFloat(priceString.replace('€', '').trim()) / 100;
    }

    function toggleOrder() {
        setGifts((prevGifts) => {
            if (prevGifts) {
                const orderedList = prevGifts?.slice().sort((a, b) => orderAsc ? priceToInt(a.price) - priceToInt(b.price) : priceToInt(b.price) - priceToInt(a.price));
                return orderedList;
            }
            return prevGifts;
        });
        setOrderAsc(prev => !prev);
    }



    useEffect(() => {
        async function fetchData() {
            const result = await getGiftList();
            setGifts(result);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (<MdCircularProgressComponent></MdCircularProgressComponent>);
    }

    return (
        <div className='list'>
            <div className="filter">
                Ordina per prezzo:
                <MdIconButtonComponent onClick={toggleOrder}>
                    {orderAsc ? <MdIconComponent>expand_less</MdIconComponent> : <MdIconComponent>expand_more</MdIconComponent>}
                </MdIconButtonComponent>
            </div>
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
