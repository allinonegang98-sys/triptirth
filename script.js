// Mobile Menu Toggle

const hamburger document.querySelector('.hamburger'); const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {

navLinks.classList.toggle('active'); });

// Close menu when clicking a link document.querySelectorAll('.nav-links a').forEach(link => { link.addEventListener('click', () => {

navLinks.classList.remove('active'); }); });

// Function to handle CAR selection function selectCar (carName) { scrollToForm(); const carSelect = document.getElementById('carSelect'); carSelect.value = carName; highlightField(carSelect); }

// Function to handle PACKAGE selection function selectPackage (packageName) { scrollToForm(); const pkgSelect document.getElem entById('packageSelect');

// Check if option exists, if not,

add it (safety) let exists = false; for(let i=0; i<pkgSelect.options.length; i++){ === packageName) { if(pkgSelect.options[i].value pkgSelect.value

packageName;

exists true; break; }

} if(!exists){

const opt =

document.createElement('option');

opt.value packageName; opt.innerHTML packageName; pkgSelect.appendChild(opt); pkgSelect.value = packageName; }

}

highlightField(pkgSelect);

function scrollToForm() { // Helper: Scroll to form document.getElementById('cont act').scrollIntoView({behavior: 'smooth' }); }

// Helper: Visual highlight effect function highlightField(element) { element.style.borderColor = '#FF8C00'; element.style.boxShadow = '00 10px rgba(255, 140, 0, 0.3)'; setTimeout(() => {

element.style.borderColor = '#ddd';

element.style.boxShadow =

'none';

}, 2000);

}

// Handle Form Submit (WhatsApp Redirection) document.getElementById('bookingF orm').addEventListener('submit', function(e) { e.preventDefault();

const name = document.getElementById('name').value; const date =

document.getElementById('date').value; const pkg= document.getElementByI d('packageSelect').value; const car document.getElementByI d('carSelect').value; const pax =

document.getElementById('pax').value;

// Create WhatsApp Message Request*%0A%0A*Name:* ${name} const text = *New Booking %0A*Date:* ${date}%0A*Package:* ${pkg} %0A*Car:* ${car}%0A*Persons:* ${pax}'; // Open WhatsApp

window.open('https://wa.me /917067568998?text=${text}", 'blank'); });
