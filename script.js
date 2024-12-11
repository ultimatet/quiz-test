const questions = [
    {
        question: "Tại sao m lại béo?",
        answer: [
            { text: "Tại uống trs full toppping và đường nhiều", correct: true },
            { text: "Tại sinh ra đã thế ròi", correct: false },
            { text: "Tại tao bảo m thế", correct: false },
            { text: "M k hề béo", correct: false },
        ],
    },
    {
        question: "Tên ở nhà mọi ng hay gọi t nhất là gì?",
        answer: [
            { text: "Hiếu", correct: true },
            { text: "Mỡ", correct: false },
            { text: "Bum", correct: false },
            { text: "Mọi", correct: false },
        ],
    },
    {
        question: "Vì lý do gì mà tao lại làm cái này?",
        answer: [
            { text: "Vì t rảnh", correct: false },
            { text: "Vì t muốn chọc m", correct: false },
            { text: "Vì t cần luyện skill", correct: true },
            { text: "Đêm t mơ các cụ bảo làm", correct: false },
        ],
    },
];

//TODO: question with long answer, not just multiple choice

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
    questionElement.innerHTML = `Chúc mừng bạn đã làm đúng ${score} trên ${questions.length} câu!`;
    nextBtn.innerHTML = "Play Again";
}



startQuiz();
