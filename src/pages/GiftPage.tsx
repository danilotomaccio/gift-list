import React from "react";
import { MdElevationComponent } from "../wrappers/elevation-wrapper";
import "./GiftPage.css";

export const GiftPage: React.FC = () => {
    return (
        <>
            <div className="display-large winText">
                Tanti auguri!
            </div>

            <a href="https://wa.me/+393343228283?text=Ho%20finito%2C%20mandami%20il%20link" target="_blank" rel="noopener noreferrer" className='giftComponent'>
                <MdElevationComponent></MdElevationComponent>
                <div className="text">
                    <img src="img/a-logo.png" />
                    <div className='body-large'>Buono regalo Amazon.it</div>
                </div>
                <div className="image">
                    <img src={"img/buon-compleanno.png"} />
                </div>
            </a>

            <div className="display-small title">
                Tanti auguri da Mimmo, Fabio, Paolo, Antonio, Enrico, Antonello e Marco
            </div>

            {/* <div className="body-medium clausola">
                *Premi sul buono per riscattarlo
            </div> */}
        </>);
}