import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import LogoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

  async function heandleNewIncident(e){
      e.preventDefault();

      const data = {
        title,
        description,
        value,
      };

      try{
         await api.post('incidentS', data, {
           headers: {
             Authorization: ongId, 
           }
         });

         history.push('/profile');
      }catch(err){
        alert('TEste');
      }
  }


  return (
    <div className="new-incident-container">
      <div className="content">

        <section>
          <img src={LogoImg} alt="Be The Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva detalhadamente para encontrar um herói para resolver isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={heandleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}  
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}  
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}  
          />
        
          <button className="button" type="submit" >Cadastrar</button>
        </form>

      </div>
    </div>
  )
}