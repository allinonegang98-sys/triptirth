// Initialize Animations
if(typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-quart',
        once: true
    });
}

// --- HAMBURGER MENU ANIMATION ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('toggle'); // Transform to X
        navLinks.classList.toggle('active');  // Slide in menu
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        }
    });
});

// --- DATE VALIDATION (PREVENT PAST DATES) ---
document.addEventListener('DOMContentLoaded', () => {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});

// --- LANGUAGE TOGGLE (GLOBAL) ---
const langBtn = document.getElementById('langToggle');
let isHindi = false;

if(langBtn) {
    langBtn.addEventListener('click', () => {
        isHindi = !isHindi;
        toggleLanguage(isHindi);
        
        // Update button text
        if(isHindi) {
            langBtn.innerText = "English / हिंदी";
        } else {
            langBtn.innerText = "हिंदी / English";
        }
    });
}

function toggleLanguage(hindi) {
    const enElements = document.querySelectorAll('.lang-en');
    const hiElements = document.querySelectorAll('.lang-hi');

    if(hindi) {
        enElements.forEach(el => el.classList.add('hidden'));
        hiElements.forEach(el => el.classList.remove('hidden'));
    } else {
        enElements.forEach(el => el.classList.remove('hidden'));
        hiElements.forEach(el => el.classList.add('hidden'));
    }
}

// --- HERO SLIDER LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if(slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Change every 4 seconds
    }
});


// --- FAQ ACCORDION LOGIC (FIXED) ---
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const activeHeader = document.querySelector('.accordion-header.active');
        
        // Close currently open item if it's not the clicked one
        if(activeHeader && activeHeader !== header) {
            activeHeader.classList.remove('active');
            activeHeader.nextElementSibling.style.maxHeight = null;
        }

        header.classList.toggle('active');
        const body = header.nextElementSibling;
        
        if(header.classList.contains('active')) {
            // FIX: Added +100px buffer to scrollHeight to account for vertical padding transition
            // This ensures content is not cut off at the bottom
            body.style.maxHeight = (body.scrollHeight + 100) + "px";
        } else {
            body.style.maxHeight = null;
        }
    });
});

// --- TOGGLE ESTIMATOR LOGIC (NEW) ---
function toggleEstimator() {
    const estimatorSection = document.getElementById('estimator');
    if (estimatorSection.style.display === 'none') {
        estimatorSection.style.display = 'block';
        estimatorSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        estimatorSection.style.display = 'none';
    }
}

// --- SMART CALCULATOR (UPDATED) ---
const packageBaseRates = {
    'premium': 9499,      // Premium Package
    'jyotirlinga': 6500,  // Standard
    'malwa': 12500,       
    'mandu': 8500,
    'pachmarhi': 9500,
    'ujjain': 3500,
    'baglamukhi': 4500,
    'ujjain_premium': 5500,
    'ujjain_dewas': 4000 // New Ujjain & Dewas Package
};

function calculateTripCost() {
    const paxInput = document.getElementById('estPax');
    const pkgSelect = document.getElementById('estPackage');
    const carSelect = document.getElementById('estCar');
    
    const perPersonDisplay = document.getElementById('estPerPerson');
    const totalDisplay = document.getElementById('estTotal');
    
    if(!paxInput || !pkgSelect) return;
    
    let adults = parseInt(paxInput.value) || 0;
    let pkgKey = pkgSelect.value;
    let carType = carSelect.value;
    let baseRate = packageBaseRates[pkgKey] || 0;
    
    if (adults >= 1 && baseRate > 0) {
        
        // 1. Vehicle Adjustment (Per Person Surcharge Estimate)
        let vehicleModifier = 0;
        if (carType === 'suv') vehicleModifier = 800;
        if (carType === 'tempotraveller') vehicleModifier = 1200;

        // 2. Base Rates with Vehicle
        let adultRate = baseRate + vehicleModifier;
        
        // 3. Discount Logic for larger groups (only on adult tickets)
        if (adults > 2) {
            let discountFactor = (adults - 2) * 0.03; // 3% per extra adult
            if(discountFactor > 0.30) discountFactor = 0.30; // Max 30% discount
            adultRate = adultRate * (1 - discountFactor);
        }

        // Round to nearest 50
        adultRate = Math.ceil(adultRate / 50) * 50;
        
        let total = adultRate * adults;

        perPersonDisplay.innerText = "₹" + adultRate.toLocaleString() + " x " + adults;
        totalDisplay.innerText = "₹" + total.toLocaleString();
    } else {
        perPersonDisplay.innerText = "₹0";
        totalDisplay.innerText = "₹0";
    }
}

// --- FILTER PACKAGES LOGIC (UPDATED for Multiple Categories) ---
function filterPackages(category) {
    const cards = document.querySelectorAll('.package-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    if(buttons && event) {
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const dur = card.getAttribute('data-duration');

        // Check if category matches or if the card's category string includes the selected category
        if (category === 'all') {
            card.style.display = 'flex';
            card.classList.remove('aos-animate');
            setTimeout(() => card.classList.add('aos-animate'), 50);
        } else {
            // Updated check: Allows for "spiritual ujjain-tour" to match both "spiritual" and "ujjain-tour"
            if ((cat && cat.includes(category)) || dur === category) {
                card.style.display = 'flex';
                card.classList.remove('aos-animate');
                setTimeout(() => card.classList.add('aos-animate'), 50);
            } else {
                card.style.display = 'none';
            }
        }
    });
}


