const standartBoard = 5;

function limpaQuadro() {
  const table = document.getElementById('pixel-board');
  const itensTabela = table.children;
  console.log(itensTabela);
  itensTabela[0].remove();
  const corpoTabela = document.createElement('tbody');
  table.appendChild(corpoTabela);
}

function getColorSelected() {
  const elements = document.getElementsByClassName('color');
  for (let index = 0; index < elements.length; index += 1) {
    if (elements[index].className.includes('selected')) {
      return elements[index].style.backgroundColor;
    }
  }
}

function restoreBoard() {
  let arrayY = localStorage.getItem('pixelBoard');
  arrayY = JSON.parse(arrayY);
  const tableBody = document.querySelector('#pixel-board tbody');
  for (let indexY = 0; indexY < arrayY.length; indexY += 1) {
    const arrayX = arrayY[indexY];
    const line = document.createElement('tr');
    for (let indexX = 0; indexX < arrayX.length; indexX += 1) {
      const pixel = document.createElement('td');
      const color = arrayX[indexX];
      pixel.className = 'pixel';
      pixel.style.backgroundColor = color;
      pixel.setAttribute('param_x', indexX + 1);
      pixel.setAttribute('param_y', indexY + 1);
      line.appendChild(pixel);
    }
    tableBody.appendChild(line);
  }
}

function startBoard(tamanho) {
  const arrayY = [];
  for (let indexY = 1; indexY <= tamanho; indexY += 1) {
    const arrayX = [];
    for (let indexX = 1; indexX <= tamanho; indexX += 1) {
      const cor = 'rgb(255,255,255)';
      arrayX.push(cor);
    }
    arrayY.push(arrayX);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrayY));
}

function loadBoard() {
  let tamanhoQuadro = localStorage.getItem('boardSize');
  if (tamanhoQuadro == null) {
    tamanhoQuadro = standartBoard;
    localStorage.setItem('boardSize', standartBoard);
  }
  if (localStorage.getItem('pixelBoard') == null) {
    startBoard(tamanhoQuadro);
  }
  restoreBoard();
}

function savePixel(paramX, paramY, cor) {
  let arrayY = localStorage.getItem('pixelBoard');
  arrayY = JSON.parse(arrayY);
  arrayY[paramY - 1][paramX - 1] = cor;
  localStorage.setItem('pixelBoard', JSON.stringify(arrayY));
}

function randomNum() {
  return Math.ceil(Math.random() * 255);
}

function startPalette() {
  const colorPalette = {
    cor1: [randomNum(), randomNum(), randomNum()],
    cor2: [randomNum(), randomNum(), randomNum()],
    cor3: [randomNum(), randomNum(), randomNum()],
  };
  localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
}

function chargePaletteColors() {
  let initialColors = localStorage.getItem('colorPalette');
  if (initialColors == null) {
    startPalette();
    initialColors = localStorage.getItem('colorPalette');
  }
  initialColors = JSON.parse(initialColors);
  const paletaItens = document.getElementsByClassName('color');
  for (let index = 1; index <= 3; index += 1) {
    const elemento = paletaItens[index];
    const cor1 = initialColors[`cor${index}`][0];
    const cor2 = initialColors[`cor${index}`][1];
    const cor3 = initialColors[`cor${index}`][2];
    elemento.style = `background-color: rgb(${cor1},${cor2},${cor3});`;
  }
}

function resetBoard() {
  const tamanhoQuadro = localStorage.getItem('boardSize');
  startBoard(tamanhoQuadro);
  limpaQuadro();
  restoreBoard();
}

document.getElementById('generate-board').addEventListener('click', () => {
  let inputValor = document.getElementById('board-size').value;
  if (inputValor === '') {
    alert('Board inválido!');
    return;
  }
  if (inputValor < 5) {
    inputValor = 5;
  } else if (inputValor > 50) {
    inputValor = 50;
  }
  localStorage.setItem('boardSize', inputValor);
  resetBoard();
  document.getElementById('board-size').value = '';
});

document.getElementById('button-random-color').addEventListener('click', () => {
  startPalette();
  chargePaletteColors();
});

document.getElementById('color-palette').addEventListener('click', (element) => {
  const elementos = document.getElementsByClassName('color');
  for (let index = 0; index < elementos.length; index += 1) {
    elementos[index].className = 'color';
  }
  const corSelected = element.target;
  if (corSelected != null && corSelected.className.includes('color')) {
    corSelected.className = 'color selected';
  }
});

document.getElementById('pixel-board').addEventListener('click', (element) => {
  const colorSelected = getColorSelected();
  const elemento = element.target;
  if (elemento.className === 'pixel') {
    elemento.style.backgroundColor = colorSelected;
    savePixel(
      elemento.getAttribute('param_x'),
      elemento.getAttribute('param_y'),
      colorSelected,
    );
  }
});

document.getElementById('clear-board').addEventListener('click', resetBoard);

window.onload = () => {
  chargePaletteColors();
  loadBoard();
};