// script.js
document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const sapId = document.getElementById('sapId').value;

    // Validate SAP ID length
    if (sapId.length > 9) {
        alert('SAP ID cannot be greater than 9 characters.');
        return; // Stop form submission
    }

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        sapId: sapId,
        reason: document.getElementById('reason').value,
        semester: document.getElementById('semester').value
    };

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('SAP ID already exists. Please use a different SAP ID.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
    });
});