const { Link } = ReactRouterDOM
import {utilService } from '../../../services/util.service.js'

export function MailPreview({ email, onToggleMailProp }) {

    function onHandleToggleIsRead() {
        onToggleMailProp('isRead', !email.isRead, email.id)
    }

    function onHandleToggleIsStared() {
        { onToggleMailProp('isStared', !email.isStared, email.id)}
    }

    function onHandleRemove() {
        if(!email.removedAt) onToggleMailProp('removedAt', Date.now(), email.id)
    }

    function onEnterMai(ev) {
        ev.stopPropagation()
    }



    let readClassName = email.isRead ? "fa-regular fa-envelope-open" : "fa-regular fa-envelope"
    const sraredClasName = email.isStared ? "fa-solid fa-star starred" : "fa-regular fa-star"
    let isBold = email.isRead ? 'un-bold black' : ''
    let isReadMail = email.isRead ? '' : 'read'
    return (
        <li className={`mail-preview ${isReadMail} `}>
            <div className="star-mail" onClick={() => onHandleToggleIsStared()}>
               <i className={staredClassName}></i>
            </div>
            <Link onClick={onEnterMail} to={`/mail/details/${email.id}`} className="mail-link">
                <h3 className={`sender clean-space text-overflow ${isBold}`}>{email.from}</h3>
                <section className ="content flex">
                    <h3  className={`subject clean-space ${isBold}`}>{email.subject}</h3>
                    <h3 className="body clean-space">{email.body}</h3>
                </section>
                <h3 className="data clean-space">{utilService.getFormattedDate(email.sentAt)} {utilService.getFormattedMonthName(email.sentAt)}</h3>

            </Link>
            <button className="trash-btn" onClick={() => onHandleRemove()}>
                <i className="fa-regular fa-trash-can"></i>
            </button>
            <button className="reading-btn" onClick={() => onHandleToggleIsRead()}>
                <i className={readClassName}> </i>
            </button>
    </li>
)

}