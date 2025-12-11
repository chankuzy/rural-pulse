import React from 'react';
import { Map, MapPin } from 'lucide-react';

const MapView = ({ issues }) => {
    // Filter issues to display only those with (simulated) location data
    const issuesWithLocation = issues.filter(i => i.location && i.location.lat);
    
    // Determine the color of the pin based on the issue status
    const getPinColor = (status) => {
        switch (status) {
            case 'Pending': return 'text-red-600';
            case 'In Progress': return 'text-yellow-500';
            case 'Resolved': return 'text-primary'; // Uses the subtle green primary color
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="bg-background shadow-lg rounded-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center">
                <Map className="w-6 h-6 mr-2" />
                Issue Locations Overview (Simulated Map)
            </h2>
            
            {issuesWithLocation.length === 0 ? (
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center border-4 border-gray-300">
                    <p className="text-gray-500 italic">No reports with location data to display.</p>
                </div>
            ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg relative overflow-hidden border-4 border-gray-300">
                    
                    {/* Visual Placeholder for the map area */}
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/800x400?text=Simulated+Map+Area')" }}>
                        {/* Semi-transparent overlay */}
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                    </div>
                    
                    <span className="text-white font-semibold text-lg absolute top-4 left-4 z-10 p-2 bg-primary/80 rounded-lg shadow-lg">
                        {issuesWithLocation.length} Issues Pinpointed
                    </span>

                    {/* Simulated Pins */}
                    {issuesWithLocation.slice(0, 10).map((issue, index) => (
                        <div 
                            key={issue.id} 
                            className={`absolute cursor-pointer hover:scale-110 transition duration-150 transform -translate-x-1/2 -translate-y-full z-20 ${getPinColor(issue.status)}`}
                            // Use the location values to determine random-looking but stable positions
                            style={{ 
                                // Generate pseudo-random, unique positions based on the issue ID/index
                                top: `${30 + (issue.location.lat * 1000 % 40)}%`, 
                                left: `${20 + (issue.location.lng * 1000 % 60)}%` 
                            }}
                            title={`${issue.title} - Status: ${issue.status}`}
                        >
                            <MapPin className="w-8 h-8 drop-shadow-lg" fill="currentColor" stroke="white" strokeWidth={1} />
                        </div>
                    ))}

                </div>
            )}
            

            <p className="mt-4 text-sm text-gray-600">
                **Note:** This is a simulated map view. In a full implementation, this area would integrate a library like Leaflet.js or Google Maps to show real-time geographic data.
            </p>
        </div>
    );
};

export default MapView;