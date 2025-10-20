import { useState } from 'react'

export default function Formulario() {
  const campos = ['Título', 'Descrição', 'Autor', 'Páginas']

  const [valores, setValores] = useState(
    campos.reduce((acc, campo) => ({ ...acc, [campo]: '' }), {})
  )

  // Função genérica pra atualizar qualquer campo
  const handleChange = (campo) => (e) => {
    setValores({ ...valores, [campo]: e.target.value })
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

      <pre>{JSON.stringify(valores, null, 2)}</pre> {/* mostra os valores */}
    </div>
  )
}
