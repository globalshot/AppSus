import { mailService } from "../services/mail-service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

export function MailCompose() {
    const [email, setEmail] = useState(mailService.getEmptyEmailToSend())
    const navigate = useNavigate()

    function onCloseCompose() {
        mailService.save(email).then(() => setEmail(mailService.getEmptyEmailToSend()))
        showSuccessMsg('Saved to drafts!')
        navigate('/mail')
    }

    function handleChange({ target }) {
        let { value, type, name: field} = target
        value = type === 'number' ? +value : value
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value}))
        console.log('email', email)
    }

    function handleSubmit(event) {
        event.preventDefault()
        email.sentAt = Date.now()
        mailService.save(email).then(() => setEmail(mailService.getEmptyEmailToSend()))
        showSuccessMsg('Email sent!')
        navigate('./mail')
    }

    return (
        <section className="mail-compose-container">
                <div className="compose-header">
                  <span>New Message</span>
                  <button className="close-compose" onClick={()=> onCloseCompose()}>X</button>
                </div>
          <form onSubmit={handleSubmit} className="compose-form flex flex-column">
            <label htmlFor="to" className="compose-label">
            <input
              type="email"
              name='to'
              required
              id="to"
              value={email.to}
              onChange={(e) => handleChange(e)}
              className="compose-input"
              placeholder="To"
            /></label>
            <label htmlFor="subject" className="compose-label">
            <input
              type="text"
              name='subject'
              required
              id="subject"
              value={email.subject}
              onChange={(e) => handleChange(e)}
              className="compose-input"
              placeholder="Subject"
            /></label>
            <label htmlFor="body" className="compose-label compose-textarea">
            <textarea
              id="body"
              required
              name='body'
              value={email.body}
              onChange={(e) => handleChange(e)}
              className="compose-textarea"
            /></label>
    
          </form>
            <button type="submit" className="compose-button" onClick={(ev) => handleSubmit(ev)} >Send</button>
    
        </section >
      )
}