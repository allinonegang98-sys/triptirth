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
        hamburger.classList.toggle('toggle');
        navLinks.classList.toggle('active');
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
        }, 4000);
    }
});


// --- FAQ ACCORDION LOGIC ---
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const activeHeader = document.querySelector('.accordion-header.active');
        
        if(activeHeader && activeHeader !== header) {
            activeHeader.classList.remove('active');
            activeHeader.nextElementSibling.style.maxHeight = null;
        }

        header.classList.toggle('active');
        const body = header.nextElementSibling;
        
        if(header.classList.contains('active')) {
            body.style.maxHeight = (body.scrollHeight + 100) + "px";
        } else {
            body.style.maxHeight = null;
        }
    });
});

// --- TOGGLE ESTIMATOR LOGIC ---
function toggleEstimator() {
    const estimatorSection = document.getElementById('estimator');
    if (estimatorSection.style.display === 'none') {
        estimatorSection.style.display = 'block';
        estimatorSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        estimatorSection.style.display = 'none';
    }
}

// --- SMART CALCULATOR ---
const packageBaseRates = {
    'premium': 3750,      
    'jyotirlinga': 0, 
    'mandu': 0,
    'ujjain': 0,
    'baglamukhi': 0,
    'ujjain_premium': 0,
    'ujjain_dewas': 0,
    'indore': 0,
    'mamleshwar': 0,
    'sehore': 0,
    'dewas': 0,
    'mandsaur': 0,
    'chittorgarh': 0,
    'khatu_shyam': 0
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
    
    if (pkgKey === 'premium') {
        if (adults === 2) baseRate = 3750;
        else if (adults === 3) baseRate = 3150;
        else if (adults === 4) baseRate = 2850;
        else if (adults === 5) baseRate = 2600;
        else if (adults === 6) baseRate = 2300;
        else if (adults >= 7) baseRate = 2100;
    }

    if (adults >= 1 && baseRate > 0) {
        let total = baseRate * adults;
        perPersonDisplay.innerText = "₹" + baseRate.toLocaleString() + " x " + adults;
        totalDisplay.innerText = "₹" + total.toLocaleString();
    } else {
        perPersonDisplay.innerText = "Contact Us";
        totalDisplay.innerText = "For Quote";
    }
}

