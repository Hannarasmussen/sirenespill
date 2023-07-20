let currentQuestion = 0;
let totalQuestions = 0;

async function loadQuestions() {
  try {
    const response = await fetch("sirenesips.json");
    const data = await response.json();
    totalQuestions = data.length;

    const mainBox = document.getElementById("mainBox");
    mainBox.textContent = data[currentQuestion].question;
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

async function loadQuestion() {
  const response = await fetch("sirenesips.json");
  const data = await response.json();
  const mainBox = document.getElementById("mainBox");
  mainBox.textContent = data[currentQuestion].question;
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
