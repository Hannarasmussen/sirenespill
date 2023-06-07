let currentBox = 1;
let totalBoxes;
let previousBox = null;

async function loadQuestions() {
  const response = await fetch("questions.json");
  const data = await response.json();

  totalBoxes = data.length;

  const boxContainer = document.getElementById("boxContainer");

  // Create the start screen box
  const startScreenBox = document.createElement("div");
  startScreenBox.setAttribute("class", "box");
  startScreenBox.setAttribute("id", "box1");
  startScreenBox.textContent = "Trykk Next for å starte";
  boxContainer.appendChild(startScreenBox);

  for (let i = 2; i <= totalBoxes; i++) {
    const box = document.createElement("div");
    box.setAttribute("class", "box");
    box.setAttribute("id", `box${i}`);
    boxContainer.appendChild(box);
  }

  const startScreenBox = document.getElementById("box1");
  startScreenBox.classList.add("visible");

  loadQuestion(currentBox); // Load currentBox initially
}

async function loadQuestion(boxId) {
  const response = await fetch("questions.json");
  const data = await response.json();
  const question = data[boxId - 1].question;
  const box = document.getElementById(`box${boxId}`);
  box.textContent = question;
}

async function navigate(direction) {
  const currentBoxElement = document.getElementById(`box${currentBox}`);
  currentBoxElement.classList.remove("visible");

  previousBox = currentBoxElement;
  currentBox += direction;

  if (currentBox < 1) {
    currentBox = totalBoxes;
  } else if (currentBox > totalBoxes) {
    currentBox = 1;
  }

  const nextBoxElement = document.getElementById(`box${currentBox}`);
  nextBoxElement.classList.add("visible");

  await loadQuestion(currentBox);

  if (previousBox && previousBox !== startScreenBox) {
    previousBox.remove();
    previousBox = null;
  }
}

loadQuestions();
