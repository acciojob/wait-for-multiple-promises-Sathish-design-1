const tbody = document.getElementById("output");

function createRandomPromise(index) {
    const time = (Math.random() * 2 + 1);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ index, time });
        }, time * 1000);
    });
}

// Create the 3 promises
const p1 = createRandomPromise(1);
const p2 = createRandomPromise(2);
const p3 = createRandomPromise(3);

const startTime = performance.now();

Promise.all([p1, p2, p3]).then(results => {
    // Remove "Loading..." row
    tbody.innerHTML = "";

    // Add each promise row
    results.forEach(result => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = `Promise ${result.index}`;

        const timeCell = document.createElement("td");
        timeCell.textContent = result.time.toFixed(3);

        row.appendChild(nameCell);
        row.appendChild(timeCell);
        tbody.appendChild(row);
    });

    // Total row (max time)
    const totalTime = Math.max(...results.map(r => r.time));

    const totalRow = document.createElement("tr");

    const totalCell1 = document.createElement("td");
    totalCell1.textContent = "Total";

    const totalCell2 = document.createElement("td");
    totalCell2.textContent = totalTime.toFixed(3);

    totalRow.appendChild(totalCell1);
    totalRow.appendChild(totalCell2);
    tbody.appendChild(totalRow);
});