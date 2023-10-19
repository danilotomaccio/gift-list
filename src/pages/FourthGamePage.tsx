import { useNavigate } from "react-router-dom";
import { InputPinComponent } from "../components/InputPinComponent";
import "./FourthGamePage.css";


export const FourthGamePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="fourthGame">
            <InputPinComponent pin={'1460'} onWin={() => navigate('/gift-list')} />
        </div>
    );
}