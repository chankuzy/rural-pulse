import React, { useState } from 'react';
import IssueForm from './IssueForm';
import IssueList from './IssueList';
import MapView from './MapView'; // <-- MapView is correctly imported
import { ListChecks, PlusCircle, Map } from 'lucide-react';

const Dashboard = ({ issues, loadIssues, isAdmin }) => {
    // Default to list view
    const [activeTab, setActiveTab] = useState('list'); 

    const handleNewIssue = () => {
        loadIssues(); // Refresh the list from localStorage
        setActiveTab('list'); // Switch to list view after submission
    };

    const TabButton = ({ name, icon: Icon, onClick, count }) => (
        <button
            onClick={onClick}
            className={`flex items-center py-2 px-4 text-sm font-medium border-b-2 transition duration-200 ease-in-out ${
                activeTab === name
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
        >
            <Icon className="w-5 h-5 mr-2" />
            {name === 'list' ? `Tracked Issues (${count})` : name === 'report' ? 'Report New Issue' : 'Map View'}
        </button>
    );

    return (
        <div className="bg-background shadow-lg rounded-xl p-4 sm:p-8">
            {/* Tab Navigation */}
            <nav className="border-b border-gray-200 mb-6 flex space-x-4 overflow-x-auto">
                <TabButton 
                    name="list" 
                    icon={ListChecks} 
                    onClick={() => setActiveTab('list')} 
                    count={issues.length}
                />
                <TabButton 
                    name="map" // <-- Map Tab Included
                    icon={Map} 
                    onClick={() => setActiveTab('map')} 
                />
                <TabButton 
                    name="report" 
                    icon={PlusCircle} 
                    onClick={() => setActiveTab('report')} 
                />
            </nav>

            {/* Content Area */}
            <div className="py-4">
                {activeTab === 'report' && (
                    <IssueForm onNewIssue={handleNewIssue} />
                )}

                {activeTab === 'list' && (
                    <IssueList 
                        issues={issues} 
                        loadIssues={loadIssues} 
                        isAdmin={isAdmin}
                    />
                )}
                
                {activeTab === 'map' && ( 
                    <MapView 
                        issues={issues} 
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;