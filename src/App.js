import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { BookList } from './components/BookList'
import { AddBooks } from './components/AddBooks'
import { EditBook } from './components/EditBook'

function App() {
  const [books, setBooks] = useState([])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <AddBooks setBooks={setBooks} history={'lalalal'} />
            <BookList books={books} setBooks={setBooks} />
          </Route>
          <Route path="/books/:id" component={EditBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
