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
const defMessage = document.querySelector('.default-msg');


categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
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
});


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
    const savedQuote = document.createElement('li');
    savedQuote.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const quoteText = document.createElement('span');
    quoteText.textContent = currentQuote;
    quoteText.classList.add('quote-text');

    const removeButton = document.createElement('div');
    removeButton.innerHTML = '<i class="fas fa-times"></i>';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function() {
        listSavedQuote.removeChild(savedQuote);
        if (listSavedQuote.getElementsByTagName('li').length === 0) {
            listSavedQuote.appendChild(defMessage);
        }
    });

    savedQuote.appendChild(quoteText);
    savedQuote.appendChild(removeButton);

    listSavedQuote.appendChild(savedQuote);
    defMessage.remove();
});









