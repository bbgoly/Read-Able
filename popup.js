document.querySelector('.font-size-btn').addEventListener('click', function() {
    document.body.style.fontSize = '18px';
});

// Toggle High Contrast Mode
document.getElementById('high-contrast').addEventListener('change', function() {
    if (this.checked) {
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#FFF';
    } else {
        document.body.style.backgroundColor = '#FFF';
        document.body.style.color = '#000';
    }
});
