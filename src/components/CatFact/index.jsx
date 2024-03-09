import { useState, useRef, useEffect } from 'react';

import styles from './styles.module.scss';

export const CatFact = () => {
    const [fact, setFact] = useState('');
    const textareaRef = useRef(null);

    const fetchData = async () => {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            setFact(data.fact);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        fetchData();
    };

    useEffect(() => {
        if (textareaRef.current) {
            const text = textareaRef.current.value;
            const spaceIndex = text.indexOf(' ');

            if (spaceIndex !== -1) {
                textareaRef.current.setSelectionRange(spaceIndex, spaceIndex);
                textareaRef.current.focus();
            }
        }
    }, [fact]);

    return (
        <div className={styles.facts}>
            <h1 className={styles.title}>fact about cats</h1>
            <textarea
                type="text"
                cols="50"
                rows="10"
                ref={textareaRef}
                value={fact}
                onChange={(e) => setFact(e.target.value)}></textarea>
            <button className={styles.button} onClick={(e) => handleClick(e)}>
                Fetch
            </button>
        </div>
    );
};
