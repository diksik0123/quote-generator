const motivation = {
    "quote1" : "The only easy day was yesterday.",
    "quote2" : "Don't stop when you're tired. Stop when you're done.",
    "quote3" : "If you're not pushing yourself beyond the comfort zone, if you're not demanding more from yourself - expanding and learning as you go - you're choosing a numb existence. You're denying yourself an extraordinary trip."
}

const endurance = {
    "quote1" : "Suffering is the true test of life.",
    "quote2" : "The only way to grow physically and mentally is to be uncomfortable.",
    "quote3" : "It's not that I'm that smart, it's just that I stay with problems longer.",
}

const selfDiscipline = {
    "quote1" : "The worst thing that can happen to a man is to become civilized.",
    "quote2" : "The only way to grow physically and mentally is to be uncomfortable.",
    "quote3" : "It's not that I'm that smart, it's just that I stay with problems longer.",
}

const overcomingAdversity = {
    "quote1" : "No matter what you're going through, there's a light at the end of the tunnel and it may seem hard to get to it but you can do it and just keep working towards it and you'll find the positive side of things.",
    "quote2" : "Most people who doubt you doubt you because they can't do it themselves.",
    "quote3" : "We all have a story to tell; it's up to you how you tell it."
}

const allQuotes = [
    ...Object.values(motivation),
    ...Object.values(endurance),
    ...Object.values(selfDiscipline),
    ...Object.values(overcomingAdversity)
];


const categoryButton = document.querySelectorAll('.category-btn');

//for category buttons
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});



let quote = document.querySelector('#quote');
const btn = document.querySelector('#new-quote');

//random quote generator
btn.addEventListener('click', function(){

    if(categoryButton[0].classList.contains('active')){
        let random = Math.floor(Math.random() * Object.values(motivation).length);
        quote.innerHTML = Object.values(motivation)[random];
    }
    else if(categoryButton[1].classList.contains('active')){
        let random = Math.floor(Math.random() * Object.values(endurance).length);
        quote.innerHTML = Object.values(endurance)[random];
    }
    else if(categoryButton[2].classList.contains('active')){
        let random = Math.floor(Math.random() * Object.values(selfDiscipline).length);
        quote.innerHTML = Object.values(selfDiscipline)[random];
    }
    else if(categoryButton[3].classList.contains('active')){
        let random = Math.floor(Math.random() * Object.values(overcomingAdversity).length);
        quote.innerHTML = Object.values(overcomingAdversity)[random];
    }
    else{
        let random = Math.floor(Math.random() * allQuotes.length);
        quote.innerHTML = allQuotes[random];
    }
});

