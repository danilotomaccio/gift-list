import React, { useState } from 'react';

export const TextGameComponent: React.FC<{ onWin: () => void }> = ({ onWin }) => {
    const text = "Informazione di servizio. Se hai un'officina e vendi trattori, è arrivato il tuo momento! Partecipa al nuovo gioco \"Uno si distrae a Budapest!\". I tuoi amici hanno fiducia in te (tranne Mimmo). Sarai in grado di arrivare fino alla fine. Ma poi, quanti anni fai?!";
    const targetWord = "trenta";

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
                    style={{ userSelect: 'none', color: colors[index], textDecoration: index < 12 && index> 8 ? 'underline' : 'none', cursor: 'pointer' }}
                    onClick={() => handleLetterClick(index)}
                >
                    {letter}
                </span>
            ))}
        </span>
    );
}
