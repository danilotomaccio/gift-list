import './App.css'
import { ListComponent } from './components/ListComponent'

function App() {
  return (
    <>
      <div className="display-large title">
        Gift List
      </div>
      <div className="body-small sub-title">
        I prezzi vengono presi in automatico, potrebbero essere sbagliati e perciò sono solo indicativi
      </div>
      <ListComponent></ListComponent>
    </>
  )
}

export default App
