const { useState, useEffect } = React

export function MailFilter({ onChangeFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRead, setIsRead] = useState('');
  const [isStared, setIsStared] = useState('');

  useEffect(() => {
    onChangeFilter({ searchTerm, isRead, isStared })
  }, [isRead, isStared, searchTerm])

  function handleSearchChange(event) {
    setSearchTerm(event.target.value)
  }
  function handleReadChange(event) {
    console.log('event.target.value', event.target.value)
    if (event.target.value === 'starred') {
      setIsStared(true)
      setIsRead('')
    }
    if (event.target.value === 'read') {
      setIsRead(true)
      setIsStared('')
    }
    if (event.target.value === 'unread') {
      setIsRead(false)
      setIsStared('')
    }

    if (event.target.value === '') {
      setIsStared('')
      setIsRead('')
    }
  }




  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="mail-filter flex justify-center align-center">
      <input placeholder="Search" type="text" value={searchTerm} onChange={handleSearchChange} />
      <select onChange={handleReadChange}>
        <option value={''}>All</option>
        <option value={'read'}>Read</option>
        <option value={'unread'}>Unread</option>
        <option value={'starred'}>Starred</option>
      </select>
    </form>
  )
}