const balance = document.getElementById('balance');
const incomeText = document.getElementById('income');
const expenseText = document.getElementById('expense');
const amount = document.getElementById('amount');
const submit = document.getElementById('submit');
const form = document.getElementById('transactionForm');
const option = document.getElementById('option');
const list = document.getElementById('transactionList');

let budget = 0;
let income = 0;
let expense = 0;
let transList = JSON.parse(localStorage.getItem("trans")) || [];
let action = 'expense';
let currentId = 0;

function getBudget() {
  budget = 0;
  income = 0;
  expense = 0;
  console.log('budget')
  transList.forEach(el => {
    if (el.currentAction === 'income') {
      budget += Number (el.value);
      income += Number (el.value);
    } if ((el.currentAction === 'expense')) {
      budget -= Number (el.value);
      expense -= Number (el.value);
    }
  });

  balance.innerHTML = '$' + budget;
  incomeText.innerHTML = '$' + income;
  expenseText.innerHTML = '$' + expense;
  saveDate();
}

renderList();

function checkAction(el) {
  action = action === 'expense' ? 'income' : 'expense';
  console.log(action)
}

function getAction(event) {
  const currentAction = action;
  event.preventDefault();
  const value = parseInt(amount.value);
  const name = document.getElementById('name').value;

  getTransactions(value, currentAction, name);
}

function getTransactions(value, currentAction, name) {
  transList.push(
    {
      "id" : currentId,
      "name" : name,
      "value" : value,
      "currentAction" : currentAction
    }
  )
  currentId++;
  renderList();
}

function renderList() {
  list.innerHTML = '';
  transList.forEach(el => {
    const id = el.id;
    const name = el.name;
    const value = el.value;
    const currentAction = el.currentAction;

    const li = document.createElement('li');
    li.setAttribute('id', id);
    li.innerHTML = `
    <div class="name">
      <h4>${name}</h4>
      <p>${new Date().toLocaleDateString()}</p>
    </div>

    <div class="amount ${currentAction}">
      <span>${value}</span>
    </div>

    <div class="action">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(this)">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    `;
    list.appendChild(li)
    });
  getBudget();
}

function deleteTransaction(btn) {
  const item = btn.closest('li');
  
  const targetId = Number (item.getAttribute('id'));

  for (let i = 0; i < transList.length; i++) {
    if (transList[i].id === targetId) {
      transList.splice(i, 1);
      renderList();
    }
  }
  console.log(transList)
}

function saveDate() {
  localStorage.setItem("trans", JSON.stringify(transList));
}

form.addEventListener('submit', getAction);
