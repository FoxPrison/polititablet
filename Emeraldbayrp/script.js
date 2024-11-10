// Hent eksisterende ansatte fra localStorage (hvis nogen)
let employees = JSON.parse(localStorage.getItem('employees')) || [
    { pNumber: "1001", password: "adminpass", rank: "Rigspolitichef", name: "Ail Jensen" },
    { pNumber: "1002", password: "trainerpass", rank: "Træner", name: "Trine Madsen" }
];

// Login funktion til at autentificere brugere
function login() {
    const pNumber = document.getElementById("pNumber").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Find brugeren baseret på P-nummer og adgangskode
    const user = employees.find(emp => emp.pNumber === pNumber && emp.password === password);

    if (user) {
        errorMessage.textContent = ""; // Tøm fejlmeddelelse
        showAdminPanel(user); // Vis admin panel for den rette bruger
    } else {
        errorMessage.textContent = "Login fejlede. Prøv igen."; // Fejlmeddelelse ved forkert login
    }
}

// Vis admin-panel og opret ansat-formular baseret på brugerens rang
function showAdminPanel(user) {
    document.getElementById("loginContainer").classList.add("hidden"); // Skjul login-formularen
    const adminPanel = document.getElementById("adminPanel");
    adminPanel.classList.remove("hidden"); // Vis admin-panel

    // Vis listen over ansatte
    updateEmployeeList();

    // Kun Rigspolitichef og Træner skal kunne oprette ansat
    if (user.rank === "Rigspolitichef" || user.rank === "Træner") {
        document.getElementById("createEmployeeForm").classList.remove("hidden"); // Vis opret ansat formular
    } else {
        document.getElementById("createEmployeeForm").classList.add("hidden"); // Skjul opret ansat formular for andre brugere
    }
}

// Opdater listen over ansatte
function updateEmployeeList() {
    const employeeList = document.getElementById("employeeList");
    employeeList.innerHTML = ""; // Ryd eksisterende liste

    employees.forEach(employee => {
        const listItem = document.createElement("li");
        listItem.textContent = `${employee.name} - ${employee.rank} - P-nummer: ${employee.pNumber}`;
        employeeList.appendChild(listItem);
    });
}

// Funktion til at oprette en ny ansat
function createEmployee() {
    const newName = document.getElementById("newName").value;
    const newPNumber = document.getElementById("newPNumber").value;
    const newPassword = document.getElementById("newPassword").value;
    const newRank = document.getElementById("newRank").value;

    // Check om alle felter er udfyldt
    if (!newName || !newPNumber || !newPassword || !newRank) {
        alert("Alle felter skal udfyldes.");
        return;
    }

    // Tilføj den nye ansat til listen
    employees.push({
        pNumber: newPNumber,
        password: newPassword,
        rank: newRank,
        name: newName
    });

    // Opdater listen og gem data i localStorage
    updateEmployeeList();
    localStorage.setItem('employees', JSON.stringify(employees));

    // Ryd formularen
    document.getElementById("newName").value = "";
    document.getElementById("newPNumber").value = "";
    document.getElementById("newPassword").value = "";
}

// Log ud funktion
function logout() {
    // Skjul admin-panel og vis login-formularen igen
    document.getElementById("adminPanel").classList.add("hidden");
    document.getElementById("loginContainer").classList.remove("hidden");

    // Ryd login-formularens data
    document.getElementById("loginForm").reset();
}
