//Global Variables
const container = document.querySelector('.container');
const blackBtn = document.querySelector('.blackSketch');
const randomBtn = document.querySelector('.randomSketch');
const sketchBtn = document.querySelector('.sketchySketch');
const pleaseBtn = document.querySelector('.pleasingSketch');
const heading = document.querySelector('.header');
let blackToggled = true;
let randomToggled = false;
let sketchyToggled = false;
let pleaseToggled = false;
let windowHeight = window.innerHeight;
let headerHeight = heading.offsetHeight; 
let color = '#000';
let mouseAction = 'mouseover';
//Add media query to change mouseover to click on screens
let x = window.matchMedia("(max-width: 500px)"); 


//resize container on window resize
window.onresize = function (e) {
    resizeGrid();
    changeMouseAction(x);
}

//Create an initial grid
createDivs(16, 16);

//Create the grid 
function createDivs (rows, cols) {
    resizeGrid ();
    changeMouseAction(x);
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    if ((rows <= 100 && rows >= 0) && (cols <= 100 && cols >= 0) && !(isNaN(rows) && !isNaN(cols)) && (rows != "" && cols != "")) {
        for (let i = 1; i <= (rows * cols); i++) {
            const div = document.createElement('div');
            div.classList.add('sketchDiv');
            container.appendChild(div);
            div.style.cssText = 'margin: 0; padding: 0;';
        }
    } else {
        alert('Please insert a number between 1 and 100 in each box.');
        createDivs(16, 16);
    }
    whichMode();
}

function resizeGrid () {
    let dimensions = (window.innerHeight - headerHeight) * .65;
    container.style.height =  dimensions + 'px'; 
    container.style.width = dimensions + 'px';
}



//call buttons
blackBtn.addEventListener('click', blackColor);
randomBtn.addEventListener('click', randomColor);
sketchBtn.addEventListener('click', sketchyColor);
pleaseBtn.addEventListener('click', pleaseColor);

function blackColor () {
    selectMode('black');
    changeColor('black');
}

function randomColor () {
    selectMode('random');
    changeColor('random');
}

function sketchyColor () {
    selectMode('sketch');
    changeColor('sketch');
}

function pleaseColor () {
    selectMode('pleasing');
    changeColor('pleasing');
}

//function to change mouseAction for smaller screens
function changeMouseAction (x) {
    if (x.matches) {
        mouseAction = 'click';
    } else {
        mouseAction = 'mouseover';
    }
}

//Change pixels to black on mouseover
function sketchBlack (e) {
    e.target.style.opacity = '';
    e.target.style.backgroundColor = '#000';
}

//Color changing function 
function sketchRandom (e) {
    e.target.style.opacity = '';
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = '#' + randomColor;
}

//Function to add 10% more black each mouseover
function sketchySketch (e) {
    let opacity = Number(e.target.style.opacity);
    e.target.style.opacity = opacity += 0.1;
    e.target.style.backgroundColor = '#000';
    e.target.style.transition = 'background-color 0.25s';
}

//Function to add PleaseJS functionality 
function pleasingSketch (e) {
    let pleasingColor = Please.make_color({
        base_color: 'MediumSlateBlue',
        colors_returned: 100,
	    format: 'rgb-string',
    });
    for (let i = 0; i < pleasingColor.length; i++) {
        e.target.style.backgroundColor =  pleasingColor[i];
    }
}

//function to erase on click
function eraseSketch (e) {
    e.target.style.backgroundColor = '#fff';
}


//function to reset the grid
function resetGrid () {
    container.innerHTML = "";
    const sketch_div = document.querySelectorAll('.sketchdiv');
    sketch_div.forEach((sketch_div) => sketch_div.style.backgroundColor = '#FFF');
    let newRowVal = document.querySelector('.newRowVal').value;
    let newColVal = document.querySelector('.newColVal').value;
    createDivs(newRowVal, newColVal);
}

 //Change Color 
 function changeColor (mode) {
    let sketchDiv = document.querySelectorAll('.sketchDiv');
        sketchDiv.forEach(pixel => pixel.addEventListener('click', eraseSketch));
        switch (mode) {
        case 'black':
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchRandom));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchySketch));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, pleasingSketch));
            sketchDiv.forEach(pixel => pixel.addEventListener(mouseAction, sketchBlack));  
            break;
        case 'random':
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchySketch));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchBlack));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, pleasingSketch));
            sketchDiv.forEach(pixel => pixel.addEventListener(mouseAction, sketchRandom));
            break;
        case 'sketch':
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchBlack));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchRandom));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, pleasingSketch));
            sketchDiv.forEach(pixel => pixel.addEventListener(mouseAction, sketchySketch));
            break;
        case 'pleasing':
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchBlack));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchRandom));
            sketchDiv.forEach(pixel => pixel.removeEventListener(mouseAction, sketchySketch));
            sketchDiv.forEach(pixel => pixel.addEventListener(mouseAction, pleasingSketch));
        }
    }

//
function selectMode (mode) {
        switch (mode) {
        case 'black':
            blackToggled = true;
            randomToggled = false;
            sketchyToggled = false;
            pleaseToggled = false;
            blackBtn.classList.add('active');
            randomBtn.classList.remove('active');
            sketchBtn.classList.remove('active');
            pleaseBtn.classList.remove('active');    
            break;
        case 'random':
            blackToggled = false;
            randomToggled = true;
            sketchyToggled = false;
            pleaseToggled = false;
            blackBtn.classList.remove('active');
            randomBtn.classList.add('active');
            sketchBtn.classList.remove('active');
            pleaseBtn.classList.remove('active');
            break;
        case 'sketch':
            blackToggled = false;
            randomToggled = false;
            sketchyToggled = true;
            pleaseToggled = false;
            blackBtn.classList.remove('active');
            randomBtn.classList.remove('active');
            sketchBtn.classList.add('active');
            pleaseBtn.classList.remove('active');
            break;
        case 'pleasing':
            blackToggled = false;
            randomToggled = false;
            sketchyToggled = false;
            pleaseToggled = true;
            blackBtn.classList.remove('active');
            randomBtn.classList.remove('active');
            sketchBtn.classList.remove('active');
            pleaseBtn.classList.add('active');
        }
}

//find current mode 
function whichMode () {
    if (blackToggled === true) {
        blackColor();
    } else if (randomToggled === true) {
        randomColor();
    } else if (sketchyToggled === true) {
        sketchyColor();
    } else if (pleaseToggled === true) {
        pleasingColor();
    }
}