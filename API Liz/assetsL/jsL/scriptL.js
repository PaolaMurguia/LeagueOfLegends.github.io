document.getElementById('addPasswordBtn').addEventListener('click', () => {
    showForm('addPasswordFormContainer');
});
document.getElementById('removePasswordBtn').addEventListener('click', () => {
    showForm('removePasswordFormContainer');
});
document.getElementById('mergePdfsBtn').addEventListener('click', () => {
    showForm('mergeFormContainer');
});

function showForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        if (form.id === formId) {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    });
}

function addToFileList(fileName, fileUrl) {
    const fileList = document.getElementById('fileList');
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = fileUrl;
    link.textContent = fileName;
    link.target = '_blank';
    listItem.appendChild(link);
    fileList.appendChild(listItem);
}

// Add Password to PDF
document.getElementById('addPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('fileToAddPassword');
    const passwordInput = document.getElementById('passwordToAdd');
    const algorithmSelect = document.getElementById('encryptionAlgorithm');

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('password', passwordInput.value);
    formData.append('encryption_algorithm', algorithmSelect.value);

    try {
        const response = await fetch('https://api.pdfblocks.com/v1/add_password', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            addToFileList('Protected PDF', url);
        } else {
            console.error('Error adding password:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Remove Password from PDF
document.getElementById('removePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('fileToRemovePassword');
    const currentPasswordInput = document.getElementById('currentPassword');

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('password', currentPasswordInput.value);

    try {
        const response = await fetch('https://api.pdfblocks.com/v1/remove_password', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            addToFileList('Unlocked PDF', url);
        } else {
            console.error('Error removing password:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Merge PDFs
document.getElementById('mergeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const filesInput = document.getElementById('filesToMerge');

    const formData = new FormData();
    for (let i = 0; i < filesInput.files.length; i++) {
        formData.append('files', filesInput.files[i]);
    }

    try {
        const response = await fetch('https://api.pdfblocks.com/v1/merge', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            addToFileList('Merged PDF', url);
        } else {
            console.error('Error merging PDFs:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
