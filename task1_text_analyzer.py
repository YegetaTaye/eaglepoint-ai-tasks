# I used python of this task and follow snake_case naming convention for functions and variables.

# This function analyzes a given text and returns a dictionary with required statistics.
def analyze_text(text: str) -> dict:
    # First I check whether the text is empty, if it is just return empty stats right away
    if not text or text.strip() == "":
        return {
            "word_count": 0,
            "average_word_length": 0.0,
            "longest_words": [],
            "word_frequency": {}
        }

    # Convert everything to lowercase to make counting easier and case-insensitive as well 
    lower_text = text.lower()

    # Replace punctuation with spaces manually in order to not count them as part of words
    cleaned_text = ""
    for ch in lower_text:
        if ch.isalpha() or ch.isdigit() or ch.isspace():
            cleaned_text += ch
        else:
            cleaned_text += " "

    # Split the cleaned text into words. the result is a list of words
    words = cleaned_text.split()

    # Word count is simply the length of the list
    word_count = len(words)

    # Calculate average word length
    total_length = 0
    for word in words:
        total_length += len(word)

    average_length = total_length / word_count if word_count > 0 else 0
    average_length = round(average_length, 2)

    # Find the longest word(s) I used list to store them since there can be multiple of the same length 
    longest_words = []
    longest_length = 0

    for word in words:
        current_length = len(word)

        if current_length > longest_length:
            # Found a new longest word → reset the list
            longest_length = current_length
            longest_words = [word]

        elif current_length == longest_length:
            # Same length → add to list if not already added
            if word not in longest_words:
                longest_words.append(word)

    # Count frequency of each word:
    word_frequency = {}
    for word in words:
        if word in word_frequency:
            word_frequency[word] += 1
        else:
            word_frequency[word] = 1

    # Return the final dictionary
    return {
        "word_count": word_count,
        "average_word_length": average_length,
        "longest_words": longest_words,
        "word_frequency": word_frequency
    }


# Example execution
example = "The quick brown fox jumps over the lazy dog the fox"
print(analyze_text(example))
