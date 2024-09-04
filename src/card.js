import './card.css';

function Card({nome, img,bg}) {

  const estilo = {
    backgroundColor: bg
  }

  return (
    <div className="card" style={estilo}>
        <div className='div-img'>
          
          <img src={img} alt=''/>
        </div>
        <div className='bg'>
            <p>{nome}</p>
        </div>
    </div>
  );
}

export default Card;
