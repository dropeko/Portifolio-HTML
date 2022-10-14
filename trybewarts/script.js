const enterButton = document.getElementById('enter-button');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

function retornaAlerta() {
  // Capturando o valor do input email e senha através da propriedade .value
  if (emailInput.value === 'tryber@teste.com' && passwordInput.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

enterButton.addEventListener('click', retornaAlerta);
