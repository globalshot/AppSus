import { utilSevice } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'

let gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createEmails()


export const mailService = {
 query, 
 get,
 remove,
 save,
 getEmptyEmailToSend,
 getLoggedinUser,
 getNextEmailId,
 getPrevEmailId   
}

function query(criteria = { status: 'inbox'}) {
    return storageService.query(EMAIL_KEY)

       .then(emails => {
        if (criteria.status) {
            if (criteria.status === 'inbox') emails = emails.filter(email => email.to === gLoggedinUser.email && email.removedAt === null )
            if (criteria.status === 'sent') emails = emails.filter(email => email.from === gLoggedinUser.email && email.removedAt === null )
            if (criteria.status === 'trash') emails = emails.filter(email => email.remove !== null)
            if (criteria.status === 'draft') emails = emails.filter(email => email.sentAt === null && email.removedAt === null)
        }

        if (criteria.txt) {
            const rejex = new RegExp(criteria.txt, 'i')
            emails = emails.filter(email => rejex.text(email.body))
        }
        if (criteria.isRead) {
            emails = emails.filter(email => email.isRead === JSON.parse(criteria.isRead))
        }
        if (criteria.isStared) {
            emails = emails.filter(email => email.isStared === JSON.parse(criteria.isStared))
        }
        if (criteria.lables) {
            console.log('here')
        }
        return emails
       })
}


function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getNextEmailId(emailId){
    return storageService.query(EMAIL_KEY)
    .then(emails => {
        var idx = emails.findIndex(email => email.id === emailId)
        if (idx === emails.length - 1) idx = -1
        return emails[idx + 1].id
    })
    
}

function getPrevEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
    .then(emails => {
        var idx = emails.findIndex(email => email.id === emailId)
        if (idx === 0) idx = emails.length
        return emails[idx - 1].id
    })

}

function getEmptyEmailToSend(subject = '', body = '', to = '', sentAt = null) {
    return {
        id: '',
        subject,
        body,
        isRead: true,
        isStared: false,
        sentAt,
        removedAt: null,
        from: gLoggedinUser.email,
        to
    }
}

function getLoggedinUser() {
    return gLoggedinUser
}

function _createEmails() {
    let emails = utilSevice.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        _createDemoEmails()
    }
}

function _createDemoEmails() {
    var DEMO_EMAILS = [];
    var length = 40;

    for (var i=0; i < length; i++) {
        DEMO_EMAILS.push(_generateEmailData());
    }

    utilSevice.saveToStorage(EMAIL_KEY, DEMO_EMAILS)
}

function _generateEmailData() {
    
}