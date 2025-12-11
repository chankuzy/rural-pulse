import { getCurrentUser } from "./AuthService";

const DB_KEY = 'COMMUNITY_ISSUES_DB';

const getInitialIssues = () => {
    return [
        {
            id: 'RPT-1704067200000',
            reporterName: 'Anonymous',
            title: 'Major Pothole near KASU Gate',
            category: 'Roads',
            description: 'There is a huge, car-damaging pothole right at the entrance of the university road. Needs urgent attention.',
            location: { lat: 10.518, lng: 7.433 },
            status: 'Pending',
            reportedOn: '2025-12-01T10:00:00Z',
            upvotes: 12,
            comments: [{ author: 'Admin', text: 'Report acknowledged.', timestamp: '2025-12-01T12:00:00Z' }],
            mediaUrl: 'https://via.placeholder.com/150/f44336/ffffff?text=Pothole'
        },
        {
            id: 'RPT-1704153600000',
            reporterName: 'Nuhu Abdullahi',
            title: 'Water Leakage on Campus Hostel',
            category: 'Water Supply',
            description: 'A pipe burst inside Block D hostel. Water is being wasted.',
            location: { lat: 10.520, lng: 7.435 },
            status: 'In Progress',
            reportedOn: '2025-12-02T14:30:00Z',
            upvotes: 5,
            comments: [{ author: 'Admin', text: 'Maintenance team deployed.', timestamp: '2025-12-02T16:00:00Z' }],
            mediaUrl: 'https://via.placeholder.com/150/2196F3/ffffff?text=Water+Leak'
        }
    ];
};

// --- Service Functions ---

export const getAllIssues = () => {
    const issuesJson = localStorage.getItem(DB_KEY);
    if (!issuesJson) {
        // Initialize DB if empty
        const initialData = getInitialIssues();
        localStorage.setItem(DB_KEY, JSON.stringify(initialData));
        return initialData;
    }
    return JSON.parse(issuesJson);
};

export const addIssue = (newIssue) => {
    const issues = getAllIssues();
    const user = getCurrentUser();
    
    // Generate unique ID and metadata
    const issueWithMeta = {
        ...newIssue,
        id: `RPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: 'Pending',
        reportedOn: new Date().toISOString(),
        upvotes: 0,
        comments: [],
        reporterName: user ? user.name : 'Anonymous', // Default to Anonymous
    };

    issues.push(issueWithMeta);
    localStorage.setItem(DB_KEY, JSON.stringify(issues));
    return issueWithMeta;
};

// Function to handle updates (e.g., status, upvotes, comments)
export const updateIssue = (updatedIssue) => {
    const issues = getAllIssues();
    const index = issues.findIndex(i => i.id === updatedIssue.id);
    
    if (index > -1) {
        issues[index] = updatedIssue;
        localStorage.setItem(DB_KEY, JSON.stringify(issues));
        return issues[index];
    }
    return null;
};