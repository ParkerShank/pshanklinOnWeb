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
    let itemCount = parseInt(itemCountInput);

    if (isNaN(itemCount) || itemCount <= 0) {
        alert("Please enter a valid positive number for the item count.");
        return;
    }
    if (itemCount > 100) {
        alert("Item count is too high. Please enter a number less than or equal to 100.");
        return;
    }

    let ul = document.getElementById("itemList");

    for (let i = 0; i < itemCount; i++) {
        let itemCost;

        // Re-prompt until valid input or cancellation
        while (true) {
            itemCost = prompt(`Enter the cost of item ${i + 1}:`);
            if (itemCost === null) {
                alert("Scan cancelled.");
                return; // Exit entirely on cancel
            }
            let cost = parseFloat(itemCost);
            if (!isNaN(cost) && cost >= 0) {
                cashRegister.add(cost);
                let li = document.createElement("li");
                li.textContent = `Item ${i + 1}: $${cost.toFixed(2)}`;
                ul.appendChild(li);
                break; // Valid input — move to next item
            }
            alert(`Invalid cost for item ${i + 1}. Please enter a valid number.`);
        }
    }
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