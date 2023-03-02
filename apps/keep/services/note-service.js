import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'

// _tester()//remove after making normal data base
// _createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    test,//to remove after i make normal
    
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

// function _createNotes() {
//     let notes = utilService.loadFromStorage(NOTE_KEY)
//     if (!notes || !notes.length) {
//     utilService.saveToStorage(NOTE_KEY, notes)
//   }
// }

function test(){
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
      return notes
}

