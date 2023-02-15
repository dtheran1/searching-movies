import './App.css'
import { Movies } from './components/Movies'
import { UseMovies } from './hooks/useMovies'

function App () {
  const { movies: mappedMovies } = UseMovies()

  return (
    <div className='page'>
      <header>
        <h1>Buscador de pelīculas</h1>
        <form className='form'>
          <input type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}

export default App
