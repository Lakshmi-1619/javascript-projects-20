const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Comment this line, if local API is used
let apiQuotes = [];

// Show loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true
}

// Show new quote
function newQuote(){
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    // Comment this line, if local API is used
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    authorText.textContent = quote.author;
    // Check Quote Length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    // Uncomment this line, if local API is used
    //const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
}

//  Get quotes from API
// An asynchronous function can run at any time independently and it won't stop the browser from completing the loading of a page.
// Comment the whole function, if local API is used
async function getQuote(){
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        getQuote();
    }
}

// Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Comment this line, if local API is used
getQuote();

// Uncomment this line, if local API is used
//newQuote();