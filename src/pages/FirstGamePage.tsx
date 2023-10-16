import {TextGameComponent} from "../components/TextGameComponent";
import "./FirstGamePage.css";
import { useNavigate } from "react-router-dom";

export const FirstGamePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="firstGame">
            <TextGameComponent onWin={()=>navigate('/secondGame')}></TextGameComponent>
        </div>
    );
}