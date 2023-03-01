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

