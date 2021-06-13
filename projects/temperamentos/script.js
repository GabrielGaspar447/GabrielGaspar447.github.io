const colA = ['Despreocupado/a', 'Calmo/a', 'Animado/a', 'Jovial', 'Sociável', 'Simpático/a', 'Multitarefa', 'Age rápido', 'Workaholic', 'Tagarela', 'Expressivo/a', 'Superficial', 'Expansivo/a', 'Falante', 'Amigável', 'Adaptável', 'Inusitado/a', 'Brilhante', 'Impaciente', 'Inconstante', 'Dificuldade para concretizar', 'Muda de interesses', 'Flexível', 'Generoso/a', 'Tem muitas ideias', 'Volúvel', 'Feliz' ];

const colB = ['Impulsivo/a', 'Agitado/a', 'Esquentado/a', 'Ativo/a', 'Impositivo/a', 'Ativo/a', 'Agressivo/a', 'Líder', 'Persuasivo/a', 'Cheio/a de energia', 'Extrovertido/a', 'Turbulento/a', 'Impaciente', 'Empreendedor/a', 'Pioneiro/a', 'Barulhento/a', 'Prático/a', 'Dramático/a', 'Dispensa detalhes', 'Exaltado/a', 'Competitivo/a', 'Tem resistência', 'Dominador/a', 'Pouco tolerante', 'Obstinado/a', 'Irritável', 'Audacioso/a'];

const colC = ['Crítico/a', 'Profundo/a', 'Preocupado/a', 'Sóbrio/a', 'Nervoso/a', 'Distante', 'Quieto/a', 'Reservado/a', 'Resignado/a', 'Tristonho/a', 'Não se empolga facilmente', 'Pensativo/a', 'Introspectivo/a', 'Reflexivo/a', 'Exigente', 'Magoável', 'Leitor/a', 'Lento/a', 'Pessimista', 'Expressão séria', 'Intelectual', 'Boa memória', 'Observador/a', 'Irônico/a', 'Perfeccionista', 'Dificuldade para mudar', 'Abnegado/a'];

const colD = ['Cuidadoso/a', 'Metódico/a', 'Pouco reativo/a', 'Estável', 'Pacato/a', 'Pensativo/a', 'Calmo/a', 'Controlado/a', 'Tem seu ritmo próprio', 'Sereno/a', 'Sem pressa', 'Lento/a', 'Pouco flexível', 'Comedido/a', 'Tranquilo/a', 'Ensimesmado/a', 'Reservado/a', 'Sonhador/a', 'Gosta de rotina', 'Lento/a para aprender', 'Perseverante', 'Obstinado/a', 'Tímido/a', 'Constante', 'Conservador/a', 'Indiferente', 'Sensato/a'];

const divA = document.getElementById('A');
const divB = document.getElementById('B');
const divC = document.getElementById('C');
const divD = document.getElementById('D');
const btn = document.getElementById('button');
const clearBtn = document.getElementById('clear')

function selected(e) {
  const targetLine = document.getElementsByClassName(e.target.classList[1]);
  for (const i of targetLine) {
    i.classList.remove('selected')
  }
  e.target.classList.add('selected')
}

function genColA() {
  for (let i = 0; i < colA.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add(`line`, `line${i}`, `colA`);
    div.addEventListener('click', selected)
    div.innerHTML += colA[i];
    divA.appendChild(div);
  }
}

function genColB() {
  for (let i = 0; i < colB.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add(`line`, `line${i}`, `colB`);
    div.addEventListener('click', selected)
    div.innerHTML += colB[i];
    divB.appendChild(div);
  }
}

function genColC() {
  for (let i = 0; i < colC.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add(`line`, `line${i}`, `colC`);
    div.addEventListener('click', selected)
    div.innerHTML += colC[i];
    divC.appendChild(div);
  }
}

function genColD() {
  for (let i = 0; i < colD.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add(`line`, `line${i}`, `colD`);
    div.addEventListener('click', selected)
    div.innerHTML += colD[i];
    divD.appendChild(div);
  }
}

function result(e) {
  const selecteds = document.querySelectorAll('.selected');
  if (selecteds.length !== 27) {
    return alert(`Erro: linhas em branco!\r\n\r\nPor favor selecione uma palavra em cada linha.`);
  }
  const resultColA = document.querySelectorAll('#A .selected').length;
  const resultColB = document.querySelectorAll('#B .selected').length;
  const resultColC = document.querySelectorAll('#C .selected').length;
  const resultColD = document.querySelectorAll('#D .selected').length;

  const colunas = [divA, divB, divC, divD];
  const resultado = [resultColA, resultColB, resultColC, resultColD];

  const results = document.querySelectorAll('.result');
  for (const i of results) {
    i.remove();
  }

  for (let i = 0; i < 4; i += 1) {
    const div = document.createElement('div');
    div.classList.add('result', 'line');
    div.innerHTML = resultado[i];
    colunas[i].appendChild(div);
  }
}

function clear() {
  const selecteds = document.querySelectorAll('.selected');
  for (const i of selecteds) {
    i.classList.remove('selected');
  }

  const results = document.querySelectorAll('.result');
  for (const i of results) {
    i.remove();
  }
}

genColA();
genColB();
genColC();
genColD();
btn.addEventListener('click', result);
clearBtn.addEventListener('click', clear)