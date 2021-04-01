import { useState } from 'react'
import axios from 'axios'

export function AddBooks(props) {
  const [newBook, setNewBook] = useState({
    title: '',
    author: ''
  })
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setNewBook({...newBook, [event.target.name]: event.target.value})
  }

  function submit(event) {
    event.preventDefault()

    setLoading(true)

    if (newBook.title.trim()) {
      axios
        .post('http://localhost:4000/books', newBook)
        .then(() => axios.get('http://localhost:4000/books'))
        .then(res => props.setBooks(res.data))
        .finally(() => setLoading(false))

      return
    }

    alert('title should be filled')
  }
    return (
      <form onSubmit={submit}>
        <label>
          title
          <input value={newBook.title} onChange={handleChange} name="title" />
        </label>
        <label>
          author
          <input value={newBook.author} onChange={handleChange} name="author" />
        </label>
        <button type="submit" disabled={loading}>Add</button>
        {loading ? 'Loading... adding new book' : null}
      </form>
    )
}