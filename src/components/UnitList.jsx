import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, CheckCircle } from 'lucide-react';
import './UnitList.css';

const UnitList = () => {
    const { units, selectUnit, completedUnits } = useApp();

    return (
        <div className="unit-list-page">
            <header className="page-header">
                <h1>My Library</h1>
                <p className="subtitle">4000 Essential English Words - Book 6</p>
            </header>

            <div className="units-grid">
                {units.map((unit) => (
                    <button
                        key={unit.id}
                        className="unit-card"
                        onClick={() => selectUnit(unit.id)}
                    >
                        <div className="unit-info">
                            <span className="unit-label">UNIT</span>
                            <span className="unit-number">{unit.id}</span>
                        </div>
                        <div className="unit-details">
                            <h3>{unit.title}</h3>
                            <p>{unit.words.length} Words</p>
                        </div>
                        <div className="unit-status">
                            {completedUnits.includes(unit.id) ? (
                                <CheckCircle className="icon-success" size={24} />
                            ) : (
                                <ChevronRight className="icon-nav" size={24} />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UnitList;
