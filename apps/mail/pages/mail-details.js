const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function MailDetails() {
    const [email, setEmail] = useState(null);
    const [nextEmailId, setNextEmailId] = useState(null)
    const { emailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadEmail()
    }, [emailId])

    function loadEmail() {
        mailService.get(emailId)
            .then((email) => {
                console.log(email)
                setEmail(email)
            })
            .catch((err) => {
                console.log('Had issues in email details', err)
                navigate('/mail')
            })


        mailService.getNextEmailId(emailId)
            .then(setNextEmailId)
    }

    function onGoBack() {
        navigate('/mail')
    }

    function onRemoveEmail(emailId) {
        mailService.remove(emailId).then(() => {
            navigate(`/mail/details/${nextEmailId}`)
            showSuccessMsg('Email removed!')
        })
    }

    if (!email) return <div>loading...</div>

    return (
        <section className="email-details-container">
            <div className="email-details">
                <div className="email-details-header">
                    <button className="details-back" onClick={() => onGoBack()}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="details-remove" onClick={() => onRemoveEmail(email.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div className="details-subject">{email.subject}</div>
                <div className="email-description">
                    <div className="details-sender"><span className="bold black">From: </span>{email.from}</div>
                    <div className="details-date">{utilService.getFullDate(email.sentAt)}</div>
                </div>
                <div className="details-body">{email.body}</div>
            </div>
        </section>
    )
}