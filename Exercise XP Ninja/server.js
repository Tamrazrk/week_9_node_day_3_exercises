const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: 'quizgame',
    resave: false,
    saveUninitialized: true
}));

// Set view engine to ejs
app.set('view engine', 'ejs');

const questions = [
    {
        text: "What's the capital of France?",
        choices: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        answer: 'Paris'
    },
    {
        text: "Which of these is not a programming language?",
        choices: ['Python', 'Java', 'HTML', 'C++'],
        answer: 'HTML'
    },
    {
        text: "Which planet is known as the Red Planet?",
        choices: ['Mars', 'Earth', 'Venus', 'Jupiter'],
        answer: 'Mars'
    },
    {
        text: "Who wrote 'Romeo and Juliet'?",
        choices: ['William Shakespeare', 'Charles Dickens', 'Leo Tolstoy', 'Mark Twain'],
        answer: 'William Shakespeare'
    },
    {
        text: "What is the largest mammal?",
        choices: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        answer: 'Blue Whale'
    },
    {
        text: "What is the smallest prime number?",
        choices: ['0', '1', '2', '3'],
        answer: '2'
    },
    {
        text: "Which element has the chemical symbol 'Au'?",
        choices: ['Silver', 'Gold', 'Aluminum', 'Argon'],
        answer: 'Gold'
    },
    {
        text: "What is the tallest mountain in the world?",
        choices: ['Mount Everest', 'K2', 'Mount Kilimanjaro', 'Mount McKinley'],
        answer: 'Mount Everest'
    },
    {
        text: "Which country is known as the Land of the Rising Sun?",
        choices: ['South Korea', 'China', 'Japan', 'Thailand'],
        answer: 'Japan'
    },
    {
        text: "In Greek mythology, who turned all that he touched into gold?",
        choices: ['Achilles', 'Hercules', 'Perseus', 'Midas'],
        answer: 'Midas'
    }
];


app.get('/', (req, res) => {
    const questionIndex = req.query.questionIndex ? parseInt(req.query.questionIndex) : 0;

    if (!req.session.score) {
        req.session.score = 0;
    }

    if (questionIndex < questions.length) {
        const question = questions[questionIndex];
        res.render('quiz', { question, questionIndex });
    } else {
        const finalScore = req.session.score;
        req.session.destroy();  // End the session after quiz completion
        res.send(`Quiz completed! Your score is: ${finalScore} out of ${questions.length}`);
    }
});

app.post('/submit-answer', (req, res) => {
    const userAnswer = req.body.answer;
    const questionIndex = parseInt(req.body.questionIndex);

    if (userAnswer === questions[questionIndex].answer) {
        req.session.score++;
    }

    res.redirect(`/?questionIndex=${questionIndex + 1}`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
