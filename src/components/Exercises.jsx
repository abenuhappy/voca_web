import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import './Exercises.css';

const Exercises = () => {
    const { currentUnit } = useApp();
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null); // null, true, false
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        resetQuiz();
    }, [currentUnit]);

    const resetQuiz = () => {
        setCurrentExerciseIndex(0);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsCorrect(null);
        setCompleted(false);
    };

    if (!currentUnit || !currentUnit.exercises) return null;

    const exerciseGroup = currentUnit.exercises[currentExerciseIndex];
    const question = exerciseGroup.questions[currentQuestionIndex];

    const handleOptionClick = (option) => {
        if (selectedOption !== null) return; // Prevent changing answer
        setSelectedOption(option);

        const correct = option === question.answer;
        setIsCorrect(correct);
    };

    const nextQuestion = () => {
        setSelectedOption(null);
        setIsCorrect(null);

        // Next question in group?
        if (currentQuestionIndex < exerciseGroup.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
        // Next exercise group?
        else if (currentExerciseIndex < currentUnit.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        }
        // Finished?
        else {
            setCompleted(true);
        }
    };

    if (completed) {
        return (
            <div className="quiz-container completed">
                <div className="completed-card">
                    <div className="icon-wrapper">
                        <CheckCircle size={64} color="var(--color-success)" />
                    </div>
                    <h2>Great Job!</h2>
                    <p>You've completed the exercises for Unit {currentUnit.id}.</p>
                    <button className="btn-primary" onClick={resetQuiz}>
                        <RefreshCw size={20} />
                        <span>Practice Again</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <header className="quiz-header">
                <span className="exercise-tag">{exerciseGroup.title}</span>
                <div className="progress-indicator">
                    Question {currentQuestionIndex + 1} / {exerciseGroup.questions.length}
                </div>
            </header>

            <div className="question-card">
                <p className="instruction">{exerciseGroup.instruction}</p>
                <h3 className="question-text">{question.question}</h3>

                <div className="options-grid">
                    {question.options.map((option, idx) => {
                        let statusClass = '';
                        if (selectedOption) {
                            if (option === question.answer) statusClass = 'correct';
                            else if (option === selectedOption) statusClass = 'wrong';
                        }

                        return (
                            <button
                                key={idx}
                                className={`option-btn ${statusClass}`}
                                onClick={() => handleOptionClick(option)}
                                disabled={selectedOption !== null}
                            >
                                {option}
                                {statusClass === 'correct' && <CheckCircle size={20} />}
                                {statusClass === 'wrong' && <XCircle size={20} />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="quiz-footer">
                {selectedOption && (
                    <div className={`feedback-msg ${isCorrect ? 'text-success' : 'text-error'}`}>
                        {isCorrect ? 'Correct!' : `Correct answer: ${question.answer}`}
                    </div>
                )}

                <button
                    className="btn-next"
                    disabled={!selectedOption}
                    onClick={nextQuestion}
                >
                    <span>Next</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Exercises;
