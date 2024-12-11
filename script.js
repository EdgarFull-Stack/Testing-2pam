const apiUrl = "https://testapi.io/api/EdgarFull-Stack/resource/UsersList";
const tableBody = document.querySelector("#userTable tbody");

// Fetch users
const getAndRenderUsers = () => {
  tableBody.innerHTML = "";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      renderUsers(data.data);
    });
};

// Render users
const renderUsers = (users) => {
  users.forEach((user) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = user.Name;
    row.appendChild(nameCell);
    tableBody.appendChild(row);
  });
};

// Add new user
const addUser = (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#firstName").value;

  const newUser = {
    Name: firstName,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((response) => response && getAndRenderUsers());

  document.querySelector("#userForm").reset();
};

// AI paleidimas (visada negaliu dasivesti pats)
document.addEventListener("DOMContentLoaded", () => {
  getAndRenderUsers();

  const form = document.querySelector("#userForm");
  form.addEventListener("submit", addUser);
});
