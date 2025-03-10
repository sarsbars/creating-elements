'use strict';

const section = document.querySelector('section');
const addDiv = document.querySelector('button');
addDiv.addEventListener('click', createDiv);

let count = 0; 
const boxes = []; 

//Creating HTML elements and adding attitbutes to them
// Including custom properties (data-etc.)

function createDiv() {
    const box = document.createElement('div'); 
    box.setAttribute('class', 'blue'); 
    box.setAttribute('data-index', count); 
    box.setAttribute('onclick', 'printMessage(this)'); 

    section.append(box); 
    boxes.push(`I'm box number ${count + 1}`);

    count++; 
}

function printMessage(obj) {
    let boxIndex = obj.dataset.index;
    console.log(boxes[boxIndex]);
}

// There are two ways to create html elements - you can create a string and then
// turn that into html, or you can use createElement 


// this is a more organized way to add an object
/*
function createDiv() {
    const box = document.createElement('div');
    box.setAttribute('class', 'blue');
    box.setAttribute('data-index', count);
    box.setAttribute('onclick', 'logInfo(this)');
    section.append(box);    
    count++;
}

function logInfo(obj) {
    console.log(obj);
}

addDiv.addEventListener('click', () => {
    createDiv();
});
*/

// the custom property is one of the keys for the next assignment 
// the "count" will match the object in the array of objects
/*
function createDivFromString() {
    let div = `<div class="box" data-index="${count}"></div>`; // VERY IMPORTANT FOR ASSIGNMENT 2
    section.innerHTML += div;
}

addDiv.addEventListener('click', () => {
    createDivFromString();
})
*/

//Try putting the divs in an array

