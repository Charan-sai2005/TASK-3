// Quiz App
const quizData = [
  {
    question: "Which tag is used to include JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which method is used to fetch an API in JS?",
    options: ["fetch()", "get()", "request()", "load()"],
    answer: "fetch()"
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreBoard = document.getElementById("scoreBoard");

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(opt => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.answer) score++;
      nextQuestion();
    };
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
}

function nextQuestion() {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreBoard.textContent = `Your Score: ${score} / ${quizData.length}`;
  }
}

nextBtn.onclick = nextQuestion;
loadQuestion();

// Joke API
async function getJoke() {
  const jokeEl = document.getElementById("joke");
  jokeEl.textContent = "Loading joke...";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    jokeEl.textContent = `${data.setup} — ${data.punchline}`;
  } catch (err) {
    jokeEl.textContent = "Failed to fetch joke.";
  }
}
