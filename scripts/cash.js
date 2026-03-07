// Cash Register Script
// This script manages a simple cash register system where users can input item costs, calculate totals, and reset the register.
// Parker Shanklin, 03/07/2026
const cashRegister = {
    total: 0,
    itemCount: 0,
    // Adds the cost of an item to the total 
    add: function(totalCost) {
        this.total += totalCost;
        this.itemCount++;
        return this.total;
    },
    // Resets the total and item count to zero
    reset: function() {
        this.total = 0;
        this.itemCount = 0;
    }

}
// Scans items by prompting the user for the number of items and their costs, then updates the total and item list.

function scan() {
    // Get the item count from the input field and validate it
    let itemCountInput = document.getElementById("itemCount").value;
    let itemCount = parseInt(itemCountInput);
    // Validate item count input
    if (isNaN(itemCount) || itemCount <= 0) {
        alert("Please enter a valid positive number for the item count.");
        return;
    }
    if (itemCount > 100) {
        alert("Item count is too high. Please enter a number less than or equal to 100.");
        return;
    }
    // Clear previous items from the list
    let ul = document.getElementById("itemList");
    // Loop through the number of items and prompt for their costs
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
// Displays the total cost in the designated area on the webpage.
function printTotal() {
    // Format the total to two decimal places and display it
    let totalDisplay = document.getElementById("total");
    totalDisplay.textContent = "Total: $" + cashRegister.total.toFixed(2);

}
// Resets the cash register and clears the item list and total display on the webpage.
function resetAll() {
    // Reset the cash register's total and item count
    cashRegister.reset();
    let ul = document.getElementById("itemList");
    ul.innerHTML = "";
    let totalDisplay = document.getElementById("total");
    totalDisplay.textContent = "Total: ";
}
// Set up event listeners for the buttons to trigger the appropriate functions when clicked.
let scanButton = document.getElementById("scan");
scanButton.addEventListener("click", scan);
let totalButton = document.getElementById("show");
totalButton.addEventListener("click", printTotal);
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetAll);