import React, { createContext, useState, useContext, useEffect } from 'react';
import contentData from '../data/content.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [units, setUnits] = useState([]);
    const [currentUnitId, setCurrentUnitId] = useState(null);
    const [completedUnits, setCompletedUnits] = useState([]);
    const [activeTab, setActiveTab] = useState('home'); // home, study, quiz, reading

    useEffect(() => {
        setUnits(contentData.units);
        // Auto-select unit 1 for now if needed, or leave null
    }, []);

    const currentUnit = units.find(u => u.id === currentUnitId);

    const selectUnit = (id) => {
        setCurrentUnitId(id);
        setActiveTab('study'); // Auto switch to study when unit selected
    };

    const markUnitComplete = (id) => {
        if (!completedUnits.includes(id)) {
            setCompletedUnits([...completedUnits, id]);
        }
    };

    return (
        <AppContext.Provider value={{
            units,
            currentUnit,
            currentUnitId,
            selectUnit,
            completedUnits,
            markUnitComplete,
            activeTab,
            setActiveTab
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
