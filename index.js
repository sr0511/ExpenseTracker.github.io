const bal = document.getElementById("balance");
const inc = document.getElementById("income");
const exp = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTranscation = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTranscation : [];

function addTrans(e) {
    e.preventDefault();
    if(
        text.value.trim() === "" || amount.value.trim() === ""
    ){
        alert("Please Enter Text OR Amount");
    }else{
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransaction(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

function generateId(){
    return Math.floor(Math.random()*100000000);
}

function addTransaction(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );
    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(
        transaction.amount
    )}</span><button class="delete-btn" onclick="removeTransaction(${
        transaction.id
    })">x</button>`;

    list.appendChild(item);
}

function removeTransaction(id) {
    transactions = transactions.filter(transactions => transactions.id !== id);
    updateLocalStorage();
    Init();
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0)* -1
    ).toFixed(2);

    bal.innerText = `$${total}`;
    inc.innerText = `$${income}`;
    exp.innerText = `$${expense}`;
}

function updateLocalStorage() {
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );
}

function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransaction);
    updateValues();
}

Init();

form.addEventListener("submit",addTrans);