import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash-svgrepo-com.png'
import api from '../../services/api'


function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputTel = useRef()
  const inputEmail = useRef()
  const inputServico = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)

  }
  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      tel: inputTel.current.value,
      email: inputEmail.current.value,
      servico: inputServico.current.value
    })
    getUsers()

  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, []);


  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type="text" ref={inputName} />
        <input placeholder="Telefone" name='idade' type="number" ref={inputTel} />
        <input placeholder="Email" name='email' type="text" ref={inputEmail} />
        <input placeholder="Serviço" name='servico' type="text" ref={inputServico} />
        <button type='button' onClick={createUsers}> Cadastrar </button>
      </form>
      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome:<span>{user.name}</span></p>
            <p>Telefone:<span>{user.tel}</span></p>
            <p>Email:<span>{user.email}</span></p>
            <p>Serviço:<span>{user.servico}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} className="trash-icon" />
          </button>
        </div>

      ))}
      <div>
        <div>

        </div>

      </div>
    </div>


  )
}

export default Home
