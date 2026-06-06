const TrackerForm = document.querySelector("form")
let TransactionDesc = document.getElementById("description")
let TransactionAmount = document.getElementById("amount")
let TransactionOption = document.querySelector("select")
let TransactionList = document.querySelector(".transactions")
let IncomePara = document.getElementById("income")
let ExpensePara = document.getElementById("expenses")
let BalancePara = document.getElementById("balance")
let Transactions =JSON.parse(localStorage.getItem("Transactions")) || []
let SubmitBtn = document.getElementById("submit")
let IDselected;
function DisplayTransactions() {
    TransactionList.innerHTML = ""

    let income = 0
    let expense = 0
    for (const transaction of Transactions) {
        const html = `<li 
          class="transaction" id = ${transaction.id}><span class ="transaction-text">${transaction.Description}</span>: <span class = "transaction-number">${transaction.Amount}</span> RWF
          <button class = "update"> Edit </button>
          <button class = "delete"> Delete </button>
                     </li>`
        TransactionList.insertAdjacentHTML("beforeend", html)
        if (transaction.TransactionType === "Income") {
            income += transaction.Amount
        } else {
            expense += transaction.Amount
           
        }
    }
    IncomePara.textContent = `Income: ${income} RWF,`
    ExpensePara.textContent = `Expenses: ${expense} RWF,`
    let balance = income - expense
    BalancePara.textContent = `Balance: ${balance} RWF`
}
DisplayTransactions()
TrackerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (TransactionDesc.value === "" || TransactionAmount.value === "") {
        alert("Please Add A Transaction!")
        return;
    }
    if (!IDselected) {
     Transactions.push({id: Date.now(), Description: TransactionDesc.value.trim(), Amount: Number(TransactionAmount.value), TransactionType: TransactionOption.value})
    console.log(Transactions);
    } else {
      Transactions = Transactions.map( trans => {
        if (trans.id === IDselected) {
        return   { ...trans, Description: TransactionDesc.value, Amount: Number(TransactionAmount.value), TransactionType: TransactionOption.value}
        } else {
            return trans
        }
      })
    }
    SubmitBtn.textContent = "Submit"
    IDselected = undefined;
    localStorage.setItem("Transactions", JSON.stringify(Transactions))
    
    DisplayTransactions()
    TransactionDesc.value = ''
    TransactionAmount.value = ''
})
TransactionList.addEventListener("click", (event) => {
    const list = event.target.closest(".transaction")
    if (!list || !event.target.classList.contains("delete")) {
        return; 
    } 
    let transactionId = +list.getAttribute("id")
    Transactions = Transactions.filter( item => item.id !== transactionId)
    localStorage.setItem("Transactions", JSON.stringify(Transactions))
    list.remove()
    DisplayTransactions()
})
TransactionList.addEventListener("click", (event) => {
    const list = event.target.closest(".transaction")

    if (!list || !event.target.classList.contains("update")) {
        return;
    }

    const transactionId = +list.getAttribute("id")

    const transaction = Transactions.find(
        item => item.id === transactionId
    )

    TransactionDesc.value = transaction.Description
    TransactionAmount.value = transaction.Amount
    TransactionOption.value = transaction.TransactionType

    SubmitBtn.textContent = "Update"
    IDselected = transactionId
})