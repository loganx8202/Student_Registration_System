const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById('tableBody');
let students = JSON.parse(localStorage.getItem('students')) || [];

// Input validation function
function validateInputs(name, id, email, contact) {
  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    name && nameRegex.test(name) &&
    id && !isNaN(id) &&
    contact && !isNaN(contact) &&
    email && emailRegex.test(email)
  );
}

// Render all student rows
function renderTable() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = `<tr>
  <td class="py-2 px-4">${student.name}</td>
  <td class="py-2 px-4">${student.id}</td>
  <td class="py-2 px-4">${student.email}</td>
  <td class="py-2 px-4">${student.contact}</td>
  <td class="py-2 px-4 text-center">
    <button onclick="editStudent(${index})"
      class="bg-green-400 text-white px-2 py-1 rounded shadow hover:shadow-md hover:bg-green-500 transition">
      Edit
    </button>
    <button onclick="deleteStudent(${index})"
      class="bg-red-500 text-white px-2 py-1 rounded shadow hover:shadow-md hover:bg-red-600 transition ml-2">
      Delete
    </button>
  </td>
</tr>`;
    tableBody.innerHTML += row;
  });
}

// Add/Edit Student
studentForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('studentId').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!validateInputs(name, id, email, contact)) {
    alert('Please enter valid data in all fields.');
    return;
  }

  const editingIndex = studentForm.dataset.editIndex;
  if (editingIndex !== undefined) {
    students[editingIndex] = { name, id, email, contact };
    delete studentForm.dataset.editIndex;
  } else {
    students.push({ name, id, email, contact });
  }

  localStorage.setItem('students', JSON.stringify(students));
  studentForm.reset();
  renderTable();
});

// Edit student
function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('studentId').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;
  studentForm.dataset.editIndex = index;
}

// Delete student
function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
  }
}

// Initial render
window.onload = renderTable;
