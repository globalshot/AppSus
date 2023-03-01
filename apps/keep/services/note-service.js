import { storageService } from "..../services/async-storage.service.js"

const NOTE_KEY = 'noteDB'

_tester()//remove after making normal data base
_createNotes()

export const notesService = {
    query,
    get,
    remove,
    save,
    
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY).then((notes) => {
    //   if (filterBy.txt) {//mmmmm, filter, mmmmm
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     notes = notes.filter((book) => regex.test(book.title))
    //   }
      return notes
    })
  }

function get(noteId) {//get
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {//remove
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {//update or save
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function _tester(){
    const notes = [ 
        { 
          id: 'n101', 
          createdAt: 1112222, 
          type: 'NoteTxt', 
          isPinned: true, 
          style: { 
            backgroundColor: '#00d' 
          }, 
          info: { 
            txt: 'Fullstack Me Baby!' 
          } 
        }, 
        { 
          id: 'n102', 
          type: 'NoteImg', 
          isPinned: false, 
          info: { 
            url: 'http://some-img/me', 
            title: 'Bobi and Me' 
          }, 
          style: { 
            backgroundColor: '#00d' 
          } 
        }, 
        { 
          id: 'n103', 
          type: 'NoteTodos', 
          isPinned: false, 
          info: { 
            title: 'Get my stuff together', 
            todos: [ 
              { txt: 'Driving license', doneAt: null }, 
              { txt: 'Coding power', doneAt: 187111111 } 
            ] 
          } 
        } 
      ]
}

