import React from 'react';

export const Home = () => {

    const words = ['Now...', 'This', 'is', 'AUTHENTICATION.'];

    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            setCount((count + 1) % 4);
        }, 1000);
        return () => clearInterval(id);
    });

    return (
        <h1 className={`_${count}`}>{words[count]}</h1>
    )
}