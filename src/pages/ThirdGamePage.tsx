import { TrailComponent } from "../components/TrailComponent";
import { simulatePWM } from "../vibration";
import "./FirstGamePage.css";
import { useNavigate } from "react-router-dom";

export const ThirdGamePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="thirdGame">
            <TrailComponent points={[[200, 300], [300, 200], [600, 500]]}/>
        </div>
    );
}