// --- FILTER PACKAGES LOGIC ---
function filterPackages(category) {
    const cards = document.querySelectorAll('.package-card');
    const buttons = document.querySelectorAll('.filter-btn');

    if(buttons && event) {
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const dur = card.getAttribute('data-duration');

        if (category === 'all') {
            card.style.display = 'flex';
            card.classList.remove('aos-animate');
            setTimeout(() => card.classList.add('aos-animate'), 50);
        } else {
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


// --- PACKAGE DATA (FULLY UPDATED WITH 'PLACES') ---
const packagesDB = {
    'premium': {
        title: "Ujjain & Omkareshwar Package",
        subtitle: "Where Divinity Meets Comfort - 2 Days",
        duration: "1 Night / 2 Days",
        locations: "Ujjain & Omkareshwar",
        image: "images/pics/mahakal&omkareshwer.jpg",
        price: "3,750 (Starting)",
        description: "The most comprehensive pilgrimage tour covering Ujjain and Omkareshwar. Includes private taxi service, hotel stay, and complete darshan of all Tirth places.",
        places: [
            "Mahakaleshwar Jyotirlinga",
            "Mahakal Lok Corridor",
            "Harsiddhi Mata Temple",
            "Kaal Bhairav Temple",
            "Mangalnath Temple",
            "Gadhkalika Temple",
            "Sandipani Ashram",
            "Ram Ghat",
            "Omkareshwar Jyotirlinga",
            "Mamleshwar Jyotirlinga"
        ],
        timeline: [
            { day: 1, title: "Ujjain Darshan", desc: "<strong>Arrival:</strong> Pick-up from Ujjain Railway Station & Check-in.<br><strong>Temples Covered:</strong> Mahakaleshwar, Mahakal Lok, Harsiddhi Temple, Kaal Bhairav, Gadhkalika, Mangalnath, Ramghat, Sandipani Ashram." },
            { day: 2, title: "Omkareshwar Darshan", desc: "<strong>Morning (6:00 AM):</strong> Depart for Omkareshwar. Explore Omkareshwar & Mamleshwar Jyotirlinga.<br><strong>Return:</strong> Return to Ujjain, Drop-off at Hotel. Night Stay in Ujjain." },
            { day: 3, title: "Departure", desc: "Morning Check-out. (Drop-off on Day 3 not included)." }
        ],
        inclusions: [
            "Private Taxi Service", "Hotel Stay", "Darshan: Ujjain, Omkareshwar & All Tirth Places", 
            "AC Private Cab", "Toll & Parking", "Driver Allowance"
        ]
    },
    'jyotirlinga': {
        title: "Basic Ujjain Darshan Package",
        subtitle: "Short Spiritual Tour",
        duration: "1 Night / 2 Days",
        locations: "Ujjain",
        image: "images/pics/mhakal1.jpg",
        price: "Contact for Price", 
        description: "A short but spiritually fulfilling tour covering the main temples of Ujjain. Ideal for a quick divine getaway.",
        places: [
            "Mahakaleshwar Jyotirlinga",
            "Mahakal Lok Corridor",
            "Harsiddhi Mata Temple",
            "Kaal Bhairav Temple",
            "Mangalnath Temple"
        ],
        timeline: [
            { day: 1, title: "Ujjain Arrival", desc: "Pick up and Hotel Check-in. Evening visit to Mahakal Lok and Harsiddhi Temple." },
            { day: 2, title: "Temple Run", desc: "Mahakaleshwar, Kal Bhairav, Mangalnath. Drop at Railway Station." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Hotel Stay"]
    },
    'mandu': {
        title: "Mandu: City of Joy",
        subtitle: "Heritage Tour of Mandav",
        duration: "2 Nights / 3 Days",
        locations: "Mandu",
        image: "images/pics/mandu.jpg",
        price: "Contact for Price",
        description: "Step back in time and explore the architectural marvels of Mandu, the City of Joy. Witness the legendary romance of Baz Bahadur and Rani Roopmati.",
        places: [
            "Jahaz Mahal (Ship Palace)",
            "Hindola Mahal",
            "Jami Masjid",
            "Hoshang Shah's Tomb",
            "Rani Roopmati Pavilion",
            "Baz Bahadur's Palace",
            "Rewa Kund",
            "Echo Point",
            "Kakara Khoh Waterfall"
        ],
        timeline: [
            { day: 1, title: "Arrival & Mandu Drive", desc: "Pick up from Indore. Drive to Mandu (approx 2 hrs). Check-in and relax." },
            { day: 2, title: "Full Day Sightseeing", desc: "Visit Jahaz Mahal, Hindola Mahal, Jami Masjid, Hoshang Shah's Tomb, and Roopmati Pavilion." },
            { day: 3, title: "Return", desc: "Morning breakfast and drive back to Indore for departure." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Heritage Property Stay", "Guide Service"]
    },
    'baglamukhi': {
        title: "Mystical Baglamukhi",
        subtitle: "Nalkheda & Agar Malwa",
        duration: "1 Night / 1 Day",
        locations: "Nalkheda",
        image: "images/pics/bagalamukhi.jpg",
        price: "Contact for Price",
        description: "Embark on a spiritually charged journey to the renowned Baglamukhi Mata Temple in Nalkheda. This sacred destination is famous for its powerful Havan and Pujas.",
        places: [
            "Maa Baglamukhi Temple",
            "Banjari Mata Temple",
            "Nalkheda Fort",
            "Dhom Dam",
            "Mandav Nature Camp"
        ],
        timeline: [
            { day: 1, title: "Ujjain to Nalkheda", desc: "Morning drive to Nalkheda (approx 2.5 hrs). Darshan and Havan." },
            { day: 1, title: "Return", desc: "Return to Ujjain by evening. Drop at Hotel/Station." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Puja Samagri Assistance"]
    },
    'ujjain': {
        title: "Exclusive Ujjain Darshan",
        subtitle: "City of Temples",
        duration: "1 Night / 2 Days",
        locations: "Ujjain City",
        image: "images/pics/ujjain.webp",
        price: "Contact for Price",
        description: "Discover the spiritual essence of Ujjain with our comprehensive city tour. Beyond the famous Mahakal temple, explore the ancient Kal Bhairav and Ramghat.",
        places: [
            "Mahakaleshwar Temple",
            "Mahakal Lok Corridor",
            "Harsiddhi Mata Temple",
            "Kal Bhairav Temple",
            "Gadhkalika Temple",
            "Mangalnath Temple",
            "Sandipani Ashram",
            "Ram Ghat",
            "Bhartari Gufa"
        ],
        timeline: [
            { day: 1, title: "Arrival", desc: "Check-in. Visit Mahakal Lok corridor in the evening. Ramghat Aarti." },
            { day: 2, title: "Temple Run", desc: "Mahakaleshwar, Harsiddhi, Kal Bhairav, Gadhkalika, Mangalnath, Sandipani Ashram. Drop." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Hotel Stay", "Local Guide"]
    },
    'ujjain_premium': {
        title: "Ujjain Premium Package",
        subtitle: "Complete City Tour + 5 Gems",
        duration: "2 Nights / 3 Days",
        locations: "Ujjain City (Extended)",
        image: "images/pics/ujjain.webp",
        price: "Contact for Price",
        description: "Elevate your pilgrimage with our Ujjain Premium Package. This extensive tour covers not just the main temples but also the hidden spiritual gems like the 84 Mahadevs.",
        places: [
            "Mahakaleshwar Temple",
            "Harsiddhi Mata Temple",
            "Kal Bhairav Temple",
            "Sandipani Ashram",
            "Mangalnath Temple",
            "Chintaman Ganesh",
            "ISKCON Temple",
            "Bhartari Gufa",
            "Shani Mandir (Navgraha)",
            "Chaubis Khamba Temple"
        ],
        timeline: [
            { day: 1, title: "Mahakal & Corridor", desc: "Arrival. Check-in Premium Hotel. Evening Mahakal Lok Corridor & Harsiddhi Mata." },
            { day: 2, title: "The 9 Gems Tour", desc: "Morning Mahakal. Then: Kal Bhairav, Sandipani, Mangalnath. Post lunch: Asth Vinayak, Chintaman Ganesh, Shani Mandir." },
            { day: 3, title: "Final Blessings", desc: "Morning ISKCON Temple & Bhartari Gufa. Drop at Railway Station." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Premium Hotel", "Expert Guide"]
    },
    'ujjain_dewas': {
        title: "Ujjain & Dewas Darshan",
        subtitle: "Mahakal & Chamunda Mata",
        duration: "1 Day",
        locations: "Ujjain & Dewas",
        image: "images/pics/ujjain.webp",
        price: "Contact for Price",
        description: "Combine your Ujjain pilgrimage with a visit to the hilltop temple of Chamunda Mata in Dewas. This package offers a perfect blend of divinity and scenic beauty.",
        places: [
            "Mahakaleshwar Temple",
            "Kal Bhairav Temple",
            "Chamunda Mata (Dewas)",
            "Tulja Bhavani (Dewas)",
            "Dewas Tekri (Ropeway)"
        ],
        timeline: [
            { day: 1, title: "Ujjain & Dewas", desc: "Early Morning Ujjain Darshan (Mahakal, Kal Bhairav). Afternoon drive to Dewas (40km). Visit Dewas Tekari (Ropeway available). Return drop." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance"]
    },
    'indore': {
        title: "Indore City Tour",
        subtitle: "The Food & Cultural Capital of MP",
        duration: "1 Day",
        locations: "Indore City",
        image: "images/pics/malwa.png",
        price: "Contact for Price",
        description: "Experience a seamless journey through Indore with our expert guidance. Discover the city's best routes, top attractions, and hidden gems with ease.",
        places: [
            "Rajwada Palace",
            "Khajrana Ganesh Temple",
            "Lal Bagh Palace",
            "Sarafa Bazaar (Night Market)",
            "56 Dukan",
            "Annapurna Mandir",
            "Kaanch Mandir"
        ],
        timeline: [
            { day: 1, title: "Indore Sightseeing", desc: "Visit Rajwada Palace, Khajrana Ganesh Temple, Lal Bagh Palace. Enjoy evening street food at the famous Sarafa Bazaar (Night Market) or 56 Dukan." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Guide Service"]
    },
    'mamleshwar': {
        title: "Mamleshwar Darshan",
        subtitle: "Divine Journey to the Ancient Jyotirlinga",
        duration: "1 Day",
        locations: "Mamleshwar",
        image: "images/pics/mahakal&omkareshwer.jpg",
        price: "Contact for Price",
        description: "Experience the ultimate convenience and comfort of exploring Mamleshwar with Trip Tirth Travels. Book with us today and enjoy a seamless travel experience.",
        places: [
            "Shri Mamleshwar Jyotirlinga",
            "Satmatrika Temples",
            "Siddhanath Temple",
            "Gauri Somnath Temple",
            "24 Avatars Group of Temples",
            "Omkar Mandhata Temple"
        ],
        timeline: [
            { day: 1, title: "Mamleshwar & Surroundings", desc: "Visit <strong>Shri Mamleshwar Jyotirlinga</strong>, <strong>Satmatrika Temples</strong>, <strong>Siddhanath Temple</strong>, <strong>Gauri Somnath Temple</strong>, <strong>24 Avatars Group of Temples</strong>, and <strong>Omkar Mandhata Temple</strong>." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Guide Service"]
    },
    'dewas': {
        title: "Dewas City Tour",
        subtitle: "Abode of Chamunda Mata",
        duration: "1 Day",
        locations: "Dewas",
        image: "images/pics/ujjain.webp", 
        price: "Contact for Price",
        description: "Experience the ultimate convenience and comfort of exploring Dewas with Trip Tirth Travels. Book with us today and enjoy a seamless travel experience.",
        places: [
            "Chamunda Mata Mandir",
            "Tulja Bhavani",
            "Kavadia Hills",
            "Kila Dewas",
            "Tekri Ganesh Mandir",
            "Meetha Talab",
            "Kheoni Wildlife Sanctuary"
        ],
        timeline: [
            { day: 1, title: "Dewas Sightseeing", desc: "Visit <strong>Chamunda Mata Mandir</strong> and <strong>Tulja Bhavani</strong> on the Tekri (Ropeway available). Explore <strong>Kavadia Hills</strong>, <strong>Kila Dewas</strong>, <strong>Tekri Ganesh Mandir</strong>, <strong>Meetha Talab</strong>, and <strong>Kheoni Wildlife Sanctuary</strong>." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Local Assistance"]
    },
    'sehore': {
        title: "Sehore Spiritual Tour",
        subtitle: "Kubreshwar Dham & Ancient Temples",
        duration: "1 Day",
        locations: "Sehore",
        image: "images/pics/pachmarhi.jpg", 
        price: "Contact for Price",
        description: "Experience the ultimate convenience and comfort of exploring Sehore with Trip Tirth Travels. Our fleet of well-maintained vehicles and experienced drivers ensure a hassle-free journey.",
        places: [
            "Kubreshwar Dham",
            "Devguradia",
            "Bilkis Gunj",
            "Shahjahanpura",
            "Parvati Hills",
            "Upper Lake",
            "Badi Jheel Lake",
            "Lakshmi Narayana Temple"
        ],
        timeline: [
            { day: 1, title: "Sehore Exploration", desc: "Visit the famous <strong>Kubreshwar Dham</strong>. Continue to <strong>Devguradia</strong>, <strong>Bilkis Gunj</strong>, <strong>Shahjahanpura</strong>, and <strong>Parvati Hills</strong>. Relax at <strong>Upper Lake</strong> and <strong>Badi Jheel Lake</strong>. Seek blessings at <strong>Lakshmi Narayana Temple</strong>." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Temple Visit Assistance"]
    },
    'mandsaur': {
        title: "Pashupatinath Mandsaur",
        subtitle: "Heritage & Spirituality",
        duration: "1-2 Days",
        locations: "Mandsaur",
        image: "images/pics/mahakal.jpg", 
        price: "Contact for Price",
        description: "Experience the ultimate convenience and comfort of exploring Mandsaur. Witness the unique 8-faced Pashupatinath Shivling and explore historical caves.",
        places: [
            "Pashupatinath Temple",
            "Buddhist Caves",
            "Chaturbhuj Nala",
            "Gandhi Sagar Dam",
            "Dharmarajeshwar Temple"
        ],
        timeline: [
            { day: 1, title: "Mandsaur Highlights", desc: "Darshan at the famous <strong>Pashupatinath Temple</strong>. Explore the ancient <strong>Buddhist Caves</strong> and <strong>Chaturbhuj Nala</strong>. Visit the scenic <strong>Gandhi Sagar Dam</strong> and the rock-cut <strong>Dharmarajeshwar Temple</strong>." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Local Guide Info"]
    },
    'chittorgarh': {
        title: "Sanwariya Seth & Chittorgarh",
        subtitle: "Divine Blessings & Fort Tour",
        duration: "1-2 Days",
        locations: "Chittorgarh (RJ)",
        image: "images/pics/malwa.png",
        price: "Contact for Price",
        description: "Experience the ultimate convenience and comfort of exploring Chittorgarh. Combine the divine darshan of Sanwariya Seth with a tour of the majestic Chittorgarh Fort.",
        places: [
            "Sawariya Seth Temple",
            "Jaisamand Lake",
            "Chittorgarh Fort",
            "Sita Mata Wildlife Sanctuary",
            "Jagat Temple",
            "Avari Mata Temple",
            "Vijay Stambh",
            "Kirti Stambh",
            "Rana Kumbha’s Palace"
        ],
        timeline: [
            { day: 1, title: "Temple & Fort Tour", desc: "Seek blessings at <strong>Sawariya Seth Temple</strong>. Visit the massive <strong>Chittorgarh Fort</strong> including <strong>Vijay Stambh</strong>, <strong>Kirti Stambh</strong>, and <strong>Rana Kumbha’s Palace</strong>. Explore <strong>Sita Mata Wildlife Sanctuary</strong> and <strong>Jaisamand Lake</strong>." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "State Tax (MP/RJ)"]
    },
    'khatu_shyam': {
        title: "Khatu Shyam (Sikar) Tour",
        subtitle: "Spiritual Journey to Rajasthan",
        duration: "2 Days",
        locations: "Sikar (RJ)",
        image: "images/pics/malwa.png",
        price: "Contact for Price",
        description: "Experience the ultimate convenience and comfort of exploring Sikar. A dedicated pilgrimage to the revered Khatu Shyamji Temple, ensuring a comfortable and devout journey.",
        places: [
            "Khatu Shyamji Temple",
            "Devgarh",
            "Harsh Nath Temple",
            "Seth Ramgopal Poddar Chhatri",
            "Laxmangarh Fort",
            "Gopinathji Temple",
            "Jeen Mata Mandir"
        ],
        timeline: [
            { day: 1, title: "Sikar Darshan", desc: "Visit the holy <strong>Khatu Shyamji Temple</strong>. Explore surrounding sites like <strong>Jeen Mata Mandir</strong>, <strong>Harsh Nath Temple</strong>, <strong>Laxmangarh Fort</strong>, and <strong>Devgarh</strong>. Visit <strong>Seth Ramgopal Poddar Chhatri</strong>." }
        ],
        inclusions: ["AC Private Cab", "Toll & Parking", "Driver Allowance", "Interstate Permit"]
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
        // Show price only for premium package (or if data has specific price)
        if(data.price && data.price !== "Contact for Price") {
             document.getElementById('pkg-price').textContent = "₹" + data.price;
        } else {
             document.getElementById('pkg-price').textContent = "Ask for Quote";
        }
        
        if(document.getElementById('d-pkg-name')) document.getElementById('d-pkg-name').value = data.title;
        document.getElementById('pkg-locations').textContent = data.locations;
        document.getElementById('pkg-desc').textContent = data.description;
        
        // --- NEW: Load Places Covered ---
        const placesContainer = document.getElementById('pkg-places');
        if(placesContainer && data.places) {
            let placesHTML = '';
            data.places.forEach(place => {
                placesHTML += `<li><i class="fas fa-map-pin"></i> ${place}</li>`;
            });
            placesContainer.innerHTML = placesHTML;
        }

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
