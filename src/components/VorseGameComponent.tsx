import React, { useState } from 'react';
import { MorseAlphabetComponent } from './MorseAlphabetComponent';
import "./VorseGameComponent.css";
import { InputPinComponent } from './InputPinComponent';
import { MdIconComponent } from '../wrappers/icon-wrapper';
import { MdFilledTonalIconButtonComponent } from '../wrappers/icon-button-wrapper';

export const VorseGameComponent: React.FC<{ onWin: () => void }> = ({ onWin }) => {

    const [flashing, setFlashing] = useState<boolean>(false);

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
        let sum = 0;
        
        for (let i = 0; i < pattern.length; i++) {
            const cp = sum;
            setTimeout(() => {
                setFlashing(i % 2 === 0);
            }, cp);
            sum += pattern[i];
        }
        navigator.vibrate(pattern);
    };

    const buttonStyle: React.CSSProperties & {
        [key: string]: string;
    } = {
        '--_container-color': flashing ? 'var(--md-sys-color-error)' : '',
        '--_icon-color': flashing ? 'var(--md-sys-color-on-error)' : ''
    };

    return (
        <div className='vorseGame'>
            <MorseAlphabetComponent />
            <InputPinComponent pin={pwd} onWin={onWin} />
            <MdFilledTonalIconButtonComponent onClick={vibrateMorse} style={buttonStyle}>
                <MdIconComponent>vibration</MdIconComponent>
            </MdFilledTonalIconButtonComponent>
        </div>
    );
}
