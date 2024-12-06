// Hardcoded data
const medicineSchedules = [];
const faqData = [
    { question: "What are the symptoms of COVID-19?", answer: "Common symptoms include fever, cough, and tiredness." },
    { question: "How often should I exercise?", answer: "It's recommended to exercise for at least 150 minutes per week." },
    { question: "What is a balanced diet?", answer: "A balanced diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats." }
];
const deliveryStatuses = [
    { medicine: "Paracetamol", status: "Order Confirmed" },
    { medicine: "Ibuprofen", status: "Out for Delivery" },
    { medicine: "Aspirin", status: "Delivered" }
];

// Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pageId = button.getAttribute('data-page');
        pages.forEach(page => page.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        button.classList.add('active');
    });
});

// Home Page
const medicineForm = document.getElementById('medicine-form');
const remindersContainer = document.getElementById('reminders');
const progressBar = document.getElementById('progress-bar');

medicineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('medicine-name').value;
    const dosage = document.getElementById('medicine-dosage').value;
    const time = document.getElementById('medicine-time').value;
    medicineSchedules.push({ name, dosage, time });
    updateReminders();
    updateProgressBar();
    medicineForm.reset();
});

function updateReminders() {
    remindersContainer.innerHTML = '';
    medicineSchedules.forEach(schedule => {
        const reminderElement = document.createElement('p');
        reminderElement.textContent = `${schedule.name}, ${schedule.dosage}, ${schedule.time}`;
        remindersContainer.appendChild(reminderElement);
    });
}

function updateProgressBar() {
    const progress = (medicineSchedules.length / 5) * 100; // Assuming 5 is the target
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

// Consultation Page
const symptomForm = document.getElementById('symptom-form');
const chatMessages = document.getElementById('chat-messages');
const faqList = document.getElementById('faq-list');

symptomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const symptom = document.getElementById('symptom-input').value;
    addChatMessage('user', symptom);
    // Mock AI response
    setTimeout(() => {
        addChatMessage('ai', "Based on your symptoms, you may want to consult a doctor. Please seek professional medical advice.");
    }, 1000);
    symptomForm.reset();
});

function addChatMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender === 'user' ? 'You' : 'AI'}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Populate FAQ section
faqData.forEach(faq => {
    const faqElement = document.createElement('li');
    faqElement.innerHTML = `<strong>Q: ${faq.question}</strong><br>A: ${faq.answer}`;
    faqList.appendChild(faqElement);
});

// Delivery Page
const medicineSearch = document.getElementById('medicine-search');
const prescriptionForm = document.getElementById('prescription-form');
const deliveryStatusContainer = document.getElementById('delivery-status');

medicineSearch.addEventListener('input', () => {
    const searchTerm = medicineSearch.value.toLowerCase();
    const filteredMedicines = deliveryStatuses.filter(item => 
        item.medicine.toLowerCase().includes(searchTerm)
    );
    updateDeliveryStatus(filteredMedicines);
});

prescriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Prescription uploaded successfully!');
    prescriptionForm.reset();
});

function updateDeliveryStatus(statuses) {
    deliveryStatusContainer.innerHTML = '';
    statuses.forEach(item => {
        const statusElement = document.createElement('p');
        statusElement.textContent = `${item.medicine}: ${item.status}`;
        deliveryStatusContainer.appendChild(statusElement);
    });
}

// Initial update of delivery statuses
updateDeliveryStatus(deliveryStatuses);