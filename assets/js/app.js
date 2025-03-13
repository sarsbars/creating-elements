'use strict';
const form = document.querySelector('form');
const section = document.querySelector('section');
const errorMessage = document.querySelector('.error-message');
const noteCount = document.querySelector('.note-count-value');
const addButton = document.querySelector('.inputButton');

addButton.addEventListener('click', createTask);

let notes = [];

class Task {
    #title;
    #content;
    #date;

    constructor(title, content) {
        this.#title = title;
        this.#content = content;
        this.#date = new Date(); 
    }

    get title() { return this.#title; }
    get content() { return this.#content; }
    get date() { return this.#date; }
}


function createTask() {
    const title = document.querySelector('.inputTitle').value;
    const content = document.querySelector('.inputContent').value;
    
    if (!title || !content) {
        errorMessage.textContent = 'Please enter both a title and content.';
        return;
    }

    if (notes.length >= 4) {
        errorMessage.textContent = 'Maximum of 4 notes reached.';
        return;
    }
    errorMessage.textContent = '';

    const task = new Task(title, content);
    notes.unshift(task);
    listEntries();

    document.querySelector('.inputTitle').value = '';
    document.querySelector('.inputContent').value = '';
}


function listEntries() {
    section.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        const formattedDate = formatDate(note.date);
        noteDiv.classList.add('note');

        noteDiv.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <p>Date: ${formattedDate}</p>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', () => deleteNote(index));
        noteDiv.appendChild(deleteButton);
        section.appendChild(noteDiv); 
    });
    noteCount.textContent = notes.length;
}

function formatDate(date) {
    const dateDisplay = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString(dateDisplay);
}

function deleteNote(index) {
    notes.splice(index, 1);
    listEntries();
}