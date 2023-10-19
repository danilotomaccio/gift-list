import { VorseGameComponent } from "../components/VorseGameComponent";
import { rgbaFromVar } from "../utils/style";
import "./SecondGamePage.css";
import { useNavigate } from "react-router-dom";

export const SecondGamePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="secondGame">
            <div className="numOnBG" style={{color: rgbaFromVar('--md-sys-color-surface-variant', .3)}}>4</div>
            <VorseGameComponent onWin={()=>navigate('/thirdGame')}></VorseGameComponent>
        </div>
    );
}