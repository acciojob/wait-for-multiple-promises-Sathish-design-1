//your JS code here. If required.
function createPromise(promiseNumber) {
    return new Promise((resolve) => {
        const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ promiseNumber, time: time.toFixed(3) });
        }, time * 1000);
    });
}

// Function to update the table with the results
function updateTable(results) {
    const output = document.getElementById('output');
    // Clear the loading row
    output.innerHTML = '';

    // Calculate total time (longest promise time)
    const totalTime = Math.max(...results.map(result => parseFloat(result.time)));

    // Add rows for each promise
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>Promise ${result.promiseNumber}</td><td>${result.time}</td>`;
        output.appendChild(row);
    });

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    output.appendChild(totalRow);
}

// Main function to execute promises
async function executePromises() {
    const promises = [
        createPromise(1),
        createPromise(2),
        createPromise(3)
    ];

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    updateTable(results);
}

// Start the promise execution
executePromises();