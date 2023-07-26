let currentQuestion = 0;
let totalQuestions = 0;
let questionData = [];

async function loadQuestions() {
  try {
    const response = await fetch("sirenesips.json");
    questionData = await response.json();
    totalQuestions = questionData.length;

    loadQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

async function loadQuestion() {
  const mainBox = document.getElementById("mainBox");

  if (totalQuestions > 0) {
    const randomIndex = getRandomIndex(totalQuestions);
    mainBox.textContent = questionData[randomIndex].question;
  } else {
    mainBox.textContent = "No questions found.";
  }
}

function navigate(direction) {
  currentQuestion += direction;

  if (currentQuestion < 0) {
    currentQuestion = totalQuestions - 1;
  } else if (currentQuestion >= totalQuestions) {
    currentQuestion = 0;
  }

  loadQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.addEventListener("click", () => navigate(-1));
  nextButton.addEventListener("click", () => navigate(1));

  loadQuestions();
});
