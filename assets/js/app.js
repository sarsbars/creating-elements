'use strict';

const form = document.querySelector('form');
const section = document.querySelector('section');
const errorMessage = document.querySelector('.error-message');
const errorArea = document.querySelector('.error-area');
const noteCount = document.querySelector('.note-count-value');
const addButton = document.querySelector('.inputButton');
const toggleFormButton = document.querySelector('.toggle-form-button');
const inputArea = document.querySelector('.input-area');

toggleFormButton.addEventListener('click', () => {
    inputArea.style.display = 'flex';
    toggleFormButton.style.display = 'none';
});

document.querySelector('.inputTitle').addEventListener('input', clearError);
document.querySelector('.inputContent').addEventListener('input', clearError);

function clearError() {
    errorMessage.textContent = '';
    errorArea.classList.remove('has-error');
}

addButton.addEventListener('click', createTask);

let notes = [];

class Task {
    #title;
    #content;
    #date;
    #colour; 

    constructor(title, content, colour) {
        this.#title = title;
        this.#content = content;
        this.#date = new Date();
        this.#colour = colour; 
    }

    get title() { return this.#title; }
    get content() { return this.#content; }
    get date() { return this.#date; }
    get colour() { return this.#colour; }
}

function createTask() {
    const title = document.querySelector('.inputTitle').value;
    const content = document.querySelector('.inputContent').value;
    const selectedColour = document.querySelector('.colours').value; 

    if (!title || !content || !selectedColour) {
        errorMessage.textContent = 'Please enter a title, content, ' + 
        'and select a colour.';
        errorArea.classList.add('has-error');
        return;
    }

    if (notes.length >= 4) {
        errorMessage.textContent = 'Maximum of 4 notes reached.';
        errorArea.classList.add('has-error');
        return;
    }

    errorMessage.textContent = '';
    errorArea.classList.remove('has-error');

    const task = new Task(title, content, selectedColour); 
    notes.unshift(task);
    listEntries();

    document.querySelector('.inputTitle').value = '';
    document.querySelector('.inputContent').value = '';
    document.querySelector('#colours').selectedIndex = 0; 
}

function listEntries() {
    section.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        const formattedDate = formatDate(note.date);
        noteDiv.classList.add('note', `note-${note.colour}`); 
        noteDiv.innerHTML = `
          <h2>${note.title}</h2>
          <p>${note.content}</p>
          <p class="date-display">${formattedDate}</p>
          <button onclick="deleteNote(${index})">x</button>
        `;

        section.appendChild(noteDiv);
    });
    noteCount.textContent = `Total notes: ${notes.length}`; 
}

function formatDate(date) {
    const dateDisplay = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', dateDisplay);
}

function deleteNote(index) {
    notes.splice(index, 1);
    listEntries();
}