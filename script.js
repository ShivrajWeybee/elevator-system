`use strict`;

const allLifts = document.querySelector(`.all-lifts`);
const upDownBtns  = document.querySelector(`.upDownBtns `);

// let floors = prompt("How many floors in your Building");
let floors = 7;
const noOfLifts = floors/2;
let floorsArr = [];

let intoMaintenance = [];

let isFirstFloor = false;

let l = 1;

// --------------- Number Of Lifts ---------------
function insertNewBlock() {
    const html =`
    <div class="div">
        <div class="lift-block flex" id="block-${l}">
            <div class="lift" id="lift-${l}">
                <p class="lift-pos" id="lift-pos-${l}">1</p>
            </div>
        </div>
        <label class="switch">
            <input type="checkbox" name="cb" id="check-${l}" onclick="up(event)">
            <span class="slider round" id="span-${l}"></span>
        </label>
    </div>
    `

    allLifts.insertAdjacentHTML("beforeend", html);
}
for(let i=0; i<noOfLifts; i++) {
    insertNewBlock();
    const liftBlock = document.querySelector(`#block-${l}`).style.height = `${floors*100}px`;
    l++;
}


// --------------- Number Of Lifts ---------------
function up(event) {
    console.log("function UP()");
    const a = event.target.id.split('-')[1];
    const cBox = document.querySelector(`#check-${a}`);
    const liftBox = document.querySelector(`#lift-${a}`);
    if(cBox.checked) {
        console.log({a});
        liftBox.style.bottom = "0px";
        liftBox.style.border = "1px solid red";
        document.querySelector(`#lift-pos-${a}`).textContent = "1";

        intoMaintenance.push(liftBox.id);

        liftObj[a-1].isMaintenance = true;
        // console.log(`lift${a} = ${liftObj[a-1].isMaintenance}`);

    }
    else if(!cBox.checked) {
        console.log({a});
        liftBox.classList.add("lift-tempo");
        liftBox.style.border = "none";

        const popElement = intoMaintenance.indexOf(document.querySelector(`#lift-${a}`).id);

        intoMaintenance.splice(popElement, 1);

        liftObj[a-1].isMaintenance = false;
        // console.log(`lift${a} = ${liftObj[a-1].isMaintenance}`);
         
    }
}

// --------------- Number Of Floors ---------------
for(let i = 1; i<=floors; i++) {
    if(i===1) {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud" id="up-${i}" onclick="abc(this.id)"><img src="images/caret-arrow-up.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
    else if(i===floors) {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud" id="down-${i}" onclick="abc(this.id)"><img src="images/down-filled-triangular-arrow.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
    else {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud" onclick="abc(this.id)" id="up-${i}"><img src="images/caret-arrow-up.png"alt="" id="up-${i}"></p>

            <p class="abc ud" onclick="abc(this.id)" id="down-${i}"><img src="images/down-filled-triangular-arrow.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
}
floorsArr.forEach(i => upDownBtns.insertAdjacentHTML("afterBegin", i));

const lifts = document.querySelectorAll(`.lift`);
let liftObj = [];
lifts.forEach(i => {
    const ab = {
        liftNumber : i.id,
        liftPosition: i.querySelector(`.lift-pos`).textContent,
        isMaintenance: false,
    }
    liftObj.push(ab);
})


function abc(a) {
    const requestedFloor = a.split('-')[1];
    const height = (a.split('-')[1]-1)*100;
    checkFirstFloor()
    checkAndMoveLift(a,height,requestedFloor);
}
function checkFirstFloor() {
    for(let i of liftObj) {
        i.liftPosition === '1' ? isFirstFloor = true : isFirstFloor = false;
    }
}
function checkAndMoveLift(a,height,requestedFloor) {
    if(!liftObj[1].isMaintenance && isFirstFloor) {
        document.querySelector(`#lift-2`).style.bottom = `${height}px`;
        liftObj[1].liftPosition = requestedFloor;
        document.querySelector(`#lift-pos-2`).textContent = requestedFloor;
    }
    else {
        for(let i=0; i<liftObj.length; i++){
            for(let a in liftObj[i]) {
                // if(liftObj[i][liftPosition]) {

                // }
                // var counts = [4, 9, 15, 6, 2],
                // goal = 5;
                // var closest = counts.reduce(function(prev, curr) {
                //     return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
                // });
                // console.log(closest);
            }
        }
        console.log(Object.values(liftObj));
        // for(let i of Object.entries(liftObj)) {
        //     console.log(i.isMaintenance);
        // }
    }
}