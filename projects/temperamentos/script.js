const colA = ['Despreocupado/a', 'Calmo/a', 'Animado/a', 'Jovial', 'Sociável', 'Simpático/a', 'Multitarefa', 'Age rápido', 'Workaholic', 'Tagarela', 'Expressivo/a', 'Superficial', 'Expansivo/a', 'Falante', 'Amigável', 'Adaptável', 'Inusitado/a', 'Brilhante', 'Impaciente', 'Inconstante', 'Dificuldade para concretizar', 'Muda de interesses', 'Flexível', 'Generoso/a', 'Tem muitas ideias', 'Volúvel', 'Feliz' ];

const colB = ['Impulsivo/a', 'Agitado/a', 'Esquentado/a', 'Ativo/a', 'Impositivo/a', 'Ativo/a', 'Agressivo/a', 'Líder', 'Persuasivo/a', 'Cheio/a de energia', 'Extrovertido/a', 'Turbulento/a', 'Impaciente', 'Empreendedor/a', 'Pioneiro/a', 'Barulhento/a', 'Prático/a', 'Dramático/a', 'Dispensa detalhes', 'Exaltado/a', 'Competitivo/a', 'Tem resistência', 'Dominador/a', 'Pouco tolerante', 'Obstinado/a', 'Irritável', 'Audacioso/a'];

const colC = ['Crítico/a', 'Profundo/a', 'Preocupado/a', 'Sóbrio/a', 'Nervoso/a', 'Distante', 'Quieto/a', 'Reservado/a', 'Resignado/a', 'Tristonho/a', 'Não se empolga facilmente', 'Pensativo/a', 'Introspectivo/a', 'Reflexivo/a', 'Exigente', 'Magoável', 'Leitor/a', 'Lento/a', 'Pessimista', 'Expressão séria', 'Intelectual', 'Boa memória', 'Observador/a', 'Irônico/a', 'Perfeccionista', 'Dificuldade para mudar', 'Abnegado/a'];

const colD = ['Cuidadoso/a', 'Metódico/a', 'Pouco reativo/a', 'Estável', 'Pacato/a', 'Pensativo/a', 'Calmo/a', 'Controlado/a', 'Tem seu ritmo próprio', 'Sereno/a', 'Sem pressa', 'Lento/a', 'Pouco flexível', 'Comedido/a', 'Tranquilo/a', 'Ensimesmado/a', 'Reservado/a', 'Sonhador/a', 'Gosta de rotina', 'Lento/a para aprender', 'Perseverante', 'Obstinado/a', 'Tímido/a', 'Constante', 'Conservador/a', 'Indiferente', 'Sensato/a'];

const divA = document.getElementById('A');
const divB = document.getElementById('B');
const divC = document.getElementById('C');
const divD = document.getElementById('D');
const btn = document.getElementById('button')

function selected(e) {
  const targetLine = document.getElementsByName(e.target.name);
  for (const i of targetLine) {
    i.nextSibling.classList.remove('selected')
  }
  e.target.nextSibling.classList.add('selected')
}

function genColA() {
  for (let i = 0; i < colA.length; i += 1) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    div.className = 'line';
    input.type = 'radio';
    input.id = `A${i}`;
    input.name = `line${i}`;
    input.required = true;
    input.hidden = true;
    input.addEventListener('click', selected)
    input.className = 'form-check-input';
    input.classList.add('colA');
    label.className = 'form-check-label';
    label.setAttribute('for', `A${i}`);
    div.appendChild(input);
    label.innerHTML += colA[i];
    div.appendChild(label);
    divA.appendChild(div);
  }
}

function genColB() {
  for (let i = 0; i < colB.length; i += 1) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    div.className = 'line';
    input.type = 'radio';
    input.id = `B${i}`;
    input.name = `line${i}`;
    input.required = true;
    input.hidden = true;
    input.addEventListener('click', selected)
    input.className = 'form-check-input';
    input.classList.add('colB');
    label.className = 'form-check-label';
    label.setAttribute('for', `B${i}`);
    div.appendChild(input);
    label.innerHTML += colB[i];
    div.appendChild(label);
    divB.appendChild(div);
  }
}

function genColC() {
  for (let i = 0; i < colC.length; i += 1) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    div.className = 'line';
    input.type = 'radio';
    input.id = `C${i}`;
    input.name = `line${i}`;
    input.required = true;
    input.hidden = true;
    input.addEventListener('click', selected)
    input.className = 'form-check-input';
    input.classList.add('colC');
    label.className = 'form-check-label';
    label.setAttribute('for', `C${i}`);
    div.appendChild(input);
    label.innerHTML += colC[i];
    div.appendChild(label);
    divC.appendChild(div);
  }
}

function genColD() {
  for (let i = 0; i < colD.length; i += 1) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    div.className = 'line';
    input.type = 'radio';
    input.id = `D${i}`;
    input.name = `line${i}`;
    input.required = true;
    input.hidden = true;
    input.addEventListener('click', selected)
    input.className = 'form-check-input';
    input.classList.add('colD');
    label.className = 'form-check-label';
    label.setAttribute('for', `D${i}`);
    div.appendChild(input);
    label.innerHTML += colD[i];
    div.appendChild(label);
    divD.appendChild(div);
  }
}

function result(e) {
  e.preventDefault();
  const checkedInputs = document.querySelectorAll('input:checked');
  if (checkedInputs.length !== 27) {
    return alert(`Erro: linhas em branco!\r\n\r\nPor favor selecione uma palavra em cada linha.`)
  }
  const resultColA = document.querySelectorAll('.colA:checked').length
  const resultColB = document.querySelectorAll('.colB:checked').length
  const resultColC = document.querySelectorAll('.colC:checked').length
  const resultColD = document.querySelectorAll('.colD:checked').length

  const colunas = [divA, divB, divC, divD];
  const resultado = [resultColA, resultColB, resultColC, resultColD];

  const resultLabels = document.querySelectorAll('.result')
  for (const i of resultLabels) {
    i.remove()
  }

  for (let i = 0; i < 4; i += 1) {
    const label = document.createElement('label')
    label.className = 'result'
    label.innerHTML = resultado[i];
    colunas[i].appendChild(label)
  }
}

genColA();
genColB();
genColC();
genColD();
btn.addEventListener('click', result)