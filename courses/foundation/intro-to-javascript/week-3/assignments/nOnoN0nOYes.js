const notes = [];

function saveNote(content, id) {
  // write some code here
  notes.push({content, id});
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

console.log(notes); // [{content: 'Pick up groceries', id: 1}, {content: 'Do laundry', id: 2}]

function getNote(id) {
  // your code here
  if (typeof id !== "number") {
    console.log("Error: Invalid ID");
    return;
  }

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return notes[i];
    }
  }

  console.log("Error: Note with id " + id + " not found");
}

const firstNote = getNote(1);
console.log(firstNote); // {content: 'Pick up groceries', id: 1}
const secondNote = getNote(2);
console.log(secondNote);

function logOutNotesFormatted() {
  // your code here

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log("The note with id: " + note.id + " has the following note text: " + note.content)
  }
}

logOutNotesFormatted(); // should log out the text below

// The note with id: 1, has the following note text: Pick up groceries
// The note with id: 2, has the following note text: Do laundry