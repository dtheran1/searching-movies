import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { UseMovies } from './hooks/useMovies'

function App () {
  const { movies } = UseMovies()
  // Usando el useRef() de React
  const inputRef = useRef()
  // <input ref={inputRef} type='text' placeholder='Avengers, Star Wars, The Matrix...' />

  const [query, setQuery] = useState()
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    // Recuperamos el value del inputRef
    const inputValue = inputRef.current.value
    console.log(inputValue)

    // Usando el formatData de JS nativo para recuperar el value de cualquier form
    const { query } = Object.fromEntries(new window.FormData(event.target))
    // const query = fields.get('query')
    console.log(query)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (query === '') {
      setError('No se puede buscar la pelicula')
      return
    }

    if (query.match(/^\\d+$/)) {
      setError('No se puede buscar una pelicula con numero')
      return
    }

    if (query.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [query])

  return (
    <div className='page'>
      <header>
        <h1>Buscador de pelīculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}> {error} </p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
