const questions = [
    {
        question: "What's your name?",
        answer: [
            { text: "Hieu", correct: true },
            { text: "Cuong", correct: false },
            { text: "fdsfdsf", correct: false },
            { text: "fdsfsd", correct: false },
        ],
    },
    {
        question: "What's your hobby?",
        answer: [
            { text: "Hieu", correct: true },
            { text: "Cuong", correct: false },
            { text: "fdsfdsf", correct: false },
            { text: "fdsfsd", correct: false },
        ],
    },
    {
        question: "What's your favorite food?",
        answer: [
            { text: "Hieu", correct: true },
            { text: "Cuong", correct: false },
            { text: "fdsfdsf", correct: false },
            { text: "fdsfsd", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const answerBtn = document.getElementById("answer-btn");

let questionIndex = 0;
let score = 0;

function start() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "block";
    startBtn.style.display = "none";
}

function startQuiz() {
    score = 0;
    questionIndex = 0;
    startBtn.innerHTML = "Bắt Đầu";
    nextBtn.innerHTML = "Next"
    resetState();
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtn.appendChild(button);
    });
    
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        console.log("Correct class added");
        score++;
        nextBtn.style.display = "inline-block"
    } else {
        selectedBtn.classList.add("incorrect");
        nextBtn.style.display = "inline-block"
    }
    Array.from(answerBtn.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after selecting
    });
    
}

function next() {
    questionIndex++;
    resetState();
    if (questionIndex < questions.length) {
        showQuestion(); // Display the next question
        
    } else {
        showScore(); // Show the final score
    }
}

nextBtn.addEventListener("click", () => {
    if (questionIndex < questions.length) {
        next();
    } else {
        startQuiz();
        document.getElementById("intro").style.display = "block";
        document.getElementById("game").style.display = "none";
        startBtn.style.display = "inline-block";
        nextBtn.style.display = "none";
}
    }
);


function resetState() {
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
    
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
}



startQuiz();
