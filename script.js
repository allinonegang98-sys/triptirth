// Initialize Animations (Premium Settings)
if(typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1200,      // Slower animation for luxury feel
        easing: 'ease-out-quart', // Smoother curve (starts fast, ends slow)
        once: true,          // Animate only once per scroll
        offset: 50           // Trigger slightly earlier
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks) navLinks.classList.remove('active');
    });
});

// --- NEW FEATURE: HINDI/ENGLISH TOGGLE ---
const langBtn = document.getElementById('langToggle');
let isHindi = false;

if(langBtn) {
    langBtn.addEventListener('click', () => {
        const enElements = document.querySelectorAll('.lang-en');
        const hiElements = document.querySelectorAll('.lang-hi');
        
        isHindi = !isHindi; // Toggle state

        if(isHindi) {
            enElements.forEach(el => el.classList.add('hidden'));
            hiElements.forEach(el => el.classList.remove('hidden'));
            langBtn.innerText = "English / हिंदी";
        } else {
            enElements.forEach(el => el.classList.remove('hidden'));
            hiElements.forEach(el => el.classList.add('hidden'));
            langBtn.innerText = "हिंदी / English";
        }
    });
}

// --- NEW FEATURE: DYNAMIC PRICE ESTIMATOR (MORE PERSONS = LESS PRICE) ---
const priceTable = {
    2: 3750,
    3: 3150,
    4: 2850,
    5: 2600,
    6: 2300,
    7: 2100
};

function calculateTripCost() {
    const paxInput = document.getElementById('estPax');
    const perPersonDisplay = document.getElementById('estPerPerson');
    const totalDisplay = document.getElementById('estTotal');
    
    if(!paxInput) return;
    
    let pax = parseInt(paxInput.value);
    
    if (pax && pax >= 2) {
        // Determine rate: If pax > 7, use the rate for 7 (2100) or lower logic
        let rate = priceTable[pax] || (pax > 7 ? 2100 : 3750); 
        
        let total = rate * pax;

        perPersonDisplay.innerText = "₹" + rate.toLocaleString();
        totalDisplay.innerText = "₹" + total.toLocaleString();
    } else {
        perPersonDisplay.innerText = "₹0";
        totalDisplay.innerText = "₹0";
    }
}

// --- NEW FEATURE: LIGHTBOX (Gallery Popup) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

if(lightbox) {
    document.querySelectorAll('.gallery-trigger').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

// Function to handle CAR selection (Home Page)
function selectCar(carName) {
    const carSelect = document.getElementById('carSelect');
    if(carSelect) {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        carSelect.value = carName;
        // Simple highlight effect
        carSelect.style.borderColor = '#FF8C00';
        setTimeout(() => { carSelect.style.borderColor = '#ddd'; }, 2000);
    }
}

// Handle Form Submit (Home Page)
const homeForm = document.getElementById('bookingForm');
if(homeForm) {
    homeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const pkg = document.getElementById('packageSelect').value;
        const car = document.getElementById('carSelect').value;
        const pax = document.getElementById('pax').value;
        const text = `*New Booking Request*%0A%0A*Name:* ${name}%0A*Date:* ${date}%0A*Package:* ${pkg}%0A*Car:* ${car}%0A*Persons:* ${pax}`;
        window.open(`https://wa.me/917067568998?text=${text}`, '_blank');
    });
}

