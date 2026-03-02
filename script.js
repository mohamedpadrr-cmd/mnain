function updateClockAndDate() {
    const now = new Date();

    // 1. اسم اليوم بالعربي
    const dayOptions = { weekday: 'long' };
    document.getElementById('day-name').innerText = now.toLocaleDateString('ar-SA', dayOptions);

    // 2. نظام 12 ساعة
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampmText = hours >= 12 ? 'مساءً' : 'صباحاً';
    hours = hours % 12 || 12;
    
    const strTime = 
        (hours < 10 ? '0' + hours : hours) + ":" + 
        (minutes < 10 ? '0' + minutes : minutes) + ":" + 
        (seconds < 10 ? '0' + seconds : seconds);

    document.getElementById('clock').innerText = strTime;
    document.getElementById('ampm').innerText = ampmText;

    // 3. التاريخ الهجري (رئيسي) والميلادي
    const hijriOptions = { day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic-uma' };
    const dateHijri = now.toLocaleDateString('ar-SA-u-ca-islamic-uma', hijriOptions);
    
    const miladiOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateMiladi = now.toLocaleDateString('ar-SA', miladiOptions);

    document.getElementById('date-info').innerText = `${dateHijri} هـ | ${dateMiladi} م`;
}

// تشغيل فوري
updateClockAndDate();
setInterval(updateClockAndDate, 1000);
