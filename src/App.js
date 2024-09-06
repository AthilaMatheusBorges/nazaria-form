import logo from './logo.svg';
import './App.css';
import Card from './card';
import emotions from './emotions.json';
import React, { useState } from 'react';
import perguntas from './perguntas.json';
import './question.css';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [selecionados, setSelecionados] = useState(['', '', '', '', '', '', '', '', '', '', '', '']);


  const selecionarItem = (index, novoValor) => {
    setSelecionados(prevItens =>
      prevItens.map((item, i) => (i === index - 1 ? novoValor : item))
    );
  };

  const submitForm = () => {
    if (selecionados.some(element => element === "")) {
      alert('Por favor, selecione uma resposta para cada pergunta.');
    } else {

      if (localStorage.getItem('id')) {
        const id = localStorage.getItem('id');
        addDocumentWithId(id);
      } else {
        const newUuid = uuidv4();
        addDocumentWithId(newUuid);
        localStorage.setItem('id', newUuid);
      }
    }

  }

  const addDocumentWithId = async (id) => {
    try {
      await setDoc(doc(db, "respostas", id), {
        selecionados
      });
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  }

  return (
    <div className="App">
      <img className='logo' src='/assets/logo-nazaria-p2.png'></img>
      <p className='text-tema'>O que você geralmente sente em relação as seguintes situações?</p>
      <div className='container-question'>
        <ul className='list-questions'>
          {perguntas.map(question => (
            <li key={question.id} className='item-question'>
              <div className='circle'>{question.id}</div>
              <p className='text-question'>{question.pergunta}</p>
              <div className='container-list'>
                <ul className='list-emotions'>
                  {emotions.map(item => (
                    <li key={item.nome} className='item-list' onClick={
                      () => selecionarItem(question.id, item.nome)
                    } style={{ border: selecionados[question.id - 1] === item.nome ? '6px solid lightgreen' : 'none' }}>
                      <Card nome={item.nome} img={item.img} bg={item['bg-color']}></Card>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

        </ul>
      </div>
      <button onClick={() => submitForm()}>ENVIAR</button>
    </div>
  );
}

export default App;
