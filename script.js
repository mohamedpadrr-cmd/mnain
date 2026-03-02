function updateClockAndDate() {
    const now = new Date();

    // 1. عرض اليوم باللغة العربية
    const dayName = now.toLocaleDateString('ar-SA', { weekday: 'long' });
    document.getElementById('day-name').innerText = dayName;

    // 2. نظام الوقت 12 ساعة مع AM/PM بالعربي
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampmText = hours >= 12 ? 'مساءً' : 'صباحاً';
    
    hours = hours % 12 || 12; // تحويل الساعة 00:00 إلى 12:00
    
    const formattedTime = 
        (hours < 10 ? '0' + hours : hours) + ":" + 
        (minutes < 10 ? '0' + minutes : minutes) + ":" + 
        (seconds < 10 ? '0' + seconds : seconds);

    document.getElementById('clock').innerText = formattedTime;
    document.getElementById('ampm').innerText = ampmText;

    // 3. عرض التاريخ الهجري (أم القرى) والميلادي بدقة
    const hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    
    const miladiDate = now.toLocaleDateString('ar-SA', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    document.getElementById('date-info').innerText = `${hijriDate} هـ | ${miladiDate} م`;
}

// التشغيل الفوري لحل مشكلة "جاري التحميل"
updateClockAndDate();
setInterval(updateClockAndDate, 1000);
