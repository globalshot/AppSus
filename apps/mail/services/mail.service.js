'use strict'

import { utilService } from "../../../services/util.service.js"
import { storageService } from '../../../services/async-storage.service.js'

const MAILS_KEY = 'Mails'
const TRASH_MAILS = 'TrashMail'

const emails = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes and maybe hang out',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
    },
    {
    id: 'e102',
    subject: 'Air Moldova',
    body: 'your booking is successfully. You can see the data of your booking in attached the booking receipt.',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'AirMoldova@momo.com',
    to: 'user@appsus.com'
    },
    {
    id: 'e103',
    subject: 'udemy',
    body: 'sale ends today, get courses from real world experts. starting at 49.90 nis',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'udemy@momo.com',
    to: 'user@appsus.com'
    },
    {
    id: 'e104',
    subject: 'How are you?',
    body: 'call me back please, I have some question to you. Have a nice day.',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'miky@momo.com',
    to: 'user@appsus.com'   
    },
    {
    id: 'e105',
    subject: 'Zomet Sfarim',
    body: 'פעם בשבוע, אנו נעדכן אותך בעשרת רבי המכר המובילים בצומת ספרים.',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'ZometSfarim@momo.com',
    to: 'user@appsus.com'
    },
    {
    id: 'e106',
    subject: 'google',
    body: 'We are writing to let you know about the following updates to the Party',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'google@momo.com',
    to: 'user@appsus.com'
    },
    {
    id: 'e107',
    subject: 'beWell',
    body: 'המגזין לחיים בריאים של איכילוב',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'beWell@momo.com',
    to: 'user@appsus.com'
    }]

const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
       }
       
_createMails()

export const Mailservice = {
    query,
    get,
    remove,
    save,
    createMail,
    getSentMails,
    saveTrashedMail,
    queryTrashedMail,
    removeTrashedMail

}



function query(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(Mails => {
            // console.log('Mails',Mails)
            let onlyUserMails = Mails.filter(mail => mail.from !== 'user@appsus.com')
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                return onlyUserMails.filter(mail => regex.test(mail.body))
            }
            if(filterBy.isStared){
                return onlyUserMails.filter(mail => mail.isStared)
            }
            else{
                return onlyUserMails
            }
        })
}

function queryTrashedMail(filterBy = {}) {
    return storageService.query(TRASH_MAILS)
    .then(Mails => {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            return Mails.filter(mail => regex.test(mail.body))
        }
        if (filterBy.isStared) {
            return Mails.filter(mail => mail.isStared)
        }
        else {
            return Mails
        }
    })
}

function getSentMails(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(Mails => {
            let onlySentMails = Mails.filter(mail => mail.from === 'user@appsus.com')
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                return onlySentMails.filter(mail => regex.test(mail.body))
            }
            if(filterBy.isStared){
                return onlySentMails.filter(mail => mail.isStared)
            }
            else{
                return onlySentMails
            }
        })
}
    
function get(MailId) {
        return storageService.get(MAILS_KEY, MailId)
        .then(_setNextPrevMailId)
}

function remove(MailId) {
    return storageService.remove(MAILS_KEY, MailId)
}

function removeTrashedMail(MailId) {
    return storageService.remove(TRASH_MAILS, MailId)
}

function saveTrashedMail(Mail) {
    Mail.id = null
    if (Mail.id) {
        return storageService.put(MAILS_KEY, Mail)
    } else {
        Mail.removedAt = new Date()
        return storageService.post(MAILS_KEY,Mail)
    }
}

function save(Mail) {
    if (Mail.id) {
        return storageService.put(MAILS_KEY, Mail)
    } else {
        return storageService.post(MAILS_KEY, Mail)
    }
}


function getEmptyMail() {
    return { id: '', title, listPrice }
}

function _createMails() {
    let Mails = utilService.loadFromStorage(MAILS_KEY)
    if (!Mails || !Mails.length) {
        Mails = emails
        utilService.saveToStorage(MAILS_KEY, Mails)
    }
}

function createMail(to, subject, body) {
    const Mail = {
        id: null,
        subject,
        body,
        isRead: false,
        isSelected: false,
        isStared: false,
        isImportant: false,
        sentAt: new Date(),
        removedAt : null,
        from: loggedinUser.email,
        to,
    }
    return save(Mail)
}

function addReview(MailId, review) {
    const newReview = JSON.parse(JSON.stringify(review))
    return storageService.get(MAILS_KEY,MailId)
    .then(Mail => {
        newReview.id = utilService.makeId()
            if (!Mail.newReview) {
                Mail.newReview = [] 
            }
            Mail.newReview.push(newReview)
            
            return Mail
        })
        .then(Mail => save(Mail))
    }
    
    function deleteReview(reviewId,MailId){
        return storageService.get(MAILS_KEY,MailId)
        .then(Mail => {
            const idx = Mail.newReview.findIndex(review => review.id === reviewId)
            Mail.newReview.splice(idx,1)
            return Mail
        }
        )
        .then(Mail => save(Mail))
    }
    
    function _setNextPrevMailId(Mail) {
        return storageService.query(MAILS_KEY).then((Mails) => {
            const MailIdx = Mails.findIndex((currMail) => currMail.id === Mail.id)
            Mail.nextMailId = Mails[MailIdx + 1] ? Mails[MailIdx + 1].id : Mails[0].id
            Mail.prevMailId = Mails[MailIdx - 1]
            ? Mails[MailIdx - 1].id
            : Mails[Mails.length - 1].id
            return Mail
        })
    }