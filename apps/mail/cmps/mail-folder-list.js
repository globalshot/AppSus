const { NavLink } = ReactRouterDOM
const { useState } = ReactRouterDOM

export function MailFolderList({ onChangeFolder }) {
    const [folder, setFolder] = useState('inbox')

    function onClickFolder(folder){
        onChangeFolder(folder)
        setFolder((prevStat) => (prevStat, folder))
    } 

    return (
        <section className="mail-folder-list">
            <div className="side-folder">
                <div className="compose-container" onClick={() => (true)}>
                <NavLink
                   className="compose-btn flex space-between"
                   to="/mail/compose"
                   >
                    <i className="fa-solid fa-pencil"></i>
                    <span>compose</span>
                   </NavLink>
                </div>
            <div className="folders-container">
                <div 
                 className={`folder-item ${folder === 'inbox' ? 'active-folder' : '' } inbox`}
                 onClick={() => onClickFolder('inbox')}
                 >
                <div className="folder-icon flex" label="Inbox">
                    <i className="fas fa-inbox"></i>
                    <span className="folder-name">Inbox</span>
                    </div>   
                 </div>
                
                <div
                className={`folder-item ${folder === 'sent' ? 'active-folder' : '' } sent`}
                onClick={() => onClickFolder('sent')}
                >
                <div className="folder-icon flex">
                   <i className="fas fa-envelope-open"></i>
                   <span className="folder-name">Sent</span>     
                </div>    
                </div>

                <div 
                className={`folder-item ${folder === 'trash' ? 'active-folder' : '' } trash`}
                onClick={() => onClickFolder('trash')}
                >
                    <div className="folder-icon flex">
                        <i className="fas fa-trash-alt"></i>
                        <span className="folder-name">Trash</span>
                    </div>
                </div>

                <div
                className={`folder-item ${folder === 'draft' ? 'active-folder' : ''} draft`}
                onClick={() => onClickFolder('draft')}
                >
                    <div className="folder-icon flex">
                        <i className="fas fa-file"></i>
                        <span className="folder-name">Drafts</span>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}