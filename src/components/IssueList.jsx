import React, { useState } from 'react';
import { updateIssue } from '../data/IssueService';
import { ThumbsUp, MessageCircle, MapPin, Loader, CheckCircle, Clock } from 'lucide-react';
import IssueDetailModal from './IssueDetailModal'; // <-- The Modal is imported

const IssueList = ({ issues, loadIssues, isAdmin }) => {
  // State to control which issue is currently selected and visible in the modal
  const [selectedIssue, setSelectedIssue] = useState(null); 
  
  // Sort issues: Pending (1), In Progress (2), Resolved (3), then by latest date
  const sortedIssues = [...issues].sort((a, b) => {
    const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Resolved': 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return new Date(b.reportedOn) - new Date(a.reportedOn); 
  });

  // --- Utility Functions (Status classes/icons) ---

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pending': return 'bg-red-100 text-red-600 border-red-300';
      case 'In Progress': return 'bg-yellow-100 text-yellow-600 border-yellow-300';
      case 'Resolved': return 'bg-green-100 text-primary border-green-300';
      default: return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4 mr-1" />;
      case 'In Progress': return <Loader className="w-4 h-4 mr-1 animate-spin" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };
  
  // --- Admin Logic ---
  const handleStatusChange = (issue, newStatus) => {
    if (!isAdmin) return;
    
    const updatedIssue = { 
        ...issue, 
        status: newStatus,
        resolvedOn: newStatus === 'Resolved' ? new Date().toISOString() : null,
    };
    updateIssue(updatedIssue);
    loadIssues(); 
  };

  // --- Individual Issue Card Component ---
  const IssueCard = ({ issue }) => (
    // CLICK HANDLER: This is what triggers the modal
    <div 
      key={issue.id} 
      onClick={() => setSelectedIssue(issue)} 
      className="bg-background p-5 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900 leading-snug">{issue.title}</h3>
        {/* Status Badge */}
        <span className={`inline-flex items-center text-xs font-semibold px-3 py-1 ml-4 rounded-full border ${getStatusClasses(issue.status)}`}>
          {getStatusIcon(issue.status)}
          {issue.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{issue.description}</p>
      
      {/* Metadata */}
      <div className="flex flex-wrap items-center text-xs text-gray-500 space-x-4 mb-4">
        <span className="flex items-center font-medium text-primary">
            <MapPin className="w-4 h-4 mr-1" />
            {issue.category}
        </span>
        <span>|</span>
        <span>By: <span className="font-medium text-gray-700">{issue.reporterName}</span></span>
        <span>|</span>
        <span>{new Date(issue.reportedOn).toLocaleDateString()}</span>
      </div>

      {/* Quick Action Summary */}
      <div className="flex items-center space-x-3 border-t pt-4">
        <span className="flex items-center text-sm px-3 py-1.5 rounded-full bg-secondary text-gray-700">
            <ThumbsUp className="w-4 h-4 mr-1" />
            Upvotes: {issue.upvotes}
        </span>
        <span className="flex items-center text-sm px-3 py-1.5 rounded-full bg-secondary text-gray-700">
            <MessageCircle className="w-4 h-4 mr-1" />
            Comments: {issue.comments.length}
        </span>
      </div>

      {/* Admin Controls (Conditional Render) */}
      {isAdmin && (
        <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Admin Actions:</p>
            <div className="flex space-x-2 flex-wrap">
                {['Pending', 'In Progress', 'Resolved'].map(status => (
                    <button
                        key={status}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents the card click from opening the modal
                            handleStatusChange(issue, status);
                        }}
                        disabled={issue.status === status}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition duration-150 ease-in-out ${
                            issue.status === status
                                ? 'bg-primary text-white cursor-default opacity-80' 
                                : 'bg-gray-200 text-gray-800 hover:bg-primary hover:text-white'
                        }`}
                    >
                        Set to {status}
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Issue Tracker 
          {isAdmin && <span className="text-sm font-normal ml-3 px-3 py-1 rounded-full bg-primary text-white">ADMIN VIEW</span>}
      </h2>
      
      {issues.length === 0 ? (
        <div className="p-10 bg-background rounded-xl text-center border border-gray-200">
            <p className="text-lg text-gray-500 italic">No community issues have been reported yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
        </div>
      )}

      {/* Conditional Rendering of the Modal */}
      {selectedIssue && (
        <IssueDetailModal 
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)} // Function to close the modal
          loadIssues={loadIssues} // Allows modal to trigger list refresh after comment/upvote
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default IssueList;