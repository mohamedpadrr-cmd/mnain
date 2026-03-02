function updateClockAndDate() {
    const now = new Date();

    // 1. عرض اليوم باللغة العربية
    const dayName = now.toLocaleDateString('ar-SA', { weekday: 'long' });
    document.getElementById('day-name').innerText = dayName;

    // 2. نظام الوقت 12 ساعة
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    const ampmText = h >= 12 ? 'مساءً' : 'صباحاً';
    
    let displayH = h % 12 || 12;
    const formattedTime = 
        (displayH < 10 ? '0' + displayH : displayH) + ":" + 
        (m < 10 ? '0' + m : m) + ":" + 
        (s < 10 ? '0' + s : s);

    document.getElementById('clock').innerText = formattedTime;
    document.getElementById('ampm').innerText = ampmText;

    // 3. عرض التاريخ الهجري والميلادي (تم فصلهما بدقة)
    const hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    
    const miladiDate = now.toLocaleDateString('ar-SA', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    document.getElementById('date-info').innerText = `${hijriDate} هـ | ${miladiDate} م`;

    // 4. التحديد التلقائي للصلاة القادمة
    autoHighlightNextPrayer(h, m);
}

function autoHighlightNextPrayer(currentH, currentM) {
    const currentTimeInMinutes = currentH * 60 + currentM;
    
    // مواقيت الصلاة (يمكنك تحديثها يدوياً أو ربطها بـ API)
    const prayers = [
        { id: 'fajr', time: '05:31' },
        { id: 'sunrise', time: '06:58' },
        { id: 'dhuhr', time: '12:21' },
        { id: 'asr', time: '15:37' },
        { id: 'maghrib', time: '17:44' },
        { id: 'isha', time: '19:14' }
    ];

    let nextPrayerId = 'fajr'; // افتراضياً صلاة الفجر لليوم التالي

    for (let prayer of prayers) {
        const [ph, pm] = prayer.time.split(':').map(Number);
        const prayerMinutes = ph * 60 + pm;
        
        if (prayerMinutes > currentTimeInMinutes) {
            nextPrayerId = prayer.id;
            break;
        }
    }

    // تطبيق التوهج على الصلاة المختارة فقط
    document.querySelectorAll('.hex-item').forEach(item => {
        item.classList.remove('active');
        if (item.id === nextPrayerId) {
            item.classList.add('active');
        }
    });
}

// التشغيل الفوري والتكرار كل ثانية
updateClockAndDate();
setInterval(updateClockAndDate, 1000);