// --- PACKAGE DATA & DETAIL PAGE LOGIC (PRESERVED) ---
const packagesDB = {
    'malwa': {
        title: "Magical Malwa Tour",
        subtitle: "Ujjain • Omkareshwar • Maheshwar • Mandu",
        duration: "4 Nights / 5 Days",
        locations: "4 Cities",
        image: "images/pics/malwa.png",
        price: "12,500",
        description: "Embark on a complete spiritual and historical journey through the heart of Madhya Pradesh.",
        timeline: [
            { day: 1, title: "Arrival in Indore & Ujjain", desc: "Pick up from Indore Airport/Station. Drive to Ujjain. Check-in. Evening Mahakal Aarti." },
            { day: 2, title: "Ujjain Darshan", desc: "Mahakaleshwar, Kal Bhairav, Harsiddhi, Ramghat, Sandipani Ashram. Overnight in Ujjain." },
            { day: 3, title: "Omkareshwar & Maheshwar", desc: "Drive to Omkareshwar for Darshan. Proceed to Maheshwar. Visit Fort and Narmada Ghat. Overnight stay." },
            { day: 4, title: "Mandu Sightseeing", desc: "Visit Jahaz Mahal, Hindola Mahal, and Roopmati Pavilion. Experience the history of Malwa." },
            { day: 5, title: "Departure", desc: "Drop back to Indore Airport/Station with beautiful memories." }
        ],
        inclusions: ["Breakfast & Dinner", "AC Private Cab", "3-Star Hotel Stay", "Toll & Parking"]
    },
    'mandu': {
        title: "Mandu: City of Joy",
        subtitle: "Heritage Tour of Mandav",
        duration: "2 Nights / 3 Days",
        locations: "Mandu",
        image: "images/pics/mandu.jpg",
        price: "8,500",
        description: "Explore the romantic ruins of Mandu, known for the legendary love story of Baz Bahadur and Rani Roopmati.",
        timeline: [
            { day: 1, title: "Arrival & Mandu Drive", desc: "Pick up from Indore. Drive to Mandu (approx 2 hrs). Check-in and relax." },
            { day: 2, title: "Full Day Sightseeing", desc: "Visit Jahaz Mahal, Hindola Mahal, Jami Masjid, Hoshang Shah's Tomb, and Roopmati Pavilion." },
            { day: 3, title: "Return", desc: "Morning breakfast and drive back to Indore for departure." }
        ],
        inclusions: ["Breakfast", "AC Cab", "Heritage Property Stay", "Guide Service"]
    },
    'pachmarhi': {
        title: "Pachmarhi: Queen of Satpura",
        subtitle: "Hill Station Retreat",
        duration: "2 Nights / 3 Days",
        locations: "Pachmarhi",
        image: "images/pics/pachmarhi.jpg",
        price: "9,500",
        description: "Escape to the only hill station of MP. Lush greenery, waterfalls, and ancient caves await you.",
        timeline: [
            { day: 1, title: "Arrival & Transfer", desc: "Pick up from Pipariya/Bhopal. Transfer to Pachmarhi. Evening at Jata Shankar." },
            { day: 2, title: "Nature Tour", desc: "Bee Falls, Pandav Caves, Reechgarh, and sunset at Dhoopgarh." },
            { day: 3, title: "Departure", desc: "Visit Handi Khoh and drive back for departure." }
        ],
        inclusions: ["Breakfast & Dinner", "Gypsy for Local Sightseeing", "Hotel Stay", "Forest Entry"]
    },
    'jyotirlinga': {
        title: "Mahakal & Omkareshwar",
        subtitle: "The Sacred Jyotirlinga Yatra",
        duration: "2 Nights / 3 Days",
        locations: "Ujjain & Omkareshwar",
        image: "images/pics/mahakal&omkareshwer.jpg",
        price: "6,500",
        description: "The most popular pilgrimage tour covering two Jyotirlingas. Includes assistance for Bhasma Aarti booking (subject to availability).",
        timeline: [
            { day: 1, title: "Ujjain Arrival", desc: "Pick up and Hotel Check-in. Evening visit to Mahakal Lok and Harsiddhi Temple." },
            { day: 2, title: "Mahakal & Omkareshwar", desc: "Early morning Mahakal Darshan. Drive to Omkareshwar. Darshan and return to Ujjain." },
            { day: 3, title: "Local Ujjain & Drop", desc: "Kal Bhairav, Mangalnath. Drop at Railway Station." }
        ],
        inclusions: ["Breakfast", "AC Cab", "Hotel Stay", "Darshan Assistance"]
    },
    'baglamukhi': {
        title: "Mystical Baglamukhi",
        subtitle: "Nalkheda & Agar Malwa",
        duration: "1 Night / 1 Day",
        locations: "Nalkheda",
        image: "images/pics/bagalamukhi.jpg",
        price: "4,500",
        description: "A focused spiritual trip to Ma Baglamukhi Temple, Nalkheda. Ideal for devotees wishing to perform special Havan and Pujas.",
        timeline: [
            { day: 1, title: "Ujjain to Nalkheda", desc: "Morning drive to Nalkheda (approx 2.5 hrs). Darshan and Havan." },
            { day: 1, title: "Return", desc: "Return to Ujjain by evening. Drop at Hotel/Station." }
        ],
        inclusions: ["AC Cab", "Puja Samagri Assistance", "Refreshments"]
    },
    'ujjain': {
        title: "Exclusive Ujjain Darshan",
        subtitle: "City of Temples",
        duration: "1 Night / 2 Days",
        locations: "Ujjain City",
        image: "images/pics/ujjain.webp",
        price: "3,500",
        description: "Comprehensive tour of Ujjain city. Experience the spiritual vibration of the Mahakal Corridor and ancient temples.",
        timeline: [
            { day: 1, title: "Arrival", desc: "Check-in. Visit Mahakal Lok corridor in the evening. Ramghat Aarti." },
            { day: 2, title: "Temple Run", desc: "Mahakaleshwar, Harsiddhi, Kal Bhairav, Gadhkalika, Mangalnath, Sandipani Ashram. Drop." }
        ],
        inclusions: ["Breakfast", "AC Cab", "Hotel Stay", "Local Guide"]
    }
};

