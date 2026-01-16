import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Type } from 'lucide-react';
import './Reading.css';

const Reading = () => {
    const { currentUnit } = useApp();
    const [fontSize, setFontSize] = useState('medium'); // small, medium, large

    if (!currentUnit || !currentUnit.reading) return null;

    const { title, content } = currentUnit.reading;

    const toggleFontSize = () => {
        if (fontSize === 'medium') setFontSize('large');
        else if (fontSize === 'large') setFontSize('small');
        else setFontSize('medium');
    };

    return (
        <div className={`reading-container text-${fontSize}`}>
            <header className="reading-header">
                <span className="reading-label">Reading</span>
                <button className="btn-text-size" onClick={toggleFontSize}>
                    <Type size={20} />
                    <span>{fontSize === 'medium' ? 'Aa' : fontSize === 'large' ? 'AA' : 'aa'}</span>
                </button>
            </header>

            <article className="reading-content">
                <h1>{title}</h1>
                <div className="text-body">
                    {content.split('\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default Reading;
