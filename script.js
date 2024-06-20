const motivation = {
    "quote1": "The only easy day was yesterday.",
    "quote2": "Don't stop when you're tired. Stop when you're done.",
    "quote3": "If you're not pushing yourself beyond the comfort zone, if you're not demanding more from yourself - expanding and learning as you go - you're choosing a numb existence. You're denying yourself an extraordinary trip."
};

const endurance = {
    "quote1": "Suffering is the true test of life.",
    "quote2": "The only way to grow physically and mentally is to be uncomfortable.",
    "quote3": "It's not that I'm that smart, it's just that I stay with problems longer."
};

const selfDiscipline = {
    "quote1": "The worst thing that can happen to a man is to become civilized.",
};

const overcomingAdversity = {
    "quote1": "No matter what you're going through, there's a light at the end of the tunnel and it may seem hard to get to it but you can do it and just keep working towards it and you'll find the positive side of things.",
    "quote2": "Most people who doubt you because they can't do it themselves.",
    "quote3": "We all have a story to tell; it's up to you how you tell it."
};

const allQuotes = [
    ...Object.values(motivation),
    ...Object.values(endurance),
    ...Object.values(selfDiscipline),
    ...Object.values(overcomingAdversity)
];

const categoryButtons = document.querySelectorAll('.category-btn');
let quoteElement = document.querySelector('#quote');
const newQuoteButton = document.querySelector('#new-quote');
const saveQuoteButton = document.querySelector('#save-quote');
let listSavedQuote = document.querySelector('.list-group');
let savedQuotes = document.querySelector('.quotes-saved');
const defMessage = document.querySelector('.default-msg');

// Function to save all quotes to localStorage
const saveQuotesToLocalStorage = () => {
    const quotes = [];
    const savedQuotes = listSavedQuote.getElementsByTagName('li');
    for (let i = 0; i < savedQuotes.length; i++) {
        quotes.push(savedQuotes[i].textContent.replace('×', '').trim());
    }
    localStorage.setItem('savedQuotes', JSON.stringify(quotes));
};

// Function to save the state of category buttons to localStorage
const saveCategoryStateToLocalStorage = () => {
    const categories = {};
    categoryButtons.forEach(button => {
        categories[button.textContent.trim()] = button.classList.contains('active');
    });
    localStorage.setItem('categories', JSON.stringify(categories));
};

// Function to save the current quote to localStorage
const saveCurrentQuoteToLocalStorage = () => {
    localStorage.setItem('currentQuote', quoteElement.textContent);
};

// Function to toggle the visibility of the default message
const toggleDefMessageVisibility = () => {
    if (listSavedQuote.getElementsByTagName('li').length === 0){
        defMessage.style.display = 'block'; // Show default message if list is empty
    } else {
        defMessage.style.display = 'none'; // Hide default message if there are saved quotes
    }
};

// Function to add a quote to the list
const addQuoteToList = (quote) => {
    const savedQuote = document.createElement('li');
    savedQuote.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const quoteText = document.createElement('span');
    quoteText.textContent = quote;
    quoteText.classList.add('quote-text');

    const removeButton = document.createElement('div');
    removeButton.innerHTML = '<i class="fas fa-times"></i>';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function() {
        listSavedQuote.removeChild(savedQuote);
        saveQuotesToLocalStorage();
        toggleDefMessageVisibility(); // Update visibility of defMessage after removing quote
        if (listSavedQuote.getElementsByTagName('li').length === 0) {
            savedQuotes.classList.remove('scrollable-list');
        }
    });

    savedQuote.appendChild(quoteText);
    savedQuote.appendChild(removeButton);
    savedQuotes.classList.add('scrollable-list');

    listSavedQuote.appendChild(savedQuote);
};

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        saveCategoryStateToLocalStorage();
    });
});

// Load saved quotes, categories, and current quote from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
    savedQuotes.forEach(quote => addQuoteToList(quote));
    toggleDefMessageVisibility();

    const savedCategories = JSON.parse(localStorage.getItem('categories'));
    if (savedCategories) {
        categoryButtons.forEach(button => {
            if (savedCategories[button.textContent.trim()]) {
                button.classList.add('active');
            }
        });
    }

    const savedCurrentQuote = localStorage.getItem('currentQuote');
    if (savedCurrentQuote) {
        quoteElement.textContent = savedCurrentQuote;
    }
});

// Function to generate a new quote based on selected categories
newQuoteButton.addEventListener('click', () => {

    let selectedQuotes = [];

    categoryButtons.forEach(button => {
        if (button.classList.contains('active')) {
            switch(button.textContent.trim()) {
                case 'Motivation':
                    selectedQuotes = selectedQuotes.concat(Object.values(motivation));
                    break;
                case 'Self Endurance':
                    selectedQuotes = selectedQuotes.concat(Object.values(endurance));
                    break;
                case 'Discipline':
                    selectedQuotes = selectedQuotes.concat(Object.values(selfDiscipline));
                    break;
                case 'Overcoming Adversity':
                    selectedQuotes = selectedQuotes.concat(Object.values(overcomingAdversity));
                    break;
            }
        }
    });

    if (selectedQuotes.length > 0) {
        let randomIndex = Math.floor(Math.random() * selectedQuotes.length);
        quoteElement.textContent = selectedQuotes[randomIndex];
    } else {
        let randomIndex = Math.floor(Math.random() * allQuotes.length);
        quoteElement.textContent = allQuotes[randomIndex];
    }

    saveCurrentQuoteToLocalStorage();
});

// Function to add a saved quote
saveQuoteButton.addEventListener('click', function() {
    const currentQuote = quoteElement.textContent;

    // Check if the quote is already listed
    const existingQuotes = listSavedQuote.getElementsByTagName('li');
    for (let i = 0; i < existingQuotes.length; i++) {
        if (existingQuotes[i].textContent.replace('×', '').trim() === currentQuote) {
            alert('Quote already saved!')
            return; // Quote already exists, do not add it again
        }
    }

    addQuoteToList(currentQuote);
    saveQuotesToLocalStorage(); // Save quotes to localStorage
    toggleDefMessageVisibility(); // Update visibility of defMessage after adding quote
    alert('Quote saved!');
});