function loadPackageDetails() {
    const params = new URLSearchParams(window.location.search);
    const pkgId = params.get('id');
    const data = packagesDB[pkgId];

    if (data) {
        if(document.getElementById('pkg-title')) {
            document.getElementById('pkg-title').textContent = data.title;
            document.getElementById('pkg-subtitle').textContent = data.subtitle;
            document.getElementById('pkg-duration').textContent = data.duration;
            document.getElementById('pkg-hero').style.backgroundImage = `url('${data.image}')`;
            document.getElementById('pkg-price').textContent = "₹" + data.price;
            document.getElementById('d-pkg-name').value = data.title;
            document.getElementById('pkg-days').textContent = data.duration.split('/')[0];
            document.getElementById('pkg-locations').textContent = data.locations;
            document.getElementById('pkg-desc').textContent = data.description;

            const timelineContainer = document.getElementById('pkg-timeline');
            let timelineHTML = '';
            data.timeline.forEach(item => {
                timelineHTML += `
                    <div class="timeline-row">
                        <div class="day-badge">Day ${item.day}</div>
                        <div class="day-content"><h4>${item.title}</h4><p>${item.desc}</p></div>
                    </div>`;
            });
            timelineContainer.innerHTML = timelineHTML;

            const incContainer = document.getElementById('pkg-inc');
            let incHTML = '';
            data.inclusions.forEach(item => {
                incHTML += `<li><i class="fas fa-check"></i> ${item}</li>`;
            });
            incContainer.innerHTML = incHTML;
        }
    } else {
        if(document.getElementById('pkg-title')) document.getElementById('pkg-title').textContent = "Package Not Found";
    }
}

const detailForm = document.getElementById('detailBookingForm');
if(detailForm) {
    detailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('d-name').value;
        const phone = document.getElementById('d-phone').value;
        const date = document.getElementById('d-date').value;
        const pax = document.getElementById('d-pax').value;
        const car = document.getElementById('d-car').value;
        const pkgName = document.getElementById('d-pkg-name').value;
        const text = `*New Package Enquiry*%0A%0A*Package:* ${pkgName}%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Date:* ${date}%0A*Pax:* ${pax}%0A*Car:* ${car}`;
        window.open(`https://wa.me/917067568998?text=${text}`, '_blank');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPackageDetails();
});
