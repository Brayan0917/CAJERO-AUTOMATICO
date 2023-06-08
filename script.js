var cuentas = [
    { nombre: "1", saldo: 200 },
    { nombre: "2", saldo: 290 },
    { nombre: "3", saldo: 67 }
  ];

  function showAlert(message, type) {
    var alertasContainer = document.getElementById("alertasContainer");
    var alertElement = document.createElement("div");
    alertElement.className = "alert " + type;
    alertElement.textContent = message;
    alertasContainer.appendChild(alertElement);
    
 
    setTimeout(function() {
      alertElement.remove();
    }, 3000);
  }
  
  var selectedAccount = null;
  
  function login() {
    var cuentaIndex = document.getElementById("cuentasDropdown").value;
    var password = document.getElementById("passwordInput").value;
  
    if (cuentaIndex >= 0 && cuentaIndex < cuentas.length) {
      var cuenta = cuentas[cuentaIndex];
  
      if (password === cuenta.nombre) {
        selectedAccount = cuenta;
        document.getElementById("login").style.display = "none";
        document.getElementById("operations").style.display = "block";
        document.getElementById("accountName").textContent = "Cuenta: " + cuenta.nombre;
        document.getElementById("balanceContainer").style.display = "none";      
    
      } else {
        showAlert("Contraseña incorrecta. Por favor, intenta nuevamente.", "error");
      }
    }
  }
  
  function checkBalance() {
    var saldoActual = selectedAccount.saldo;
    document.getElementById("balance").textContent = "Saldo actual: $" + saldoActual;
    document.getElementById("balanceContainer").style.display = "block";
  }
  
  function deposit() {
    document.getElementById("transactionForm").style.display = "block";
    document.getElementById("transactionForm").classList.add("deposit");
    document.getElementById("transactionForm").classList.remove("withdraw");
    document.getElementById("balanceContainer").style.display = "none";
  }
  
  function withdraw() {
    document.getElementById("transactionForm").style.display = "block";
    document.getElementById("transactionForm").classList.add("withdraw");
    document.getElementById("transactionForm").classList.remove("deposit");
    document.getElementById("balanceContainer").style.display = "none";
  }
  
  function processTransaction() {
    var transactionAmount = parseFloat(document.getElementById("transactionAmount").value);
  
    if (!isNaN(transactionAmount)) {
      var saldoActual = selectedAccount.saldo;
  
      if (transactionAmount > 0) {
        var newBalance;
        var isDeposit = document.getElementById("transactionForm").classList.contains("deposit");
  
        if (isDeposit) {
          newBalance = saldoActual + transactionAmount;
          if (newBalance > 990) {
            showAlert("La cuenta no puede tener más de $990. Por favor, ingresa un monto válido.", "error");
            return;
          }
          showAlert("Depósito Exitoso. Monto depositado: $" + transactionAmount + ", Saldo actual: $" + newBalance, "success");
        } else {
          if (transactionAmount > saldoActual) {
            showAlert("El monto supera el saldo disponible en la cuenta.", "error");
            return;
          }
          newBalance = saldoActual - transactionAmount;
          if (newBalance < 10) {
            showAlert("La cuenta no puede tener menos de $10. Por favor, ingresa un monto válido.", "error");
            return;
          }
          showAlert("Retiro Exitoso. Monto retirado: $" + transactionAmount + ", Saldo actual: $" + newBalance, "success");
        }
  
        selectedAccount.saldo = newBalance;
        document.getElementById("balance").textContent = "Saldo actual: $" + newBalance;
        document.getElementById("transactionAmount").value = "";
        document.getElementById("transactionForm").style.display = "none";
      } else {
        showAlert("El monto ingresado debe ser mayor a cero.", "error");
      }
    } else {
      showAlert("Por favor, ingresa un monto válido.", "error");
    }
  }
   
  function logout() {
    selectedAccount = null;
    document.getElementById("operations").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("passwordInput").value = "";
    document.getElementById("loginMessage").textContent = "";
    document.getElementById("transactionForm").style.display = "none";
    document.getElementById("transactionAmount").value = "";
  }
  