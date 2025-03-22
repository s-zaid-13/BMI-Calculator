const heightInput = document.querySelector(".height input");
const weightInput = document.querySelector(".weight input");
const msg = document.querySelector("#msg");
const form = document.querySelector("form");
const selectH = document.querySelector("#H");
const selectW = document.querySelector("#W");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let heightValue = parseFloat(heightInput.value);
    let weightValue = parseFloat(weightInput.value);
    const selectHVal = selectH.value;
    const selectWVal = selectW.value;
    if (heightValue === "" && weightValue === "" || isNaN(heightValue) || isNaN(weightValue)) {
        alert("Enter valid height and weight");
    }
    else if (heightValue === "" || heightValue <= 0) {
        alert("Enter a valid height");
    }
    else if (weightValue === "" || weightValue <= 0) {
        alert("Enter a valid weight");
    }
    else {
        if (selectHVal === "cm") {
            heightValue = heightValue / 100;
        }
        else if (selectHVal === "in") {
            heightValue = heightValue / 39.37;
        }
        if (selectWVal === "g") {
            weightValue = weightValue / 1000;
        }
        else if (selectWVal === "pound") {
            weightValue = weightValue / 2.205;
        }
        //meter
        const result = (weightValue / (heightValue * heightValue)).toFixed(2);
        msg.innerHTML = `Your BMI is <span style="color: blue;">${result}</span>`;
        // msg.style.color = "blue";
    }

    //     heightInput.value = "";
    //     weightInput.value = "";
    // Clear input values
    // const focus = document.querySelectorAll("form input");
    // console.log(focus);
    // focus[1].addEventListener("focus", () => {
    //     heightInput.value = "";
    //     weightInput.value = "";
    //     msg.innerText = " ";
    //     return 0;
    // })
    // heightInput.addEventListener("focus", () => {
    //     heightInput.value = "";
    //     weightInput.value = "";
    //     msg.innerText = " ";
    //     return 0;
    // })
    // weightInput.addEventListener("focus", () => {
    //     heightInput.value = "";
    //     weightInput.value = "";
    //     msg.innerText = " ";
    //     return 0;
    // })
})


