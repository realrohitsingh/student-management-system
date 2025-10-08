import React, { useState } from 'react';
import '../styles/MainContent.css';

const MainContent = () => {
    const [count, setCount] = useState(0);

    return (
        <main className="main-content">
            <section className="hero">
                <h2>Welcome to React!</h2>
                <p>This is a sample React application with organized components and styles.</p>
            </section>

            <section className="counter-section">
                <h3>Interactive Counter</h3>
                <div className="counter">
                    <button onClick={() => setCount(count - 1)}>-</button>
                    <span className="count-display">{count}</span>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </div>
            </section>
        </main>
    );
};

export default MainContent;
