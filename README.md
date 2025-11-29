# EaglePoint AI Tasks

This repository contains three coding tasks completed for EaglePoint AI.

## Task 1: Text Analyzer (Python)

**File:** `task1_text_analyzer.py`

A Python function that analyzes text and returns:

- Total word count
- Average word length
- Longest words
- Word frequency count

## Task 2: Async Data Fetcher with Retry (JavaScript)

**File:** `task2AsyncDataFetcherWithRetry.js`

An async JavaScript function that fetches data with automatic retry logic:

- Retries up to 3 times on failure
- Waits 1 second between retries
- Uses async/await
- Includes a mock API for testing

## Task 3: Rate Limiter (JavaScript)

**File:** `rateLimiter.js`

A rate limiter that controls API usage:

- Limits users to 5 requests per 60 seconds
- Tracks requests by user ID
- Auto-resets after time window expires
- Includes working examples

## Running the Code

```bash
# Python task
python task1_text_analyzer.py

# JavaScript tasks
node task2AsyncDataFetcherWithRetry.js
node rateLimiter.js
```
