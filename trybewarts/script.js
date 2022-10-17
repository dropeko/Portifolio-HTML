const enterButton = document.getElementById('enter-button');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const formName = document.getElementById('input-name');
const formLastName = document.getElementById('input-lastname');
const formEmail = document.getElementById('input-email');
const formHouse = document.getElementById('house');
const formFamily = document.querySelectorAll('input[name="family"]');
const formMatter = document.querySelectorAll('input[class="subject"]');
const formEvaluation = document.querySelectorAll('input[name="rate"]');
const formData = document.getElementById('form-data');
const textArea = document.querySelector('#textarea');
const form = document.querySelector('#evaluation-form');

function retornaAlerta() {
  // Capturando o valor do input email e senha através da propriedade .value
  if (emailInput.value === 'tryber@teste.com' && passwordInput.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
enterButton.addEventListener('click', retornaAlerta);

const createButonAgreement = () => {
  // criando botão agreement
  const containerbuton = document.getElementById('agreement-container');
  const radioButton = document.createElement('input');
  radioButton.type = 'checkbox';
  radioButton.id = 'agreement';
  radioButton.className = 'radio-btn';
  containerbuton.appendChild(radioButton);
};
createButonAgreement();

const createSubmitButon = () => {
  // criando botão submit
  const crateButton = document.getElementById('submit-button-container');
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.id = 'submit-btn';
  submitButton.className = 'btn-sub';
  submitButton.innerHTML = 'Enviar';
  crateButton.appendChild(submitButton);
};
createSubmitButon();

const desableButonSubmit = () => {
  // bloqueia botão submit caso não marque checkbox
  const disableButton = document.getElementById('submit-btn');
  disableButton.disabled = true;
  const checkAgreement = document.getElementById('agreement');
  const enableButton = () => {
    const buttonInput = document.getElementById('agreement').value;
    if (buttonInput !== null || buttonInput !== '') {
      disableButton.disabled = false;
    } else {
      disableButton.disabled = true;
    }
  };
  checkAgreement.addEventListener('input', enableButton);
};

desableButonSubmit();

const counterCharacter = () => {
  // adiciona contador de caractere
  const limit = document.getElementById('counter');
  const textArea2 = document.getElementById('textarea');
  const limitInt = parseInt(limit.innerHTML, 10);
  const countLimit = () => {
    limit.innerHTML = limitInt - textArea2.value.length;
  };
  textArea2.addEventListener('input', countLimit);
};
counterCharacter();

function familyForm() {
  let familyChoice = '';
  for (let index = 0; index < formFamily.length; index += 1) {
    if (formFamily[index].checked) {
      familyChoice = formFamily[index].value;
    }
  }
  return familyChoice;
}

function matterForm() {
  const selectedMatter = [];
  for (let index = 0; index < formMatter.length; index += 1) {
    if (formMatter[index].checked) {
      selectedMatter.push(formMatter[index].value);
    }
  }
  return selectedMatter.join(', ');
}

function evaluationForm() {
  let evaluation = '';
  for (let index = 0; index < formEvaluation.length; index += 1) {
    if (formEvaluation[index].checked) {
      evaluation = formEvaluation[index].value;
    }
  }
  return evaluation;
}

function createData(object) {
  for (let index = 0; index < object.length; index += 1) {
    const info = document.createElement('p');
    info.innerText = object[index];
    formData.appendChild(info);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const infoObject = [
    `Nome: ${formName.value} ${formLastName.value}`,
    `Email: ${formEmail.value}`,
    `Casa: ${formHouse.value}`,
    `Família: ${familyForm()}`,
    `Matérias: ${matterForm()}`,
    `Avaliação: ${evaluationForm()}`,
    `Observações: ${textArea.value}`,
  ];
  createData(infoObject);
  form.style.display = 'none';
});

