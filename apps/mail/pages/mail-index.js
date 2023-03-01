const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

import { MailFilter } from '../cmps/mail-filter.js';
import { MailList } from '../cmps/mail-list.js';
import { MailFolderList } from '../cmps/mail-folder-list.js'
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from '../services/mail-service.js';

export function MailIndex() {
    const [criteria, setCriteria] = useState({ status: 'inbox' })
    const [emails, setEmails] = useState([])

    useEffect(() => {
        loadEmails()
    }, [criteria])


    function loadEmails() {
        mailService.query(criteria).then(emailsToUpdate => {
            setEmails(emailsToUpdate)
        })
    }

    function onChangeFolder(folder) {
        setCriteria((prevCriteria) => ({ ...prevCriteria, status: folder }))
    }


    function onChangeFilter({ isRead, isStared, searchTerm: txt }) {
        console.log('isRead', isRead)
        console.log('isStared', isStared)
        setCriteria((prevCriteria) => ({ ...prevCriteria, txt, isStared, isRead }))
    }

    function onToggleMailProp(prop, val, emailId) {
        if (prop === 'removedAt' && criteria.status === 'trash') {
            mailService.remove(emailId).then(() => {
                showSuccessMsg('Email removed!')
                setCriteria((prevCriteria) => ({ ...prevCriteria }))
            })
        } else {
            const emailtoUpdate = emails.find(email => email.id === emailId)
            const emailtoUpdateIdx = emails.findIndex(email => email.id === emailId)
            emailtoUpdate[prop] = val
            const emailsToUpdate = emails.map((email, idx) => {
                return (idx === emailtoUpdateIdx) ? emailtoUpdate : email
            })
            setEmails(emailsToUpdate)
            mailService.save(emailtoUpdate).then((email) => {
                console.log(email)
                setCriteria((prevCriteria) => ({ ...prevCriteria }))
            })
        }
    }

    return (
    `<section className="mail-index full main-layout">
            <div className="mail-toolbar-container">
                <MailFilter onChangeFilter={onChangeFilter} />
            </div>
            <section className="mail-app flex">
                <MailFolderList onChangeFolder={onChangeFolder} />
                <MailList emails={emails} onToggleMailProp={onToggleMailProp} />
                <Outlet />
            </section>
        </section>`
    )
}