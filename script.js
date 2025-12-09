// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Function to handle CAR selection
function selectCar(carName) {
    scrollToForm();
    const carSelect = document.getElementById('carSelect');
    carSelect.value = carName;
    highlightField(carSelect);
}

// Function to handle PACKAGE selection
function selectPackage(packageName) {
    scrollToForm();
    const pkgSelect = document.getElementById('packageSelect');
    
    // Check if option exists, if not, add it (safety)
    let exists = false;
    for(let i=0; i<pkgSelect.options.length; i++){
        if(pkgSelect.options[i].value === packageName){
            pkgSelect.value = packageName;
            exists = true;
            break;
        }
    }
    if(!exists){
        const opt = document.createElement('option');
        opt.value = packageName;
        opt.innerHTML = packageName;
        pkgSelect.appendChild(opt);
        pkgSelect.value = packageName;
    }
    
    highlightField(pkgSelect);
}

// Helper: Scroll to form
function scrollToForm() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Helper: Visual highlight effect
function highlightField(element) {
    element.style.borderColor = '#FF8C00';
    element.style.boxShadow = '0 0 10px rgba(255, 140, 0, 0.3)';
    setTimeout(() => {
        element.style.borderColor = '#ddd';
        element.style.boxShadow = 'none';
    }, 2000);
}

// Handle Form Submit (WhatsApp Redirection)
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const pkg = document.getElementById('packageSelect').value;
    const car = document.getElementById('carSelect').value;
    const pax = document.getElementById('pax').value;

    // Create WhatsApp Message
    const text = `*New Booking Request*%0A%0A*Name:* ${name}%0A*Date:* ${date}%0A*Package:* ${pkg}%0A*Car:* ${car}%0A*Persons:* ${pax}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/917067568998?text=${text}`, '_blank');
});