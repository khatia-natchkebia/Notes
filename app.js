const notes = {};
notes.currentNote = {};
notes.currentNote.title = document.getElementById('title');
notes.currentNote.text = document.getElementById('text');
notes.currentNote.id = -1;
notes.notesList = document.getElementById('notesUl');
notes.newBtn = document.getElementById('newNote');
notes.deleteBtn = document.getElementById('confirmDelete');
const notesData = [];
let count = 0;
let isNewNBtnClicked = true;

const addingCrusialElements = (newLi) => {
    newLi.classList.add('list-group-item', 'list-group-item-action', 'notesLi');
    newLi.id = count;
    notes.notesList.prepend(newLi);
}

const newHtmlNoteDiv = (title, text) => {
    let newLi = document.createElement('li');
    if (title) {
        newLi.innerText = title;
    } else if (text) {
        let resultSlice = text.slice(0, 15);
        newLi.innerText = `${resultSlice}...`;
    }
    addingCrusialElements(newLi)
}

const saveNewNote = (title, text) => {
    if (title || text) {
        notesData.push({ title: title, note: text });
        newHtmlNoteDiv(title, text);
        notes.currentNote.id = count;
        count++;
    }
}

const showClickedNote = (id) => {
    notes.currentNote.title.value = notesData[id].title;
    notes.currentNote.text.value = notesData[id].note;
    notes.currentNote.id = id;
}


const newNote = () => {
    console.log(notes.currentNote.title.value);
    saveNewNote(notes.currentNote.title.value, notes.currentNote.text.value);
    console.log(notes.currentNote.title.value);
    isNewNBtnClicked = false;
}

const clearInputs = () => {
    notes.currentNote.title.value = "";
    notes.currentNote.text.value = "";
}

const deleteNote = () => {
    const elementToRemove = document.getElementById(notes.currentNote.id);
    if (elementToRemove) {
        elementToRemove.remove();
    }
    notesData[notes.currentNote.id] = null;
    clearInputs();
}

const updateExistingNote = (title, text) => {
    notesData[notes.currentNote.id].title = title;
    notesData[notes.currentNote.id].note = text;
    let elementTitle = document.getElementById(notes.currentNote.id);
    if (title) {
        elementTitle.innerText = title;
    } else if (text) {
        let resultSlice = text.slice(0, 15);
        elementTitle.innerText = `${resultSlice}...`;
    }
}

const checkForUpdate = (title, text) => {
    if (notesData[notes.currentNote.id] === null) {
        saveNewNote(notes.currentNote.title.value, notes.currentNote.text.value);
    } else if (title === '' && text === '') {
        deleteNote();
    } else {
        updateExistingNote(title, text);
    }
}

const saveOrCheckForUpdate = () => {
    if (isNewNBtnClicked) {
        saveNewNote(notes.currentNote.title.value, notes.currentNote.text.value);
    } else {
        checkForUpdate(notes.currentNote.title.value, notes.currentNote.text.value);
    }
}

notes.notesList.addEventListener('click', function (event) {
    if (event.target.classList.contains('notesLi')) {
        let notesLiId = event.target.id;
        if (notes.currentNote.title.value || notes.currentNote.text.value) {
            saveOrCheckForUpdate();
        }
        showClickedNote(notesLiId);
        isNewNBtnClicked = false;
    }
});

notes.newBtn.addEventListener('click', () => {
    saveOrCheckForUpdate();
    clearInputs();
    isNewNBtnClicked = true;
});

notes.deleteBtn.addEventListener('click', deleteNote);

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        saveOrCheckForUpdate();
        isNewNBtnClicked = false;
    }
});

document.getElementById('deleteNote').addEventListener('click', function () {
    if (!notes.currentNote.text || !notes.currentNote.title) {
        return;
    }
});
