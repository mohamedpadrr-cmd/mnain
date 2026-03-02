function updateClockAndDate() {
    const now = new Date();
    
    // 1. نظام 12 ساعة
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'مساءً' : 'صباحاً';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // الساعة 0 تصبح 12
    const strTime = 
        (hours < 10 ? '0'+hours : hours) + ":" + 
        (minutes < 10 ? '0'+minutes : minutes) + ":" + 
        (seconds < 10 ? '0'+seconds : seconds);

    document.getElementById('clock').innerText = strTime;
    document.getElementById('ampm').innerText = ampm;

    // 2. تحديث التاريخ (ميلادي وهجري عبر Intl)
    const optionsMiladi = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateMiladi = now.toLocaleDateString('ar-SA', optionsMiladi);
    
    const optionsHijri = { day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic-uma' };
    const dateHijri = now.toLocaleDateString('ar-SA-u-ca-islamic-uma', optionsHijri);

    document.getElementById('full-date').innerText = `${dateHijri} هـ | ${dateMiladi} م`;
}

// تحديث كل ثانية
setInterval(updateClockAndDate, 1000);
updateClockAndDate();

// ملاحظة: لجلب مواقيت الصلاة بدقة لموقعك، يفضل استخدام fetch API كما في الرد السابق.
