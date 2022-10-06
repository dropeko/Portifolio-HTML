let salveDesenho = [];

window.onload = function () {

    function firstColorPalette (){
        let firstPalette = document.getElementById('blackPixel');
        firstPalette.style.backgroundColor = 'black';
        firstPalette.classList.add('selected');
    };

// Função para gerar uma cor aleatória
    function generateColors (){
        let rgb1 = Math.floor(Math.random() * 256);
        let rgb2 = Math.floor(Math.random() * 256);
        let rgb3 = Math.floor(Math.random() * 256);
        let rgbFull = 'rgb(' + rgb1 + ', ' + rgb2 + ', ' + rgb3 + ')';
        return rgbFull; 
    }

// Função para criar o palette de cores
    function createPalette(colors) {
        let palette = document.getElementById('color-palette');
        let colorPalette = document.createElement('div');
        colorPalette.style.backgroundColor = colors;
        colorPalette.className = 'color';
        palette.appendChild(colorPalette);
    };
    firstColorPalette();
    createPalette(generateColors());
    createPalette(generateColors());
    createPalette(generateColors());
    
// Função para gerar novas cores aleatórias
    let newColorsButton = document.getElementById('button-random-color');
    let allColors = document.getElementsByClassName('color')
    let savedPalette = [];
    function randomColors () {
        for (let index = 1; index <= allColors.length - 1; index += 1) {
            allColors[index].style.backgroundColor = generateColors();
        }
        for (let index = 0; index < allColors.length; index += 1) {
            savedPalette.push(allColors[index].style.backgroundColor);
        }
        localStorage.setItem('colorPalette', JSON.stringify(savedPalette));
        savedPalette = [];
    }
    newColorsButton.addEventListener('click', randomColors); 

// Função usando localStorage para salvar e exibir paleta de cores gerada aleatoriamente
let salveLocal = [];
function salvarPalette() {
    const cores = document.getElementsByClassName('color');
    const pegaCor = JSON.parse(localStorage.getItem('colorPalette'));
    if (pegaCor === null) {
      for (let index = 1; index < cores.length; index += 1) {
        salveLocal.push(cores[index].style.backgroundColor);
      }
      localStorage.setItem('colorPalette', JSON.stringify(salveLocal));
    
    } else {
      for (let index2 = 1; index2 < cores.length; index2 += 1) {
        cores[index2].style.backgroundColor = pegaCor[index2];
      }
    }
  }
salvarPalette();

// Função para criar board
	function createBoard (pixels) {
        let blocks = document.querySelector('#pixel-board');
            for (let index = 0; index < pixels * pixels; index += 1) {
                newBlock = document.createElement('div')
                newBlock.className = 'pixel';
                newBlock.style.background = 'white';
                blocks.appendChild(newBlock);
            }
    }
    createBoard(5);

// Função para selecionar cor da paleta
    let colors = document.querySelectorAll('.color');

    function choseColor() {
        for (let index = 0; index < colors.length; index += 1) {
            colors[index].addEventListener('click', function (event) {
                for (let index2 = 0; index2 < colors.length; index2 += 1) {
                    colors[index2].classList.remove('selected');
                }
                event.target.classList.add('selected')
            })
        }
    } 
    choseColor();

// Função para colorir o pixel com a cor selecionada
    function colorBoard() {
        const pixels = document.getElementsByClassName('pixel');
        for (let index = 0; index < pixels.length; index += 1) {
          pixels[index].addEventListener('click', function (event) {
            salveDesenho = [];
            const selectedColor = document.querySelector('.selected');
            const finalColor = window.getComputedStyle(selectedColor).backgroundColor;
            event.target.style.backgroundColor = finalColor;
            salvandoPixel();
          });
        }
      }
    colorBoard();

// Função para resetar o grid ao apertar o botão
    let resetButton = document.getElementById('clear-board');
    function resetGrid (){
        localStorage.clear();
        document.location.reload();
    }
    resetButton.addEventListener('click', resetGrid)

// Função para salvar o desenho após atualizar a pagina
    function pegandoPixel() {
        const desenho = document.getElementsByClassName('pixel');
        const pegaCor = JSON.parse(localStorage.getItem('pixelBoard'));
        if (pegaCor === null) {
        for (let index = 0; index < desenho.length; index += 1) {
            salveDesenho.push(desenho[index].style.backgroundColor);
        }
        localStorage.setItem('pixelBoard', JSON.stringify(salveDesenho));
        salveDesenho = [];
        } else {
        for (let index2 = 0; index2 < desenho.length; index2 += 1) {
            desenho[index2].style.backgroundColor = pegaCor[index2];
        }
        }
    }
    function salvandoPixel() {
        const salvaDesenho = document.getElementsByClassName('pixel');
        for (let index = 0; index < salvaDesenho.length; index += 1) {
        salveDesenho.push(salvaDesenho[index].style.backgroundColor);
        }
        localStorage.setItem('pixelBoard', JSON.stringify(salveDesenho));
    }
    pegandoPixel();


// ------------------------------------------------------------------------------------ //
// FIM DO CÓDIGO    
}