// Rate Limiter - Limits users to 5 requests per 60 seconds
// This tracks each user's requests and blocks them if they go over the limit

// This object will store all users and their request history
const userRequests = {};

// Settings for the rate limiter
const MAX_REQUESTS = 5;        // How many requests allowed
const TIME_WINDOW = 60 * 1000; // 60 seconds in milliseconds

// Main function to check if a user can make a request
const canMakeRequest = (userId) => {
    const currentTime = Date.now();
    
    // If this is the first time we see this user, set them up
    if (!userRequests[userId]) {
        userRequests[userId] = [];
    }
    
    // Get all the requests this user has made
    const userRequestList = userRequests[userId];
    
    // Remove old requests that are outside our 60 second window
    // We only care about recent requests
    const recentRequests = userRequestList.filter(timestamp => {
        const timeDifference = currentTime - timestamp;
        return timeDifference < TIME_WINDOW;
    });
    
    // Update the user's request list with only recent ones
    userRequests[userId] = recentRequests;
    
    // Check if they've made too many requests
    if (recentRequests.length >= MAX_REQUESTS) {
        // Calculate how long until they can make another request
        const oldestRequest = recentRequests[0];
        const timeUntilReset = TIME_WINDOW - (currentTime - oldestRequest);
        const secondsLeft = Math.ceil(timeUntilReset / 1000);
        
        return {
            allowed: false,
            message: `Rate limit exceeded! Please wait ${secondsLeft} seconds.`,
            remainingRequests: 0,
            resetIn: secondsLeft
        };
    }
    
    // User is good to go! Add this request to their history
    userRequests[userId].push(currentTime);
    
    return {
        allowed: true,
        message: 'Request allowed',
        remainingRequests: MAX_REQUESTS - recentRequests.length - 1,
        resetIn: 60
    };
};

// Helper function to simulate making a request
const makeRequest = (userId, requestName) => {
    console.log(`\n--- User ${userId} trying: ${requestName} ---`);
    
    const result = canMakeRequest(userId);
    
    if (result.allowed) {
        console.log(` SUCCESS: ${result.message}`);
        console.log(` Remaining requests: ${result.remainingRequests}`);
    } else {
        console.log(` BLOCKED: ${result.message}`);
    }
    
    return result;
};

// Example: Testing the rate limiter
console.log('========================================');
console.log('Testing Rate Limiter (5 requests per 60 seconds)');
console.log('========================================');

// User "john" makes 5 requests quickly (should all work)
makeRequest('john', 'Get profile');
makeRequest('john', 'Get posts');
makeRequest('john', 'Get friends');
makeRequest('john', 'Get messages');
makeRequest('john', 'Get notifications');

// The 6th request should be blocked
makeRequest('john', 'Get settings');

// User "jane" should be able to make requests (different user)
makeRequest('jane', 'Get profile');
makeRequest('jane', 'Get posts');

// John tries again (still blocked)
makeRequest('john', 'Get settings again');

// Testing the auto-reset after time window
console.log('\n========================================');
console.log('Waiting 3 seconds and testing again...');
console.log('(In real app, this would be 60 seconds)');
console.log('========================================');

// Simulate waiting (in real use, you'd wait 60 seconds)
setTimeout(() => {
    // After time passes, old requests should be removed
    // Let's manually adjust the time for demo purposes
    const oldTime = Date.now() - (TIME_WINDOW + 1000);
    userRequests['john'] = [oldTime, oldTime, oldTime, oldTime, oldTime];
    
    console.log('\n60 seconds have passed (simulated)...\n');
    
    // Now John should be able to make requests again
    makeRequest('john', 'Get settings after reset');
    makeRequest('john', 'Get profile again');
}, 3000);
