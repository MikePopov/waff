class Model {
  constructor() {
    this.notes = [
      { title: 'First', text: 'Carrot', color: 'Blue'  },
      { title: 'Second', text: 'Cucumber', color: 'Black'  }
    ]
  }

  addNote(noteTitle, noteText, noteColor){
    const note = {
      title: noteTitle,
      text: noteText,
      color: noteColor
    };
    this.notes.push(note)
  }

}

class View {
  constructor() {
    this.app = this.getElement('#root');
    this.title = this.createElement('h1');
    this.title.textContent = 'Notes';

    this.form = this.createElement('form');

    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add note';
    this.input.name = 'note';

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.notesList = this.createElement('ul', 'notes-list');

    this.form.append(this.input, this.submitButton);
    this.app.append(this.title, this.form, this.notesList);
  }

  createElement(tag, className){
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element
  }

  _notesText() {
    return this.input.value
  }

  _resetInput() {
    this.input.value = ''
  }

  displayNotes(notes) {
    if (notes.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing notes! Add a note?';
      this.notesList.append(p)
    } else {
      notes.forEach(note => {
        const li = this.createElement('li');

        const span = this.createElement('span');
        span.contentEditable = true;
        span.classList.add('editable');
        span.textContent = note.text;

        this.notesList.append(li);
      })
    }
  }


}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onNotesListChanged(this.model.notes);
  }

  onNotesListChanged = notes => {
    this.view.displayNotes(notes)
  }

  handleAddNote = noteText => {
    this.model.addNote(noteText)
  }
}

const app = new Controller(new Model(), new View())