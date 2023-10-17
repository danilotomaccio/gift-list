import React from 'react';

const morseCode = {
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    /* 'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.' */
};

export const MorseAlphabetComponent: React.FC = () => {
    return (
        <div>
            {Object.entries(morseCode).map(([char, code]) => (
                <div key={char}>
                    {/* <span>{char}: </span> */}
                    {code.split('').map((symbol, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'inline-block',
                                width: symbol === '.' ? '10px' : '30px',
                                height: '10px',
                                backgroundColor: 'var(--md-sys-color-on-background)',
                                margin: '5px',
                                borderRadius: '3em'
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
