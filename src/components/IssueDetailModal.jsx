import React, { useState } from 'react';
import { updateIssue } from '../data/IssueService';
import { getCurrentUser } from '../data/AuthService';
import { X, Send, User, Calendar, MapPin, MessageCircle, ThumbsUp } from 'lucide-react';

const IssueDetailModal = ({ issue, onClose, loadIssues, isAdmin }) => {
    const [commentText, setCommentText] = useState('');
    const user = getCurrentUser();

    if (!issue) return null;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            commentId: issue.comments.length + 1,
            author: user ? user.name : 'Anonymous',
            text: commentText,
            timestamp: new Date().toISOString(),
            role: user ? user.role : 'citizen'
        };

        const updatedComments = [...issue.comments, newComment];
        const updatedIssue = { ...issue, comments: updatedComments };

        updateIssue(updatedIssue);
        loadIssues();
        setCommentText('');
    };

    const handleUpvote = () => {
        const updatedIssue = { ...issue, upvotes: issue.upvotes + 1 };
        updateIssue(updatedIssue);
        loadIssues();
    };

    const getCommentClass = (role) => {
        if (role === 'admin') return 'bg-primary/10 border-l-4 border-primary';
        return 'bg-secondary border-l-4 border-gray-300';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                        bg-black/40 backdrop-blur-md transition-all duration-300">

            <div className="relative bg-background w-full max-w-2xl rounded-xl shadow-2xl p-6 border border-white/10">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <h2 className="text-3xl font-bold mb-2 text-gray-900">{issue.title}</h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm 
                                text-gray-500 mb-6 border-b pb-4 border-gray-200">

                    <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Reported: {new Date(issue.reportedOn).toLocaleDateString()}
                    </span>

                    <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        By: {issue.reporterName}
                    </span>

                    <span className="flex items-center font-medium text-primary">
                        <MapPin className="w-4 h-4 mr-1" />
                        {issue.category}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                    {issue.description}
                </p>

                {/* Actions */}
                <div className="flex items-center space-x-4 mb-8">
                    <button
                        onClick={handleUpvote}
                        className="flex items-center text-sm px-4 py-2 rounded-lg 
                                   bg-secondary text-gray-700 hover:bg-gray-200 transition font-semibold"
                    >
                        <ThumbsUp className="w-4 h-4 mr-2 text-primary" />
                        Upvote ({issue.upvotes})
                    </button>

                    <span
                        className={`text-sm font-semibold px-4 py-2 rounded-lg border
                        ${issue.status === 'Pending' ? 'bg-red-100 text-red-600 border-red-300' :
                          issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600 border-yellow-300' :
                          'bg-green-100 text-primary border-green-300'}`}
                    >
                        Status: {issue.status}
                    </span>
                </div>

                {/* Comments */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center 
                                   text-gray-800 border-b pb-2 border-gray-200">
                        <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                        Discussion ({issue.comments.length})
                    </h3>

                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {issue.comments.length === 0 ? (
                            <p className="text-gray-500 italic p-3 
                                          bg-secondary rounded-lg">
                                No comments yet. Be the first to engage.
                            </p>
                        ) : (
                            issue.comments.map(comment => (
                                <div
                                    key={comment.commentId}
                                    className={`p-3 rounded-lg text-sm ${getCommentClass(comment.role)}`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-800 flex items-center">
                                            {comment.author}
                                            {comment.role === 'admin' && (
                                                <span className="ml-2 text-xs font-bold text-white bg-primary px-2 py-0.5 rounded-full">
                                                    ADMIN
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(comment.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mt-6 border-t border-gray-200 pt-4">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            rows="2"
                            placeholder={user ? `Comment as ${user.name}...` : "You must be logged in to comment."}
                            disabled={!user}
                            className="w-full rounded-lg border border-gray-300 
                                       p-3 bg-white text-gray-800 
                                       focus:ring-primary focus:border-primary transition"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={!user || !commentText.trim()}
                            className="mt-2 flex items-center py-2 px-4 rounded-lg text-sm font-semibold 
                                       text-white bg-primary disabled:bg-gray-400 hover:bg-primary-dark transition"
                        >
                            <Send className="w-4 h-4 mr-1" />
                            Post Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default IssueDetailModal;
