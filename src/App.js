import logo from './logo.svg'
import './App.css'
import TimeConverter from './components/TimeConverter'
import CurrentDateTime from './components/CurrentDateTime'

function App () {
  return (
    <>
      <div className='App'>
        <header className='App-header bg-gray-800 text-white text-2xl py-4'>
          <CurrentDateTime />
        </header>
        <main className='App-body'>
          <TimeConverter />
        </main>
      </div>
      <footer className='bg-gray-800 text-gray-500 transition duration-300 ease-in-out py-5 text-center hover:text-white'>
        <a
          href='https://github.com/Pseudoman21'
          target='_blank'
          rel='noreferrer'
        >
          &copy; Pseudoman21, 2023
        </a>
      </footer>
    </>
  )
}

export default App
