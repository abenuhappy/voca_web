import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import './WordStudy.css';

const WordStudy = () => {
    const { currentUnit } = useApp();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [currentUnit]);

    if (!currentUnit) return null;

    const words = currentUnit.words;
    const currentWord = words[currentIndex];

    const nextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const prevWord = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    const playAudio = (e) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const playExampleAudio = (e) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(currentWord.example);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="study-container">
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                />
            </div>

            <header className="study-header">
                <h2>Unit {currentUnit.id}</h2>
                <span className="counter">{currentIndex + 1} / {words.length}</span>
            </header>

            <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>

                    {/* Front of Card */}
                    <div className="card-face card-front">
                        <div className="word-main">
                            <h1>{currentWord.word}</h1>
                            <div className="phonetics">
                                <span className="pos">{currentWord.partOfSpeech}</span>
                                <span className="ipa">{currentWord.pronunciation}</span>
                                <button className="btn-audio" onClick={playAudio}>
                                    <Volume2 size={24} />
                                </button>
                            </div>
                        </div>
                        <p className="tap-hint">Tap to flip</p>
                    </div>

                    {/* Back of Card */}
                    <div className="card-face card-back">
                        <div className="word-header-small">
                            <h3>{currentWord.word}</h3>
                            <button className="btn-audio-small" onClick={playAudio}>
                                <Volume2 size={16} />
                            </button>
                        </div>

                        <div className="definition-section">
                            <h4>Meaning</h4>
                            {currentWord.meaning_kr && <p className="meaning-kr">{currentWord.meaning_kr}</p>}
                            <p>{currentWord.meaning}</p>
                        </div>

                        <div className="example-section">
                            <div className="section-header">
                                <h4>Example</h4>
                                <button className="btn-audio-small" onClick={playExampleAudio}>
                                    <Volume2 size={16} />
                                </button>
                            </div>
                            <p className="example-text">"{currentWord.example}"</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="controls">
                <button className="btn-control" onClick={prevWord} disabled={currentIndex === 0}>
                    <ArrowLeft />
                </button>
                <button className="btn-control primary" onClick={() => setIsFlipped(!isFlipped)}>
                    {isFlipped ? 'Show Word' : 'Show Meaning'}
                </button>
                <button className="btn-control" onClick={nextWord} disabled={currentIndex === words.length - 1}>
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default WordStudy;
