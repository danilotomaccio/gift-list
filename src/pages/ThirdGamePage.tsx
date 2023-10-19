import { TrailComponent } from "../components/TrailComponent";
import "./FirstGamePage.css";
import { useNavigate } from "react-router-dom";

export const ThirdGamePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="thirdGame">
            <TrailComponent points={[ [7.2, 5.8], [8, 8], [3.5, 8.5], [2, 6], [3, 3], [7, 1]]} />
        </div>
    );
}