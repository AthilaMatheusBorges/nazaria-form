import logo from './logo.svg';
import './App.css';
import Card from './card';
import emotions from  './emotions.json';
import './question.css';

function App() {
  return (
    <div className="App">
      <div className='container-list'>
        <ul className='list-emotions'>
          {emotions.map(item => (
            <li key={item.nome} className='item-list'>
              <Card nome={item.nome} img={item.img} bg={item['bg-color']}></Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
