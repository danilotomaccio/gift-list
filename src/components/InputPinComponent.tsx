import React, { useEffect, useRef, useState } from "react";
import "./InputPinComponent.css";

export const InputPinComponent: React.FC<{ pin: string, onWin: () => void }> = ({ pin, onWin }) => {
    const [inputValues, setInputValues] = useState(Array(4).fill(''));
    const nums = useRef<(HTMLInputElement | null)[]>([]);

    const onDigitInput = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {

        const newValues = [...inputValues];
        newValues[index] = e.target.value;
        setInputValues(newValues);

        nums.current.forEach((num, index) => {
            if (num) {
                num.dataset.id = index.toString();
                num.addEventListener('keyup', () => {
                    if (num.value.length === 1) {
                        nums.current[index + 1]?.focus();
                    }
                });
            }
        });

    }

    useEffect(() => {
        if (inputValues.join("").length === pin.length) {
            if (inputValues.join("") === pin) {
                onWin();
            } else {
                setInputValues(Array(4).fill(''));
            }
        }
    });

    return (
        <form action="" className="inputPin">
            <div className="container">
                {inputValues.map((value, index) => (
                    <input
                        key={index}
                        type="number"
                        className="num"
                        maxLength={1}
                        value={value}
                        required
                        ref={el => (nums.current[index] = el)}

                        onChange={onDigitInput(index)}
                    />
                ))}
            </div>
        </form>
    );
};