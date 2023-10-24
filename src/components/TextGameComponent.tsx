import React, { useState } from 'react';

export const TextGameComponent: React.FC<{ onWin: () => void }> = ({ onWin }) => {
    const text = "Apri quest'applicazione da smartphone. Se sei già su smartphone non ci resta che iniziare. \nSe hai un iPhone, valuta di passare ad Android";
    const targetWord = "iniziamo";
    // const targetWord = "i";
    const initialColors = Array(text.length).fill("inherit");

    const [colors, setColors] = useState(initialColors);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

    const handleLetterClick = (index: number) => {
        const letter = text.toLocaleLowerCase()[index];
        if (!selectedIndexes.includes(index)) {
            setSelectedIndexes(prev => [...prev, index]);
            setSelectedLetters(prev => [...prev, letter]);
        }

        if (targetWord[selectedLetters.length] === letter) {
            const newColors = [...colors];
            newColors[index] = "var(--md-sys-color-inverse-primary)";
            setColors(newColors);

            if (targetWord.length === selectedLetters.length + 1) {
                onWin();
            }
        } else {
            setColors(initialColors);
            setSelectedLetters([]);
            setSelectedIndexes([]);
        }


    };

    return (
        <span className='display-medium textGame'>
            {text.split('').map((letter, index) => (
                <span
                    key={index}
                    style={{ userSelect: 'none', color: colors[index], textDecoration: index < 23 && index> 19 ? 'underline' : 'none', cursor: 'pointer' }}
                    onClick={() => handleLetterClick(index)}
                >
                    {letter}
                </span>
            ))}
        </span>
    );
}
