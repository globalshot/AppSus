import { MailPreview } from '../cmps/mail-preview.js'

export function MailList({ emails , onToggleMailProp }) {
    return (
        `<ul className="mail-list flex">
            {emails.map(email => (
                <MailPreview key={email.id} email={email} onToggleMailProp={onToggleMailProp} />
            ))}
        </ul>`
    )
}