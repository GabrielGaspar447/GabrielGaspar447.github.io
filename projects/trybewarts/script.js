const login = document.getElementById('login');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
const mobileLogin = document.getElementById('mobile-login');
const selectHouse = document.getElementById('house');
const rate = document.getElementById('rates');
const textArea = document.getElementById('textarea');
const charCounter = document.getElementById('counter');
const agree = document.getElementById('agreement');
const submitBtn = document.getElementById('submit-btn');
const firstName = document.getElementById('input-name');
const lastName = document.getElementById('input-lastname');
const email = document.getElementById('input-email');
const comment = document.getElementById('textarea');
const form = document.getElementById('evaluation-form');

function checkLogin(e) {
  e.preventDefault()
  if ((login.value === 'tryber@teste.com') && (password.value === '123456')) {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}

function houseOptions() {
  const houses = ['Gitnória', 'Reactpuff', 'Corvinode', 'Pytherina'];
  const housesIds = ['gitnoria-house', 'reactpuff-house', 'corvinode-house', 'pytherina-house'];

  for (let i = 0; i < houses.length; i += 1) {
    const option = document.createElement('option');
    option.innerHTML = houses[i];
    option.id = housesIds[i];
    selectHouse.appendChild(option);
  }
}

function createRates() {
  for (let i = 1; i < 11; i += 1) {
    const label = document.createElement('label');
    label.className = 'form-check-label';
    const rateBtn = document.createElement('input');
    rateBtn.className = 'form-check-input';
    rateBtn.type = 'radio';
    rateBtn.name = 'rate';
    rateBtn.value = i;
    label.innerHTML += `${i} `;
    label.appendChild(rateBtn);
    rate.appendChild(label);
  }
}

function counter() {
  const characters = textArea.value.length;
  charCounter.innerHTML = 500 - characters;
}

function enableSubmit() {
  if (agree.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

function req21Aux2(infos) {
  form.innerHTML = null;
  for (let i = 0; i < infos.length; i += 1) {
    const p = document.createElement('p');
    p.innerHTML = infos[i];
    form.appendChild(p);
  }
}

function req21Aux() {
  const subjects = document.querySelectorAll('.subject:checked');
  let subjString = subjects[0].value;
  if (subjects.length > 1) {
    for (let i = 1; i < subjects.length - 1; i += 1) {
      subjString += `, ${subjects[i].value}`;
    }
    subjString += `, ${subjects[subjects.length - 1].value}`;
  }
  return subjString;
}

function req21(e) {
  e.preventDefault();
  const infos = [];
  infos.push(`Nome: ${firstName.value} ${lastName.value}`);
  infos.push(`Email: ${email.value}`);
  infos.push(`Casa: ${selectHouse.value}`);
  infos.push(`Família: ${document.querySelector('input[name="family"]:checked').value}`);
  infos.push(`Matérias: ${req21Aux()}`);
  infos.push(`Avaliação: ${document.querySelector('input[name="rate"]:checked').value}`);
  infos.push(`Observações: ${comment.value}`);
  infos.push('Desenvolvido por Gabriel Gaspar — Trybe - Turma 13A');
  console.log(infos);
  req21Aux2(infos);
}

// Mobile login
const hide = 'hide-mobile-login';
function mobile() {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
    mobileLogin.classList.remove(hide);
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
    mobileLogin.classList.add(hide);
  }
}

const desktop = window.matchMedia('(min-width: 1001px)');
function hideMobileLogin() {
  if (desktop.matches) {
    menuBtn.classList.remove('open');
    menuOpen = false;
    mobileLogin.classList.add(hide);
  }
}

loginBtn.addEventListener('click', checkLogin);
menuBtn.addEventListener('click', mobile);
desktop.addEventListener('change', hideMobileLogin);
houseOptions();
createRates();
textArea.addEventListener('keyup', counter);
agree.addEventListener('change', enableSubmit);
submitBtn.addEventListener('click', req21);
