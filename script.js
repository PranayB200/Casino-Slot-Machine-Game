let value1 = document.getElementById('value1')
let value2 = document.getElementById('value2')
let value3 = document.getElementById('value3')
let btnStart = document.getElementsByClassName('btnStart')[0]
let divOutput = document.getElementById('divOutput')

let values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

let lev = undefined;
let getRandomValue = function() {
    if (lev == undefined) lev = 6;
    return values[Math.floor(Math.random() * lev)]
}


let animationId;
function updateAnimation(newSpeed) {
    if(animationId) {
        clearInterval(animationId);
    }

    // Each interval has a unique ID which is returned when we call the setInterval() function.
    animationId = setInterval(() => {
        value1.innerText = getRandomValue();
        value2.innerText = getRandomValue();
        value3.innerText = getRandomValue();
    }, 1000 / newSpeed);
}

inpSpeed.onchange = function(event) {
    // console.log("value changed", event.target.value)

    // NOTE: Here, document.documentElement is "root" var
    document.documentElement.style.setProperty('--speed', event.target.value)
    updateAnimation(event.target.value)
}

inpLevel.onchange = function(ev) {
    lev = ev.target.value;
}

let start_time;

btnStart.onclick = function() {
    console.log("Started")
    start_time = 0;
    let intervalId;
    intervalId = setInterval(() => {
        let value1_cur = value1.innerText
        let value2_cur = value2.innerText
        let value3_cur = value3.innerText

        if (value1_cur == value2_cur && value1_cur == value3_cur) {
            console.log("win\n")
            divOutput.innerText = "YOU WON!\n";
            divOutput.innerText += "YOUR SCORE: ";
            divOutput.innerText += String(lev/start_time);

            value1.innerText = value1_cur;
            value2.innerText = value2_cur;
            value3.innerText = value3_cur;
            // document.documentElement.style.setProperty('--speed', 0)
            // updateAnimation(0)

            document.documentElement.style.setProperty('--slot_spin_move_limit', 0)

            clearInterval(intervalId);
        }
        start_time += 0.5;
    }, 500);
}
