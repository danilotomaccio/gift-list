import React from "react";
import { ListComponent } from "../components/ListComponent";

export const GiftListPage: React.FC = () => {
    return (
        <><div className="display-large title">
            Gift List
        </div>
            <div className="body-small sub-title">
                I prezzi vengono presi in automatico, potrebbero essere sbagliati e perciò sono solo indicativi
            </div>
            <ListComponent></ListComponent>
        </>);
}