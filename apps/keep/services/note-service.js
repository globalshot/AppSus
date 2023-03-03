import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'

// _tester()//remove after making normal data base
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    forcePush,
    
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY).then((notes) => {
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

function forcePush(note) {//still tested
    let newNote = JSON.parse(JSON.stringify(note))
    newNote.id = utilService.makeId(6)
    return storageService.query(NOTE_KEY)
      .then(notes => {
        let idx = notes.findIndex(item => item.id === note.id)
        notes.splice(idx+1, 0, newNote)
        storageService.fullSave(NOTE_KEY, notes)
      })
    
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
      notes = test()
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function test(){
    return [ 
        { 
          id: 'n101', 
          createdAt: 1112222, 
          type: 'NoteTxt', 
          isPinned: true, 
          style: { 
            backgroundColor: 'var(--clr3)' 
          }, 
          info: { 
            txt: 'Welcome to keep' 
          } 
        }, 
        // { 
        //   id: 'n102', 
        //   type: 'NoteImg', 
        //   isPinned: false, 
        //   info: { 
        //     url: 'http://some-img/me', 
        //     title: 'Bobi and Me' 
        //   }, 
        //   style: { 
        //     backgroundColor: '#00d' 
        //   } 
        // }, 
        { 
          id: 'n103', 
          type: 'NoteTodos', 
          isPinned: true, 
          style: { 
            backgroundColor: 'var(--clr3)' 
          }, 
          info: { 
            title: 'Steps to make notes', 
            todo: [ 
              { txt: 'Think of note', doneAt: null }, 
              // { txt: 'Coding power', doneAt: 187111111 } 
              { txt: 'Click "Make new note"', doneAt: null },
              { txt: 'Choose the type of the note', doneAt: null },
              { txt: 'Follow the text inside the box', doneAt: null },
            ] 
          } 
        } 
      ]
      return notes
}

