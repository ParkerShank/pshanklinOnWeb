const cashRegister = {
    total: 0,
    itemCount: 0,

    add: function(totalCost) {
        this.total += totalCost;
        this.itemCount++;
        return this.total;
    },
    reset: function() {
        this.total = 0;
        this.itemCount = 0;
    }

}

function scan() {
    let itemCountInput = document.getElementById("itemCount").value;
    cashRegister.itemCount = parseInt(itemCountInput);
    console.log(cashRegister.itemCount);
    let ul = document.getElementById("itemList");
    let scanButton = document.getElementById("scan");
    scanButton.disabled = true; // Disable button during scanning
    for (let i = 0; i < cashRegister.itemCount; i++) {
        let itemCost = prompt("Enter the cost of item " + (i + 1) + ":");
        if (itemCost === null) break; // Stop if user cancels
        cashRegister.add(parseFloat(itemCost));
        let li = document.createElement("li");
        li.textContent = "Item " + (i + 1) + ": $" + itemCost;
        ul.appendChild(li);
    }
    scanButton.disabled = false; // Re-enable button after scanning
}

function printTotal() {
    let totalDisplay = document.getElementById("total");
    totalDisplay.textContent = "Total: $" + cashRegister.total.toFixed(2);

}
function resetAll() {
    cashRegister.reset();
    let ul = document.getElementById("itemList");
    ul.innerHTML = "";
    let totalDisplay = document.getElementById("total");
    totalDisplay.textContent = "Total: $0.00";
}
let scanButton = document.getElementById("scan");
scanButton.addEventListener("click", scan);
let totalButton = document.getElementById("show");
totalButton.addEventListener("click", printTotal);
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetAll);