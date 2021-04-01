import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function BookList(props) {
    const { books, setBooks } = props
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        axios.get('http://localhost:4000/books')
            .then(res => setBooks(res.data))
            .finally(() => setLoading(false))
    }, [])

    function remove(id) {
      setLoading(true)

      axios.delete(`http://localhost:4000/books/${id}`)
        .then(() => axios.get('http://localhost:4000/books'))
        .then(res => setBooks(res.data))
        .finally(() => setLoading(false))
    }

    if (loading) return 'Loading...'

    return (
      <ul>
        {books.map(book =>
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
            <button onClick={() => remove(book.id)}>delete</button>
          </li>
        )}
      </ul>
    )
}
