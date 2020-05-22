const binderFullOfQuotes = [
    {
        source: {
            display: "CNN",
            link: "www.google.com"
        },
        quote: "Why are we having all these people from shithole countries come here"
    },
    {
        source: {
            display: "POLITICO",
            link: "www.google.com"
        },
        quote: "I am the least racist person you hav ever interviewed"
    }
];

window.onload = () => {
    setPage();
}

function fetchQuote(func) {
    const index = getRandomInt(0, binderFullOfQuotes.length); //random number between 0..array.length
    return func(binderFullOfQuotes[index]);
}

/*
function fetchQuote() {
    const index = getRandomInt(0, binderFullOfQuotes.length); //random number between 0..array.length
    // return object from array at random index

    return binderFullOfQuotes[index];
}
*/

function setPage() {
    const quoteElement = document.getElementById('quote');
    const sourceElement = document.getElementById('source');
    // const quoteObj = fetchQuote();
    fetchQuote((quoteObj) => {
        setSourceClickListener(sourceElement, quoteObj);

        quoteElement.innerText = quoteObj.quote;
        sourceElement.innerText = quoteObj.source.display;
        sourceElement.setAttribute('href', quoteObj.source.link)
    
    });
}

function setSourceClickListener(sourceElement, quoteObj) {
    if (!sourceElement) { console.error("Something went wrong", source); return; }
    sourceElement.addEventListener('click', (event) => {
        console.log('asdasd');
        window.open(quoteObj.source.link.substr(), "_blank");
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}