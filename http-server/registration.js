let registrationForm = document.getElementById("registration-form");
const dateOfBirthInput = document.getElementById('dob');

dateOfBirthInput.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        dateOfBirthInput.setCustomValidity('Please enter a valid date of birth between ages 18 and 55.');
    } else {
        dateOfBirthInput.setCustomValidity('');
    }
});

const getUserEntries = () => {
    let entries = localStorage.getItem("user-entries");
    entries = entries ? JSON.parse(entries) : [];
    return entries;
}

let userData = getUserEntries();

const showUserEntries = () => {
    const entries = getUserEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.nm}</td>`;
        const emailCell = `<td>${entry.eml}</td>`;
        const passwordCell = `<td>${entry.pas}</td>`;
        const dobCell = `<td>${entry.db}</td>`;
        const acceptTermsCell = `<td>${entry.ch}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table =
        `<table class="table-auto w-full">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Date of Birth</th>
                <th>Accepted Terms?</th>
            </tr>${tableEntries}
        </table>`;

    let userEntriesTable = document.getElementById("user-entries");
    userEntriesTable.innerHTML = table;
}

const saveFormData = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dateOfBirth = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;
    const entry = {
        nm: name,
        eml: email,
        pas: password,
        db: dateOfBirth,
        ch: acceptTerms
    };
    userData.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userData));
    showUserEntries();
}

registrationForm.addEventListener("submit", saveFormData);

showUserEntries();
