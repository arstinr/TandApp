function updateDeliveryStatus(statuses) {
    deliveryStatusContainer.innerHTML = '';
    statuses.forEach(item => {
        const statusClass = item.status.toLowerCase().replace(' ', '-');
        const statusElement = document.createElement('div');
        statusElement.className = `delivery-item status-${statusClass}`;
        statusElement.innerHTML = `
            <span>${item.medicine}</span>
            <div class="status">
                <span class="status-indicator"></span>
                ${item.status}
            </div>
        `;
        deliveryStatusContainer.appendChild(statusElement);
    });
}

// Get all navigation buttons and pages
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

// Add click handlers to navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the page id from the button's data-page attribute
        const pageId = button.getAttribute('data-page');
        
        // Remove active class from all buttons and pages
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked button and corresponding page
        button.classList.add('active');
        document.getElementById(pageId).classList.add('active');
    });
});

// Form submission handlers
const medicineForm = document.getElementById('medicine-form');
const symptomForm = document.getElementById('symptom-form');
const chatMessages = document.getElementById('chat-messages');
const remindersContainer = document.getElementById('reminders');
const faqList = document.getElementById('faq-list');

// Add console logs to verify elements are found
console.log('Medicine Form:', medicineForm);
console.log('Reminders Container:', remindersContainer);

// Initialize reminders array
const medicineSchedules = [];

medicineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    
    const name = document.getElementById('medicine-name').value;
    const dosage = document.getElementById('medicine-dosage').value;
    const time = document.getElementById('medicine-time').value;
    
    console.log('New reminder:', { name, dosage, time }); // Debug log
    
    // Add to reminders
    const reminder = { name, dosage, time };
    medicineSchedules.push(reminder);
    console.log('Updated schedules:', medicineSchedules); // Debug log
    
    updateReminders();
    medicineForm.reset();
});

function updateReminders() {
    console.log('Updating reminders display'); // Debug log
    console.log('Current schedules:', medicineSchedules); // Debug log
    
    remindersContainer.innerHTML = '';
    medicineSchedules.forEach(schedule => {
        const reminderElement = document.createElement('div');
        reminderElement.className = 'reminder-item';
        reminderElement.innerHTML = `
            <span class="reminder-time">${schedule.time}</span>
            <div>
                <h3>${schedule.name}</h3>
                <p>${schedule.dosage}</p>
            </div>
        `;
        remindersContainer.appendChild(reminderElement);
    });
}

symptomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const symptom = document.getElementById('symptom-input').value;
    
    // Add user message
    addChatMessage('user', symptom);
    
    // Mock AI response
    setTimeout(() => {
        addChatMessage('ai', 'Based on your symptoms, I recommend consulting with a healthcare professional. Would you like me to help you find a doctor?');
    }, 1000);
    
    symptomForm.reset();
});

// Chat message handler
function addChatMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add FAQ items
const faqs = [
    { q: "What are common cold symptoms?", a: "Common cold symptoms include runny nose, sore throat, and mild fever." },
    { q: "When should I see a doctor?", a: "See a doctor if symptoms persist for more than a week or become severe." },
    { q: "How can I maintain good health?", a: "Exercise regularly, eat a balanced diet, and get adequate sleep." }
];

function initializeFAQs() {
    const faqList = document.getElementById('faq-list');
    console.log('FAQ List Element:', faqList); // Debug log
    
    if (!faqList) {
        console.error('FAQ list element not found!');
        return;
    }
    
    faqList.innerHTML = '';
    faqs.forEach(faq => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${faq.q}</h3>
            <p>${faq.a}</p>
        `;
        faqList.appendChild(li);
    });
}

// Hardcoded drugstore data
const nearbyDrugstores = [
    {
        name: "HealthPlus Pharmacy",
        address: "123 Main Street",
        distance: "0.3 km",
        isOpen: true,
        rating: "4.8"
    },
    {
        name: "MediCare Drugstore",
        address: "456 Oak Avenue",
        distance: "0.7 km",
        isOpen: true,
        rating: "4.6"
    },
    {
        name: "Community Pharmacy",
        address: "789 Pine Road",
        distance: "1.2 km",
        isOpen: false,
        rating: "4.5"
    }
];

function initializeDrugstores() {
    const drugstoresContainer = document.getElementById('drugstores');
    drugstoresContainer.innerHTML = '';
    
    nearbyDrugstores.forEach(store => {
        const storeElement = document.createElement('div');
        storeElement.className = 'drugstore-card';
        storeElement.innerHTML = `
            <div class="drugstore-icon">
                <i class="material-icons">local_pharmacy</i>
            </div>
            <div class="drugstore-info">
                <h3>${store.name}</h3>
                <p>${store.address}</p>
                <p>⭐ ${store.rating} • ${store.isOpen ? '<span style="color: var(--success)">Open</span>' : '<span style="color: #666">Closed</span>'}</p>
            </div>
            <div class="distance">${store.distance}</div>
        `;
        drugstoresContainer.appendChild(storeElement);
    });
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initializeFAQs();
    initializeDrugstores();
    console.log('App initialized');
});
