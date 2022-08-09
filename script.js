const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const tweetBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Get quates fron an API
let apiQuotes = []

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
  
// Remove Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quote
function newQuote() {
    loading()
    // select a randon Quote from api qutoes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text
    complete()
}


async function getQuotes() {
    loading()
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        // console.log(apiQuotes)
        newQuote()
    } catch (error) {
        getQuotes()
        
    }
}

// Event Listener
newQuoteBtn.addEventListener("click", newQuote)
tweetBtn.addEventListener("click", tweetBtnfun)

// Tweet QuoteBtn
function tweetBtnfun() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, "_blank")

}


// run the getQuoters function
getQuotes()