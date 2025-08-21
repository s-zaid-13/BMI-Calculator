const heightInput = document.querySelector("#h");
const weightInput = document.querySelector("#w");
const msg = document.querySelector("#msg");
const form = document.querySelector("form");
const selectH = document.querySelector("#H");
const selectW = document.querySelector("#W");
const bmiFill = document.querySelector("#bmiFill");
const bmiHistoryList = document.querySelector("#bmiHistoryList");

// Get BMI category
function getBMICategory(bmi) {
    if (bmi < 18.6) return { text: "Underweight", color: "blue", advice: "You are underweight. Consider a nutritious diet." };
    if (bmi < 24.9) return { text: "Normal weight", color: "green", advice: "Great! Keep maintaining your healthy lifestyle." };
    if (bmi < 29.9) return { text: "Overweight", color: "orange", advice: "You are overweight. Consider regular exercise." };
    return { text: "Obesity", color: "red", advice: "Obese. Consult a doctor for a suitable plan." };
}

// Store BMI history
function storeHistory(bmiData) {
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    history.unshift(bmiData);
    if (history.length > 5) history.pop();
    localStorage.setItem("bmiHistory", JSON.stringify(history));
    displayHistory();
}

// Display history
function displayHistory() {
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    bmiHistoryList.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.date}: BMI ${item.bmi} (${item.category})`;
        bmiHistoryList.appendChild(li);
    });
}

// Clear result on focus
[heightInput, weightInput].forEach(input => {
    input.addEventListener("focus", () => {
        msg.innerHTML = "";
        bmiFill.style.height = "0%";
    });
});

// On form submit
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let heightValue = parseFloat(heightInput.value);
    let weightValue = parseFloat(weightInput.value);

    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
        alert("Enter valid height and weight");
        return;
    }

    // Convert units
    if (selectH.value === "cm") heightValue /= 100;
    else if (selectH.value === "in") heightValue /= 39.37;

    if (selectW.value === "g") weightValue /= 1000;
    else if (selectW.value === "pound") weightValue /= 2.205;

    const bmi = (weightValue / (heightValue * heightValue)).toFixed(2);
    const category = getBMICategory(bmi);

    // Show result
    msg.innerHTML = `Your BMI is <span style="color:${category.color}; font-weight:bold;">${bmi}</span> (${category.text})<br><small>${category.advice}</small>`;

    // Animate BMI circle (height proportional to BMI, capped at 100%)
    let fillPercent = Math.min((bmi / 40) * 100, 100);
    bmiFill.style.height = `${fillPercent}%`;
    bmiFill.style.backgroundColor = category.color;

    // Store history
    storeHistory({ bmi, category: category.text, date: new Date().toLocaleDateString() });

    // Clear inputs
    heightInput.value = "";
    weightInput.value = "";
});

// Display history on page load
displayHistory();
