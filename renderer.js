const { ipcRenderer } = require('electron');

document.getElementById('ad-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        subCategory: document.getElementById('sub-category').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        country: document.getElementById('country').value,
        cityArea: document.getElementById('cityArea').value,
        address: document.getElementById('address').value,
        websiteLink: document.getElementById('websiteLink').value,
        keywords: document.getElementById('keywords').value,
        phone: document.getElementById('phone').value
    };

    ipcRenderer.send('run-script', formData);
});

ipcRenderer.on('script-done', (event, message) => {
    alert(message);
});
