import React, { useState } from 'react';

export const TextGameComponent: React.FC<{ onWin: () => void }> = ({ onWin }) => {
    const text = "Apri quest'applicazione da smartphone. Se sei già su smartphone non ci resta che iniziare";
    const targetWord = "iniziamo";
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
                    style={{ color: colors[index], cursor: 'pointer' }}
                    onClick={() => handleLetterClick(index)}
                >
                    {letter}
                </span>
            ))}
        </span>
    );
}
