import {TextGameComponent} from "../components/TextGameComponent";
import "./FirstGamePage.css";
import { useNavigate } from "react-router-dom";

export const SecondGamePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="secondGame">
            <TextGameComponent onWin={()=>navigate('/secondGame')}></TextGameComponent>
        </div>
    );
}