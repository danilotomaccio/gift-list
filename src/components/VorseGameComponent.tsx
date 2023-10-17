import React from 'react';
import { MorseAlphabetComponent } from './MorseAlphabetComponent';
import "./VorseGameComponent.css";
import { InputPinComponent } from './InputPinComponent';
import { MdIconComponent } from '../wrappers/icon-wrapper';
import { MdFilledTonalIconButtonComponent } from '../wrappers/icon-button-wrapper copy';

export const VorseGameComponent: React.FC<{ onWin: () => void }> = ({ onWin }) => {

    const pwd = "3852";
    const morseCode: { [char: string]: string } = {
        "0": "-----",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        /*  "a": ".-",
         "b": "-...",
         "c": "-.-.",
         "d": "-..",
         "e": ".",
         "f": "..-." */
    };

    const vibrateMorse = () => {
        const pattern: number[] = [];
        for (let i = 0; i < pwd.length; i++) {
            const char = pwd[i];
            const charMorseCode = morseCode[char];
            for (let j = 0; j < charMorseCode.length; j++) {
                const cm = charMorseCode[j];
                pattern.push(cm === '.' ? 200 : 300);
                pattern.push((j === charMorseCode.length - 1) ? 500 : 200);
            }
        }
        console.log(pattern);
        navigator.vibrate(pattern.flat());
    };

    return (
        <div className='vorseGame'>
            <MorseAlphabetComponent/>
            <InputPinComponent pin={pwd} onWin={onWin} />
            <MdFilledTonalIconButtonComponent onClick={vibrateMorse}>
                <MdIconComponent>vibration</MdIconComponent>
            </MdFilledTonalIconButtonComponent>
        </div>
    );
}
