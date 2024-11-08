// Hide flash message after 3 seconds
setTimeout(function() {
    const flashMessage = document.getElementById('flashMessage');
    if (flashMessage) {
      flashMessage.style.display = 'none';
    }
  }, 3000);
  
  // Display selected file name
  document.getElementById('fileInput').addEventListener('change', function() {
    const fileInfo = document.getElementById('fileInfo');
    const fileName = this.files[0] ? this.files[0].name : '';
    fileInfo.textContent = `Selected file: ${fileName}`;
  });
  