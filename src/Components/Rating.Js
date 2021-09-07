import React from "react";

function Rating ({rate, onChange = () => {} }) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rate) {
            stars.push (
                <span key={i} onClick= {() => onChange(i)}>
                    ★
                </span>
            );
        } else
            stars.push(
                <span key={i} onClick= {() => onChange(i + 1)}>
                    ☆
                </span>
            )
    }
    return <div className='ml-2 p-1'>{stars}</div>
}

export default Rating