import { useEffect, useState } from 'react'
import axios from 'axios'

export function EditBook(props) {
    const [book, setBook] = useState({
        title: '',
        author: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        axios.get(`http://localhost:4000/books/${props.match.params.id}`)
            .then(res => setBook(res.data))
            .finally(() => setLoading(false))
    }, [])

    function submit(event) {
        event.preventDefault()
        setLoading(true)
        axios.put(`http://localhost:4000/books/${props.match.params.id}`, book)
            .then(() => {
                setLoading(false)
                props.history.push('/')
            })
    }

    function handleChange(event) {
        setBook({ ...book, [event.target.name]: event.target.value })
    }

    return (
      <form onSubmit={submit}>
        <label>
          title
          <input value={book.title} onChange={handleChange} name="title" />
        </label>
        <label>
          author
          <input value={book.author} onChange={handleChange} name="author" />
        </label>
        <button type="submit" disabled={loading}>Save</button>
        {loading ? 'Loading... adding new book' : null}
      </form>
    )
}