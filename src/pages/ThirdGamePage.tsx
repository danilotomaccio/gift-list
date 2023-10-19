import { useState } from "react";
import { TrailComponent } from "../components/TrailComponent";
import { useNavigate } from "react-router-dom";
import { MdFilledTonalIconButtonComponent } from "../wrappers/icon-button-wrapper";
import "./ThirdGamePage.css";

export const ThirdGamePage: React.FC = () => {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState<boolean>(false);

    return (
        <div className="thirdGame">
            {showButton ? <div className="continueBtn">
                <MdFilledTonalIconButtonComponent onClick={()=>navigate('/fourthGame')}>0</MdFilledTonalIconButtonComponent>
            </div> : <></>}
            <TrailComponent points={[[7.2, 5.8], [8, 8], [3.5, 8.5], [2, 6], [3, 3], [7, 1]]} onWin={() => setTimeout(() => {
                setShowButton(true);
            }, 6000)} />
        </div>
    );
}