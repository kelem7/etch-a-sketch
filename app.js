//Global Variables
const container = document.querySelector('.container');
const blackBtn = document.querySelector('.blackSketch');
const randomBtn = document.querySelector('.randomSketch');
const sketchBtn = document.querySelector('.sketchySketch');
const pleaseBtn = document.querySelector('.pleasingSketch');
const heading = document.querySelector('.header');
let windowHeight = window.innerHeight;
let headerHeight = heading.offsetHeight; 


//resize container on window resize
window.onresize = function (e) {
    resizeGrid();
}

//Create an initial grid
createDivs(16, 16);

//Create the grid 
function createDivs (rows, cols) {
    resizeGrid ();
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
}

function resizeGrid () {
    let dimensions = (window.innerHeight - headerHeight) * .65;
    container.style.height =  dimensions + 'px'; 
    container.style.width = dimensions + 'px';
}



//call buttons
blackBtn.addEventListener('click', () => {
    changeColor('black');
});

randomBtn.addEventListener('click', () => {
    changeColor('random');
});

sketchBtn.addEventListener('click', () => {
    changeColor('sketch');
});

pleaseBtn.addEventListener('click', () => {
    changeColor('pleasing');
});

//Add media query to change mouseover to click on screens
let x = window.matchMedia("(max-width: 500px)"); 
 //Change Color 
function changeColor (mode) {
    let sketchDiv = document.querySelectorAll('.sketchDiv');

    if (x.matches) {
        switch (mode) {
        case 'black':
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchRandom));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchySketch));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', pleasingSketch));
            sketchDiv.forEach(pixel => pixel.addEventListener('click', sketchBlack));
            blackBtn.classList.add('active');
            randomBtn.classList.remove('active');
            sketchBtn.classList.remove('active');
            pleaseBtn.classList.remove('active');    
            break;
        case 'random':
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchySketch));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchBlack));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', pleasingSketch));
            sketchDiv.forEach(pixel => pixel.addEventListener('click', sketchRandom));
            blackBtn.classList.remove('active');
            randomBtn.classList.add('active');
            sketchBtn.classList.remove('active');
            pleaseBtn.classList.remove('active');
            break;
        case 'sketch':
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchBlack));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchRandom));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', pleasingSketch));
            sketchDiv.forEach(pixel => pixel.addEventListener('click', sketchySketch));
            blackBtn.classList.remove('active');
            randomBtn.classList.remove('active');
            sketchBtn.classList.add('active');
            pleaseBtn.classList.remove('active');
            break;
        case 'pleasing':
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchBlack));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchRandom));
            sketchDiv.forEach(pixel => pixel.removeEventListener('click', sketchySketch));
            sketchDiv.forEach(pixel => pixel.addEventListener('click', pleasingSketch));
            blackBtn.classList.remove('active');
            randomBtn.classList.remove('active');
            sketchBtn.classList.remove('active');
            pleaseBtn.classList.add('active');
        }
    } else {
        //Change Color 
        sketchDiv.forEach(pixel => pixel.addEventListener('click', eraseSketch));
        switch (mode) {
            case 'black':
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchRandom));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchySketch));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', pleasingSketch));
                sketchDiv.forEach(pixel => pixel.addEventListener('mouseover', sketchBlack));
                blackBtn.classList.add('active');
                randomBtn.classList.remove('active');
                sketchBtn.classList.remove('active');
                pleaseBtn.classList.remove('active');
                break;
            case 'random':
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchySketch));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchBlack));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', pleasingSketch));
                sketchDiv.forEach(pixel => pixel.addEventListener('mouseover', sketchRandom));
                blackBtn.classList.remove('active');
                randomBtn.classList.add('active');
                sketchBtn.classList.remove('active');
                pleaseBtn.classList.remove('active');
                break;
            case 'sketch':
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchBlack));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchRandom));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', pleasingSketch));
                sketchDiv.forEach(pixel => pixel.addEventListener('mouseover', sketchySketch));
                blackBtn.classList.remove('active');
                randomBtn.classList.remove('active');
                sketchBtn.classList.add('active');
                pleaseBtn.classList.remove('active');
                break;
            case 'pleasing':
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchBlack));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchRandom));
                sketchDiv.forEach(pixel => pixel.removeEventListener('mouseover', sketchySketch));
                sketchDiv.forEach(pixel => pixel.addEventListener('mouseover', pleasingSketch));
                blackBtn.classList.remove('active');
                randomBtn.classList.remove('active');
                sketchBtn.classList.remove('active');
                pleaseBtn.classList.add('active');
            }
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
    console.log(pleasingColor);
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

