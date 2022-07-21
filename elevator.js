`use strict`;

const allLifts = document.querySelector(`.all-lifts`);
const upDownBtns  = document.querySelector(`.upDownBtns `);

// let floors = prompt("How many floors in your Building");
let floors = 10;
const noOfLifts = 3;
let floorsArr = [];
let workingLifts;
let numberOfWorkingLifts;
let intoMaintenance = [];
let isFirstFloor = false;
let l = 1;

// --------------- Number Of Lifts ---------------
function insertNewBlock() {
    const html =`
    <div class="div">
        <div class="lift-block flex" id="block-${l}">
            <div class="numbers flex" id="numbers-${l}">
            </div>
            <div class="lift" id="lift-${l}">
                <p class="lift-pos hidden" id="lift-pos-${l}">1</p>
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
    const numbers = document.querySelector(`#numbers-${l}`);
    const liftBlock = document.querySelector(`#block-${l}`).style.height = `${floors*100}px`;
    for(let a=floors; a>=1; a--) {
        const p = document.createElement("p");
        numbers.appendChild(p);
        p.textContent = a;
    }
    l++;
}

// --------------- Toggle Buttons ---------------
function up(event) {
    const a = event.target.id.split('-')[1];
    const cBox = document.querySelector(`#check-${a}`);
    const liftBox = document.querySelector(`#lift-${a}`);
    if(cBox.checked) {
        liftBox.style.bottom = "0px";
        liftBox.style.border = "1px solid red";

        intoMaintenance.push(liftBox.id);

        liftObj[a-1].liftPosition = "1";
        liftObj[a-1].isMaintenance = true;
    }
    else if(!cBox.checked) {
        liftBox.classList.add("lift-tempo");
        liftBox.style.border = "none";

        const popElement = intoMaintenance.indexOf(document.querySelector(`#lift-${a}`).id);
        intoMaintenance.splice(popElement, 1);
        liftObj[a-1].isMaintenance = false;
         
    }
}

// --------------- Number Of Floors ---------------
for(let i = 1; i<=floors; i++) {
    if(i===1) {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud" id="up-${i}" onclick="abc(this.id)"><img src="caret-arrow-up.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
    else if(i==floors) {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud" id="down-${i}" onclick="abc(this.id)"><img src="down-filled-triangular-arrow.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
    else {
        floorsArr.push(`
        <div class="btns flex">
            <p class="abc">${i}</p>
            <p class="abc ud" onclick="abc(this.id)" id="up-${i}"><img src="caret-arrow-up.png"alt="" id="up-${i}"></p>

            <p class="abc ud" onclick="abc(this.id)" id="down-${i}"><img src="down-filled-triangular-arrow.png" alt=""></p>
        </div>
        `)
        console.log({i});
    }
}
floorsArr.forEach(i => upDownBtns.insertAdjacentHTML("afterBegin", i));


// --------------- Move Lift ---------------
const lifts = document.querySelectorAll(`.lift`);
let liftObj = [];

lifts.forEach(i => {
    const ab = {
        liftNumber: i.id.split('-')[1],
        liftId: i.id,
        liftPosition: i.querySelector(`.lift-pos`).textContent,
        isMaintenance: false,
    }
    liftObj.push(ab);
})


function abc(a) {
    const requestedFloor = a.split('-')[1];
    const height = (a.split('-')[1]-1)*100;
    checkFirstFloor();
    whichLiftToMove(a,height,requestedFloor);
}
function checkFirstFloor() {
    for(let i of liftObj) {
        if(i.liftPosition === '1') {
            isFirstFloor = true;
        }else {
            isFirstFloor = false;
            break;
        }
    }
}
function whichLiftToMove(a,height,requestedFloor) {
    let FirstPriorityLift = 2;
    workingLifts = liftObj.filter(i => i.isMaintenance == false);
    numberOfWorkingLifts = workingLifts.length;
    const randomLift = Math.floor(Math.random()*numberOfWorkingLifts)+1;

    if(!liftObj[1].isMaintenance && isFirstFloor) {
        document.querySelector(`#lift-${2}`).style.bottom = `${height}px`;
        liftObj[1].liftPosition = requestedFloor;
        document.querySelector(`#lift-pos-${2}`).textContent = requestedFloor;
        isFirstFloor = false;
    }
    else if(liftObj[1].isMaintenance && isFirstFloor) {
        document.querySelector(`#lift-${workingLifts[randomLift-1].liftNumber}`).style.bottom = `${height}px`;
        workingLifts[randomLift-1].liftPosition = requestedFloor;
        document.querySelector(`#lift-pos-${workingLifts[randomLift-1].liftNumber}`).textContent = requestedFloor;
    }
    else if(numberOfWorkingLifts === 1) {
            const v = workingLifts[0].liftNumber;
            document.querySelector(`#lift-${v}`).style.bottom = `${height}px`;
            workingLifts[0].liftPosition = requestedFloor;
            document.querySelector(`#lift-pos-${v}`).textContent = requestedFloor;
    }
    else {
        // let movableLift = workingLifts.reduce(function (prev, curr) {
        //     return Math.abs(curr.liftPosition - requestedFloor) < Math.abs(prev.liftPosition - requestedFloor) ? curr : prev;
        // });

        let rlif = [];
        let distance = liftObj.map( lif => Math.abs(requestedFloor - lif.liftPosition));
        console.log(distance);
        let minDistance = Math.min(...distance);
        console.log(minDistance);
        distance.forEach((ds, i, arr)=> {
            if(minDistance == ds){
                rlif.push(i);
            }
        });
        console.log(rlif);
        let item = rlif[Math.floor(Math.random()*rlif.length)];
        console.log(item);

        // let whichLiftToMove = movableLift.liftNumber;
        document.querySelector(`#lift-${item+1}`).style.bottom = `${height}px`;
        let sr = workingLifts.findIndex(i => {
            return i.liftId === `lift-${item+1}`;
        })
        workingLifts[sr].liftPosition = requestedFloor;
        document.querySelector(`#lift-pos-${item+1}`).textContent = requestedFloor;
    }
}