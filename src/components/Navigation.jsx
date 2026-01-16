import React from 'react';
import { Home, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Navigation.css';

const Navigation = () => {
    const { activeTab, setActiveTab, currentUnitId } = useApp();

    const tabs = [
        { id: 'home', icon: Home, label: 'Units' },
        { id: 'study', icon: BookOpen, label: 'Learn', disabled: !currentUnitId },
        { id: 'quiz', icon: GraduationCap, label: 'Quiz', disabled: !currentUnitId },
        { id: 'reading', icon: FileText, label: 'Read', disabled: !currentUnitId },
    ];

    return (
        <nav className="bottom-nav">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
                    onClick={() => !tab.disabled && setActiveTab(tab.id)}
                    disabled={tab.disabled}
                >
                    <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                    <span className="nav-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default Navigation;
