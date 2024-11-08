// Get references to form elements and list
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const uploadedFilesList = document.getElementById('uploadedFilesList');
const fileContentDiv = document.getElementById('fileContent');

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    fileInfo.textContent = `Uploaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;

    // Add file name in sidebar
    const listItem = document.createElement('li');
    listItem.classList.add('file-item');
    listItem.innerHTML = `
      <button class="btn btn-link" onclick="viewFile('${file.name}', this)">
        ${file.name}
      </button>
      <button class="btn btn-link text-danger" onclick="deleteFile(this)">
        <i class="fas fa-trash" title="Delete File"></i>
      </button>
    `;
    uploadedFilesList.appendChild(listItem);
  } else {
    fileInfo.textContent = 'No file selected';
  }
});

function deleteFile(button) {
  const listItem = button.closest('li');
  if (confirm('Are you sure you want to delete this file?')) {
    listItem.remove();
    fileContentDiv.style.display = 'none';
  }
}

function viewFile(fileName, button) {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const html = XLSX.utils.sheet_to_html(firstSheet);
      fileContentDiv.innerHTML = html;
      fileContentDiv.style.display = 'block';
    };
    reader.readAsArrayBuffer(file);
  }
}
