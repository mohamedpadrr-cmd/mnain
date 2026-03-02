function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('ar-SA', { hour12: false });
}

// يمكنك إضافة Fetch API هنا لجلب المواقيت تلقائياً كما في الرد السابق
setInterval(updateClock, 1000);
updateClock();
