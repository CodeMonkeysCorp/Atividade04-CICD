import { useState } from "react";
import "./Home.css";

function Formulario() {
  const campos = ['Título', 'Descrição', 'Autor', 'Páginas']

  const [valores, setValores] = useState(
    campos.reduce((acc, campo) => ({ ...acc, [campo]: '' }), {})
  )

  const handleChange = (campo) => (e) => {
    setValores({ ...valores, [campo]: e.target.value })
  }

  const criarOuAlterar = async () => {
  try {
    const response = await fetch('ROTA_CRIAR_ALTERAR', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valores),
    })

    if (!response.ok) throw new Error('Erro ao criar/alterar')

    const data = await response.json()
    console.log('Resposta do backend:', data)
    alert('Livro criado/alterado com sucesso!')
  } catch (err) {
    console.error(err)
    alert('Erro ao criar/alterar')
  }
}

const remover = async () => {
  try {
    const response = await fetch('ROTA_REMOVER', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Título: valores['Título'] }),
    })

    if (!response.ok) throw new Error('Erro ao remover')

    const data = await response.json()
    console.log('Resposta do backend:', data)
    alert('Livro removido com sucesso!')
  } catch (err) {
    console.error(err)
    alert('Erro ao remover')
  }
}


  return (
    <div>
      {campos.map((campo) => (
        <div className="itemLista" key={campo}>
          <p>{campo}:</p>
          <input
            className="inputTxt"
            type="text"
            value={valores[campo]}
            onChange={handleChange(campo)}
          />
        </div>
      ))}

      <div className="itemLista">
        <button onClick={criarOuAlterar}>Criar/Alterar</button>
        <button onClick={remover}>Remover</button>
      </div>
      
    </div>
  )
}

function Home() {
  return (
    <>
      <p class="header">Alterar Livro</p>
      <div class="listaPrincipal">
        <Formulario />
      </div>
    </>
  );
}

export default Home;
