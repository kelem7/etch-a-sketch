## The Odin Project - Web Development 101 
### Project: Etch-A-Sketch
A project using Javascript to manipulate the DOM to create an Etch-A-Sketch simulator. 

This project is from The Odin Project's [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/etch-a-sketch-project?ref=lnav).

See a **live preview** of the page [here](https://kelem7.github.io/etch-a-sketch/).


## Summary 

* First, I used **document.createElement** and **.appendChild** inside of a **for loop** to create a grid of divs in a container element in the HTML tree. 
* Next I incorporated **.querySelectorAll**, **.forEach**, **event listeners** and **callbacks** to develop a mouseover event that changes the background color of each div.
* I added **CSS variables** to catch numbers entered by the user to set the number of columns and rows, as well as parameters to prevent **NAN** and empty strings.
* Used **Math.random** to create a color changing mouseover option.
* Incorporated the PleaseJS javascript library to offer an alternate mouseover option with a more pleasing color palette. 
* Added an option to increase background color opacity by 0.1 each mouseover until black. 
* Added an event listener to create an erase on click functionality.
* Increased responsiveness by adding **media queries** and a function to scale size of grid based on **window.innerHeight**.
* Added **Javascript media query** so that the game can be played on mobile devices by clicking rather than mouseover. 

