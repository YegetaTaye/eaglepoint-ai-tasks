// I used JavaScript to implement an asynchronous data fetcher with retry logic.
// I used CamelCase naming convention throughout the code.

// Mock API call that simulates fetching data from a URL
const mockApiCall = async (url) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Randomly succeed or fail (50% chance each)
    if (Math.random() > 0.5) {
        return { data: `Success! Data from ${url}`, status: 200 };
    } else {
        throw new Error('API call failed');
    }
};

// Fetch with retry logic. maxRetries = 3 by default
// I added console logs to indicate attempts and errors and also to show the procedure clearly.
const fetchWithRetry = async (url, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} of ${maxRetries}...`);
            const result = await mockApiCall(url);
            console.log('Success:', result);
            return result;
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
            }
            
            // Wait 1 second before next retry upon failure
            console.log('Waiting 1 second before retry... ', "\n");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

// Test the function
fetchWithRetry('https://api.example.com/data', 3)
    .then(data => console.log('Final result:', data))
    .catch(error => console.error('Final error:', error.message));
