import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true) // Con esta bandera validamos si ya se uso el input

  useEffect(() => {
    // Aqui validamos si el user ha puesto algo en el search y mostrmos los errores
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar la pelicula')
      return
    }

    if (search.match(/^\\d+$/)) {
      setError('No se puede buscar una pelicula con numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  // Usando el useRef() de React
  // const inputRef = useRef()
  // <input ref={inputRef} type='text' placeholder='Avengers, Star Wars, The Matrix...' />

  const handleSubmit = (event) => {
    event.preventDefault()

    // Recuperamos el value del inputRef
    // const inputValue = inputRef.current.value
    // console.log(inputValue)

    // Usando el formatData de JS nativo para recuperar el value de cualquier form
    const { query } = Object.fromEntries(new window.FormData(event.target))
    // const query = fields.get('query')
    console.log(query)

    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de pelīculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error && 'red'
            }}
            onChange={handleChange} value={search} name='query' type='text' placeholder='Avengers, Star Wars, The Matrix...'
          />
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
