`use strict`;

const allLifts = document.querySelector(`.all-lifts`);
const upDownBtns  = document.querySelector(`.upDownBtns `);

let floors = prompt("How many floors in your Building");12
const noOfLifts = floors/2;
let floorsArr = [];

let l = 0;
// --------------- Number Of Lifts ---------------
function insertNewBlock() {
    const html = 
    `<div class="div">
        <div class="lift-block flex" id="block-${l}">
            <div class="lift" id="lift-${l}">
                <p class="lift-num">1</p>
            </div>
        </div>
        <label class="switch">
            <input type="checkbox" name="cb" id="check-${l}" onclick="up(event)">
            <span class="slider round" id="span-${l}"></span>
        </label>
    </div>`

    allLifts.insertAdjacentHTML("beforeend", html);
}
for(let i=0; i<noOfLifts; i++) {
    insertNewBlock();
    const liftBlock = document.querySelector(`#block-${l}`).style.height = `${floors*100}px`;
    l++;
}


// --------------- Number Of Lifts ---------------
function up(event) {
    console.log(event.target.id);
    const a = event.target.id.split('-')[1];
    document.querySelector(`#check-${a}`).addEventListener('change', function() {
        if(document.querySelector(`#check-${a}`).checked) {
            document.querySelector(`#lift-${a}`).classList.add("inMaintenance");
        }
        else {
            console.log("else");
            document.querySelector(`#lift-${a}`).classList.remove("inMaintenance");
            document.querySelector(`#lift-${a}`).classList.add("lift-tempo");
        }
    });
}

// --------------- Number Of Floors ---------------
for(let i = 1; i<=floors; i++) {
    if(i===1) {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud"><img src="images/caret-arrow-up.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
    else if(i===floors) {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud"><img src="images/down-filled-triangular-arrow.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
    else {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud"><img src="images/caret-arrow-up.png" alt=""></p>
            <p class="abc ud"><img src="images/down-filled-triangular-arrow.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
}
floorsArr.forEach(i => upDownBtns.insertAdjacentHTML("afterBegin", i));