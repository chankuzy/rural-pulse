import React, { useState } from 'react';
import { addIssue } from '../data/IssueService';
import { Send, MapPin, Camera } from 'lucide-react';

// Hardcoded categories based on the project's focus
const categories = ['Roads', 'Waste Disposal', 'Power Outages', 'Water Supply', 'Security', 'Other'];

const IssueForm = ({ onNewIssue }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0],
    description: '',
    mediaUrl: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Simulate Location Fetching (Frontend-Only)
    const mockLocation = { 
        lat: 10.518 + (Math.random() * 0.01), 
        lng: 7.433 + (Math.random() * 0.01), 
        address: 'Simulated Location' 
    };

    const newIssue = {
      ...formData,
      location: mockLocation,
      // reporterName is handled inside IssueService based on login state
    };

    addIssue(newIssue);
    onNewIssue(); // Tell the parent component to refresh and switch view

    // 2. Reset form
    setFormData({ title: '', category: categories[0], description: '', mediaUrl: '' });
    // In a real app, this alert would be a clean notification toast.
    alert('Report submitted successfully! Check the tracker.');
  };

  return (
    // Responsiveness: p-4 for mobile, sm:p-6 for larger screens. Dark Mode added.
    <form onSubmit={handleSubmit} className="p-4 sm:p-6 bg-background shadow-lg rounded-xl max-w-lg mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-primary">Submit a New Community Report</h2>
      
      <div className="space-y-5">
        
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title of Issue</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-primary focus:ring-primary transition duration-150"
            placeholder="e.g., Blocked drainage at school road"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            // Dark Mode and Focus styles updated
            className="w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-primary focus:ring-primary transition duration-150"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            // Dark Mode and Focus styles updated
            className="w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-primary focus:ring-primary transition duration-150"
            placeholder="Provide exact location details, time, and severity."
          ></textarea>
        </div>

        {/* Location & Image Actions */}
        <div className="flex flex-col sm:flex-row gap-3"> {/* flex-col on mobile, sm:flex-row on desktop */}
            <button type="button" 
                    // Dark Mode and hover styles updated
                    className="flex items-center justify-center p-3 w-full bg-secondary text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150 text-sm">
                <MapPin className="w-5 h-5 mr-2" />
                Capture Location
            </button>
            <button type="button" 
                    // Dark Mode and hover styles updated
                    className="flex items-center justify-center p-3 w-full bg-secondary text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150 text-sm">
                <Camera className="w-5 h-5 mr-2" />
                Add Photo (Optional)
            </button>
        </div>
      </div>
      
      {/* Submit Button (Primary Green) */}
      <div className="mt-6">
        <button
          type="submit"
          // Primary button styles remain, no dark mode needed here
          className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition duration-200 ease-in-out"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Issue
        </button>
      </div>
    </form>
  );
};

export default IssueForm;