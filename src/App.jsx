import './App.css'
import { Movies } from './components/Movies'
import { UseMovies } from './hooks/useMovies'

function App () {
  const { movies } = UseMovies()

  const handleSubmit = (event) => {
    event.preventDefault()

    const { query } = Object.fromEntries(new window.FormData(event.target))
    // const query = fields.get('query')
    console.log(query)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de pelīculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
