window.onload = () => {
    setPage();
}

// Get that delicious data from the API
async function fetchQuote(successFunc, errFunc) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/quotes');
        const data = await response.json();
        if (!validateResponse(data)) {
            errFunc('Malformed API response', data);
            return;
        }
        successFunc(data);
    } catch (e) {
        errFunc(e);
    }
}

// Check that the response exists, and has all required data to create the page
function validateResponse(quoteObj) {
    if (!quoteObj || !quoteObj.quote) { return false; }
    if (!quoteObj.source || !quoteObj.source.link || !quoteObj.source.display) { return false; }

    if (quoteObj.quote.trim().length === 0) { return false; }
    if (quoteObj.source.link.trim().length === 0) { return false; }
    if (quoteObj.source.display.trim().length === 0) { return false; }


    return true;
}

// Get DOM references, start fetching data
function setPage() {
    const quoteElement = document.getElementById('quote');
    const sourceElement = document.getElementById('source');

    fetchQuote((quoteObj) => {
        const quote = new Quote(quoteObj.quote, quoteObj.source);

        quoteElement.innerText = quote.quote;
        sourceElement.innerText = quote.source.display;
        sourceElement.setAttribute('href', quote.source.link)

    }, err => console.error(err));
}

// Create an event listener for href clicks
function setSourceClickListener(sourceElement, quoteObj) {
    if (!sourceElement) { console.error("Something went wrong", source); return; }
    sourceElement.addEventListener('click', (event) => {
        console.log('asdasd');
        window.open(quoteObj.source.link.substr(), "_blank");
    });
}

// From MDN
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Just for fun
class Quote {
    constructor(quote, source) {
        this.quote = quote;
        this.source = {
            link: source.link,
            display: source.display
        }
    }
}