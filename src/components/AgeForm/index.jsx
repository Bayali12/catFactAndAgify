import { useState, useRef, useEffect } from 'react';

export const AgeForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef(null);
    const inputRef = useRef(null);
    const abortController = new AbortController();
    const signal = abortController.signal;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (name !== inputRef.current.value) {
            setName(inputRef.current.value);
        }
    };

    const handleNameChange = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            if (name !== inputRef.current.value) {
                setName(inputRef.current.value);
            }
        }, 3000);
    };

    useEffect(() => {
        (async () => {
            try {
                if (name) {
                    setLoading(true);
                    const response = await fetch(`https://api.agify.io/?name=${name}`, { signal });

                    if (!signal.aborted) {
                        if (response.ok) {
                            const data = await response.json();
                            setAge(data.age);
                        }
                    }
                }
            } catch (error) {
                if (!signal.aborted) {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            abortController.abort();
        };
    }, [name]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={inputRef} onChange={(e) => handleNameChange(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            {loading && <p>Loading...</p>}
            {age && <p>Age: {age}</p>}
        </div>
    );
};