// --- PACKAGE DATA (UPDATED) ---
const packagesDB = {
    'premium': {
        title: "Premium Mahakal & Omkareshwar",
        subtitle: "Luxury Spiritual Journey",
        duration: "2 Nights / 3 Days",
        locations: "Ujjain & Omkareshwar",
        image: "images/pics/mhakal1.jpg",
        price: "9,499",
        description: "Experience the divine with comfort. This premium package includes 4-star accommodation, Innova Crysta travel, and assistance for VIP Darshan bookings.",
        timeline: [
            { day: 1, title: "VIP Arrival", desc: "Pick up in Innova. Welcome drink at 4-star Hotel. Evening VIP entry assistance for Aarti." },
            { day: 2, title: "Omkareshwar & Mamleshwar", desc: "Exclusive drive to Omkareshwar. Priority Darshan assistance. Boat ride included." },
            { day: 3, title: "Corridor & Departure", desc: "Guided tour of Mahakal Lok Corridor. Drop at Airport/Station." }
        ],
        inclusions: ["Breakfast & Dinner", "Innova Crysta", "4-Star Hotel", "VIP Assistance", "Guide"]
    },
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
    },
    'ujjain_premium': {
        title: "Ujjain Premium Package",
        subtitle: "Complete City Tour + 5 Gems",
        duration: "2 Nights / 3 Days",
        locations: "Ujjain City (Extended)",
        image: "images/pics/ujjain.webp",
        price: "5,500",
        description: "The ultimate Ujjain experience. Covers all standard temples plus 5 exclusive spiritual spots: Asth Vinayak, Chintaman, Shani Mandir, ISKCON & Bhartari Gufa.",
        timeline: [
            { day: 1, title: "Mahakal & Corridor", desc: "Arrival. Check-in Premium Hotel. Evening Mahakal Lok Corridor & Harsiddhi Mata." },
            { day: 2, title: "The 9 Gems Tour", desc: "Morning Mahakal. Then: Kal Bhairav, Sandipani, Mangalnath. Post lunch: Asth Vinayak, Chintaman Ganesh, Shani Mandir." },
            { day: 3, title: "Final Blessings", desc: "Morning ISKCON Temple & Bhartari Gufa. Drop at Railway Station." }
        ],
        inclusions: ["Breakfast & Dinner", "AC Cab (3 Days)", "Premium Hotel", "Expert Guide"]
    },
    'ujjain_dewas': {
        title: "Ujjain & Dewas Darshan",
        subtitle: "Mahakal & Chamunda Mata",
        duration: "1 Day",
        locations: "Ujjain & Dewas",
        image: "images/pics/ujjain.webp",
        price: "4,000",
        description: "A divine combination tour covering the main temples of Ujjain and a visit to the famous Tekari in Dewas to seek blessings from Chamunda Mata and Tulja Bhavani.",
        timeline: [
            { day: 1, title: "Ujjain & Dewas", desc: "Early Morning Ujjain Darshan (Mahakal, Kal Bhairav). Afternoon drive to Dewas (40km). Visit Dewas Tekari (Ropeway available). Return drop." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance"]
    }
};

function loadPackageDetails() {
    // Only run on package-detail page
    if(!document.getElementById('pkg-title')) return;

    const params = new URLSearchParams(window.location.search);
    const pkgId = params.get('id');
    const data = packagesDB[pkgId];

    if (data) {
        document.getElementById('pkg-title').textContent = data.title;
        document.getElementById('pkg-subtitle').textContent = data.subtitle;
        document.getElementById('pkg-hero').style.backgroundImage = `url('${data.image}')`;
        document.getElementById('pkg-price').textContent = "₹" + data.price;
        if(document.getElementById('d-pkg-name')) document.getElementById('d-pkg-name').value = data.title;
        document.getElementById('pkg-locations').textContent = data.locations;
        document.getElementById('pkg-desc').textContent = data.description;
        // Updated Days logic if needed, currently static in HTML or ignored
        
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
    } else {
        document.getElementById('pkg-title').textContent = "Package Not Found";
    }
}

// Lightbox
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

function selectCar(carName) {
    const carSelect = document.getElementById('carSelect');
    if(carSelect) {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        carSelect.value = carName;
        carSelect.style.borderColor = '#FF8C00';
        setTimeout(() => { carSelect.style.borderColor = '#ddd'; }, 2000);
    }
}

const homeForm = document.getElementById('bookingForm');
if(homeForm) {
    homeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const pkg = document.getElementById('packageSelect').value;
        const car = document.getElementById('carSelect').value;
        const pax = document.getElementById('pax').value;
        
        // Simplified WhatsApp Message Structure
        const text = `Hi, I would like to book the ${pkg}.%0A` +
                     `Name: ${name}%0A` +
                     `Date: ${date}%0A` +
                     `Persons: ${pax}%0A` +
                     `Car: ${car}`;
                     
        window.open(`https://wa.me/919039359123?text=${text}`, '_blank');
    });
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
        
        // Simplified WhatsApp Message Structure for Detail Page
        const text = `Hi, I am interested in the ${pkgName}.%0A` +
                     `Name: ${name}%0A` +
                     `Phone: ${phone}%0A` +
                     `Date: ${date}%0A` +
                     `Pax: ${pax}%0A` +
                     `Car: ${car}`;
                     
        window.open(`https://wa.me/919039359123?text=${text}`, '_blank');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPackageDetails();
    calculateTripCost(); // Run on load
});
