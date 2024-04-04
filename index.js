let participantes = [
  {
    nome: "Alice Silva",
    email: "alice@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00) 
  },
  {
    nome: "Bruno Oliveira",
    email: "bruno@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 15, 27),
    dataCheckIn: null 
  },
  {
    nome: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 12, 10, 30),
    dataCheckIn: new Date(2024, 2, 15, 14, 45) 
  },
  {
    nome: "Daniel Pereira",
    email: "daniel@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 8, 15),
    dataCheckIn: new Date(2024, 2, 20, 12, 10) 
  },
  {
    nome: "Erika Lima",
    email: "erika@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 16, 40),
    dataCheckIn: null 
  },
  {
    nome: "Felipe Costa",
    email: "felipe@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 11, 55),
    dataCheckIn: new Date(2024, 2, 4, 10, 30) 
  },
  {
    nome: "Gabriela Almeida",
    email: "gabriela@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 14, 20),
    dataCheckIn: new Date(2024, 2, 2, 9, 45) 
  },
  {
    nome: "Henrique Gomes",
    email: "henrique@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 9, 10),
    dataCheckIn: new Date(2024, 1, 28, 17, 30) 
  },
  {
    nome: "Isabela Ferreira",
    email: "isabela@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 18, 45),
    dataCheckIn: null 
  },
  {
    nome: "Jorge Oliveira",
    email: "jorge@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 13, 30),
    dataCheckIn: new Date(2024, 1, 18, 11, 10) 
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
      Confirmar check-in
      </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>`
}

const atualizarLista = (participantes) => {

  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
      
  }
  console.log(output)

  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  alert(resultado)
  
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)

}