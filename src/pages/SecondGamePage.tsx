import { VorseGameComponent } from "../components/VorseGameComponent";
import "./FirstGamePage.css";
import { useNavigate } from "react-router-dom";

export const SecondGamePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="secondGame">
            <VorseGameComponent onWin={()=>navigate('/')}></VorseGameComponent>
        </div>
    );
}