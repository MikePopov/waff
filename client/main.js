class Model {
  constructor() {
    this.notes = [
      { title: 'First', text: 'Carrot' },
      { title: 'Second', text: 'Cucumber' }
    ]
  }

  addNote(noteTitle, noteText){
    const note = {
      title: noteTitle,
      text: noteText,
    };
    this.notes.push(note)
  }

  bindNotesListChanged(callback) {
    this.onNotesListChanged = callback
  }

}

class View {
  constructor() {
    this.app = this.getElement('#root');
    this.title = this.createElement('h1');
    this.title.textContent = 'Notes';

    this.form = this.createElement('form');

    this.noteTitle = this.createElement('input');
    this.noteTitle.type = 'text';
    this.noteTitle.placeholder = 'Title';
    this.noteTitle.name = 'title';

    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add note';
    this.input.name = 'note';

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.notesList = this.createElement('ul', 'notes-list');

    this.form.append(this.input, this.noteTitle, this.submitButton);
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

  _notesTitle() {
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

  bindAddNote(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault()

      if (this._notesText) {
        handler(this._notesText)
        this._resetInput()
      }
    })
  }

}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onNotesListChanged(this.model.notes);
    this.view.bindAddNote(this.handleAddNote);
    this.model.bindNotesListChanged(this.onNotesListChanged())
  }

  onNotesListChanged = notes => {
    this.view.displayNotes(notes)
  }

  handleAddNote = (noteText, noteTitle) => {
    this.model.addNote(noteText, noteTitle)
  }


}

const app = new Controller(new Model(), new View())