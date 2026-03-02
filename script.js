function updateClockAndDate() {
    const now = new Date();

    // 1. عرض اسم اليوم
    const dayName = now.toLocaleDateString('ar-SA', { weekday: 'long' });
    document.getElementById('day-name').innerText = dayName;

    // 2. الوقت الرئيسي بنظام 12 ساعة مع (صباحاً/مساءً)
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampmText = hours >= 12 ? 'مساءً' : 'صباحاً';
    
    hours = hours % 12 || 12; // تحويل الساعة 0 إلى 12
    
    const formattedTime = 
        (hours < 10 ? '0' + hours : hours) + ":" + 
        (minutes < 10 ? '0' + minutes : minutes) + ":" + 
        (seconds < 10 ? '0' + seconds : seconds);

    document.getElementById('clock').innerText = formattedTime;
    document.getElementById('ampm').innerText = ampmText;

    // 3. التاريخ الهجري (أم القرى) والميلادي - تم الفصل بينهما هنا
    const hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    
    const miladiDate = now.toLocaleDateString('ar-SA', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    document.getElementById('date-info').innerText = `${hijriDate} هـ | ${miladiDate} م`;

    // 4. التحديد التلقائي للصلاة القادمة
    autoHighlight(now.getHours(), now.getMinutes());
}

function autoHighlight(h, m) {
    const current = h * 60 + m;
    const prayers = [
        { id: 'fajr', time: '05:31' },
        { id: 'sunrise', time: '06:58' },
        { id: 'dhuhr', time: '12:21' },
        { id: 'asr', time: '15:37' },
        { id: 'maghrib', time: '17:44' },
        { id: 'isha', time: '19:14' }
    ];

    let nextId = 'fajr';
    for (let p of prayers) {
        const [ph, pm] = p.time.split(':').map(Number);
        if ((ph * 60 + pm) > current) {
            nextId = p.id;
            break;
        }
    }

    document.querySelectorAll('.hex-item').forEach(el => {
        el.classList.remove('active');
        if (el.id === nextId) el.classList.add('active');
    });
}

updateClockAndDate();
setInterval(updateClockAndDate, 1000);
