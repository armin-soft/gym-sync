
export function createHTMLTemplate(data: {
  gymName: string;
  gymAddress?: string;
  trainerName: string;
  trainerPhone: string;
  studentName: string;
  studentPhone: string;
  studentHeight: number;
  studentWeight: number;
  instagram?: string;
  website?: string;
  exercises: Array<{
    index: number;
    name: string;
    sets: string;
    reps: string;
  }>;
  meals: Array<{
    index: number;
    day: string;
    mealType: string;
    name: string;
  }>;
  supplements: Array<{
    index: number;
    name: string;
    dosage: string;
    timing: string;
  }>;
}): string {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>برنامه تمرینی حرفه‌ای و مدرن</title>

  <!-- فونت وزیر -->
  <link href="https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.css" rel="stylesheet" />

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    body {
      font-family: 'Vazir', sans-serif;
      background: #f5f7fa;
      color: #222;
      direction: rtl;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 40px 15px;
      position: relative;
      padding-bottom: 100px;
    }

    main {
      max-width: 900px;
      width: 100%;
      background: #fff;
      box-shadow: 0 10px 30px rgb(0 0 0 / 0.1);
      border-radius: 15px;
      padding: 30px 40px;
    }

    h1, h2 {
      font-weight: 900;
      text-align: center;
      color: #1f2937;
      margin-bottom: 20px;
      user-select: none;
    }

    h1 {
      font-size: 2.8rem;
      letter-spacing: 0.05em;
      margin-top: 0;
    }

    h2 {
      font-size: 1.8rem;
      margin-top: 2.5rem;
      position: relative;
      padding-bottom: 10px;
      color: #2563eb;
    }

    h2::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      height: 3px;
      width: 80px;
      border-radius: 10px;
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
    }

    .athlete-info {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 5px 12px rgb(59 130 246 / 0.3);
      color: #1e40af;
      font-weight: 700;
      font-size: 1.1rem;
      text-align: center;
      user-select: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      line-height: 1.4;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 150px;
      justify-content: center;
    }
    .info-item svg {
      width: 22px;
      height: 22px;
      stroke: #2563eb;
      stroke-width: 2;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 12px;
      font-weight: 600;
      font-size: 1rem;
      user-select: none;
      box-shadow: 0 2px 8px rgb(59 130 246 / 0.12);
      border-radius: 10px;
      overflow: hidden;
      background: white;
      transition: box-shadow 0.3s ease;
      direction: rtl;
    }
    table:hover {
      box-shadow: 0 8px 20px rgb(37 99 235 / 0.3);
    }
    thead tr {
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      color: white;
      font-weight: 700;
      font-size: 1.05rem;
    }
    thead th {
      padding: 14px 16px;
      text-align: center;
      user-select: none;
      letter-spacing: 0.04em;
    }
    tbody tr {
      transition: background-color 0.2s ease;
      border-radius: 12px;
      cursor: default;
    }
    tbody tr:hover {
      background: #eff6ff;
    }
    tbody td {
      padding: 13px 15px;
      text-align: center;
      color: #374151;
      border-bottom: 1px solid #e0e7ff;
      user-select: text;
    }

    .workout-section thead tr {
      background: linear-gradient(90deg, #6366f1, #818cf8);
    }
    .nutrition-section thead tr {
      background: linear-gradient(90deg, #059669, #34d399);
    }
    .supplement-section thead tr {
      background: linear-gradient(90deg, #10b981, #34d399);
    }

    .nutrition-section {
      background: #d1fae5;
      border-radius: 12px;
      padding: 20px;
      font-weight: 700;
      font-size: 1.1rem;
      color: #065f46;
      user-select: none;
      text-align: center;
      box-shadow: 0 5px 15px rgb(16 185 129 / 0.3);
      margin-top: 10px;
    }

    .supplement-section {
      background: #d1fae5;
      border-radius: 12px;
      padding: 20px;
      font-weight: 700;
      font-size: 1.1rem;
      color: #065f46;
      user-select: none;
      text-align: center;
      box-shadow: 0 5px 15px rgb(16 185 129 / 0.3);
      margin-top: 10px;
    }

    .section-title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      user-select: none;
      margin-bottom: 8px;
    }
    .section-title svg {
      width: 28px;
      height: 28px;
      stroke-width: 2.3;
      stroke: currentColor;
      color: #2563eb;
      transition: color 0.3s ease;
    }

    .workout-section .section-title svg {
      color: #6366f1;
    }
    .supplement-section .section-title svg {
      color: #10b981;
    }
    .nutrition-section .section-title svg {
      color: #059669;
    }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f3f4f6;
      border-top: 1px solid #d1d5db;
      color: #6b7280;
      font-weight: 600;
      font-size: 14px;
      user-select: none;
      text-align: center;
      padding: 12px 0;
      font-family: 'Vazir', sans-serif;
      z-index: 1000;
    }

    @media (max-width: 650px) {
      .athlete-info {
        font-size: 0.95rem;
        flex-direction: column;
      }
      .info-item {
        min-width: 100%;
        justify-content: center;
      }
      h1 {
        font-size: 2rem;
      }
      h2 {
        font-size: 1.4rem;
      }
      tbody td, thead th {
        font-size: 0.9rem;
        padding: 10px 8px;
      }
    }

    @media print {
      body {
        background: white !important;
        color: black !important;
        margin: 0;
        padding: 0;
        font-size: 14pt;
      }
      main {
        box-shadow: none !important;
        border-radius: 0 !important;
        padding: 0 !important;
      }
      table {
        border-collapse: collapse !important;
        width: 100% !important;
        box-shadow: none !important;
      }
      thead tr {
        background: #ddd !important;
        color: black !important;
      }
      tbody tr:hover {
        background: transparent !important;
      }
      footer {
        display: none !important;
      }
      .section-title svg {
        display: none !important;
      }
      .athlete-info {
        background: none !important;
        box-shadow: none !important;
        color: black !important;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>${data.gymName}</h1>

    <section class="athlete-info" aria-label="اطلاعات باشگاه، مربی و شاگرد">
      <div class="info-item" title="نام باشگاه">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        <span>باشگاه: ${data.gymName}</span>
      </div>
      ${data.gymAddress ? `
      <div class="info-item" title="آدرس باشگاه">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <span>${data.gymAddress}</span>
      </div>
      ` : ''}

      <div class="info-item" title="نام مربی">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-3-3.87"/><path d="M4 21v-2a4 4 0 013-3.87"/><circle cx="12" cy="7" r="4"/></svg>
        <span>مربی: ${data.trainerName}</span>
      </div>
      <div class="info-item" title="شماره موبایل مربی">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 01-2.18 2A19.91 19.91 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.12.87.37 1.7.72 2.47a2 2 0 01-.45 2.11L8.1 10.9a16 16 0 007 7l1.6-1.6a2 2 0 012.11-.45c.77.35 1.6.6 2.47.72a2 2 0 011.72 2.01z"/></svg>
        <span>${data.trainerPhone}</span>
      </div>

      <div class="info-item" title="نام شاگرد">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-3-3.87"/><path d="M4 21v-2a4 4 0 013-3.87"/><circle cx="12" cy="7" r="4"/></svg>
        <span>شاگرد: ${data.studentName}</span>
      </div>
      <div class="info-item" title="شماره موبایل شاگرد">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 01-2.18 2A19.91 19.91 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.12.87.37 1.7.72 2.47a2 2 0 01-.45 2.11L8.1 10.9a16 16 0 007 7l1.6-1.6a2 2 0 012.11-.45c.77.35 1.6.6 2.47.72a2 2 0 011.72 2.01z"/></svg>
        <span>${data.studentPhone}</span>
      </div>
      <div class="info-item" title="قد شاگرد">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 3v18"/><path d="M18 3v18"/><path d="M6 12h12"/></svg>
        <span>قد: ${data.studentHeight} سانتی‌متر</span>
      </div>
      <div class="info-item" title="وزن شاگرد">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <span>وزن: ${data.studentWeight} کیلوگرم</span>
      </div>

      ${data.instagram ? `
      <div class="info-item" title="اینستاگرام باشگاه">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        <span>اینستاگرام: ${data.instagram}</span>
      </div>
      ` : ''}
      ${data.website ? `
      <div class="info-item" title="وب‌سایت باشگاه">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.59 3 4 6.59 4 11c0 4.41 3.59 8 8 8s8-3.59 8-8c0-4.41-3.59-8-8-8z"/><path d="M2 12h20"/></svg>
        <span>سایت: <a href="${data.website}" target="_blank" class="text-blue-600 underline">${data.website}</a></span>
      </div>
      ` : ''}
    </section>

    ${data.exercises.length > 0 ? `
    <section class="workout-section" aria-labelledby="workout-title" style="margin-top: 40px;">
      <h2 id="workout-title" class="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 1 1 4 0v6m4-2v-2a4 4 0 1 0-8 0v2"/></svg>
        تمرینات بدنسازی
      </h2>
      <table role="table" aria-describedby="workout-desc">
        <thead>
          <tr>
            <th scope="col">شماره</th>
            <th scope="col">تکرار</th>
            <th scope="col">ست</th>
            <th scope="col">نام تمرین</th>
          </tr>
        </thead>
        <tbody>
          ${data.exercises.map(exercise => `
          <tr><td>${exercise.index}</td><td>${exercise.reps}</td><td>${exercise.sets}</td><td>${exercise.name}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>
    ` : ''}

    ${data.meals.length > 0 ? `
    <section class="nutrition-section" aria-labelledby="nutrition-title">
      <h2 id="nutrition-title" class="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.66 0 3-1.34 3-3S13.66 2 12 2 9 3.34 9 5s1.34 3 3 3zm-7 11c0-3.31 2.69-6 6-6s6 2.69 6 6"/></svg>
        برنامه غذایی
      </h2>
      <table role="table" aria-describedby="nutrition-desc">
        <thead>
          <tr>
            <th scope="col">شماره</th>
            <th scope="col">روز</th>
            <th scope="col">وعده غذایی</th>
            <th scope="col">نام غذا</th>
          </tr>
        </thead>
        <tbody>
          ${data.meals.map(meal => `
          <tr><td>${meal.index}</td><td>${meal.day}</td><td>${meal.mealType}</td><td>${meal.name}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>
    ` : ''}

    ${data.supplements.length > 0 ? `
    <section class="supplement-section" aria-labelledby="supplement-title">
      <h2 id="supplement-title" class="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8"/></svg>
        مکمل‌ها و ویتامین‌ها
      </h2>
      <table role="table" aria-describedby="supplement-desc">
        <thead>
          <tr>
            <th scope="col">شماره</th>
            <th scope="col">دوز مصرف</th>
            <th scope="col">زمان مصرف</th>
            <th scope="col">نام مکمل یا ویتامین</th>
          </tr>
        </thead>
        <tbody>
          ${data.supplements.map(supplement => `
          <tr><td>${supplement.index}</td><td>${supplement.dosage}</td><td>${supplement.timing}</td><td>${supplement.name}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>
    ` : ''}
  </main>

  <footer aria-label="اطلاعات تماس و شبکه‌های اجتماعی">
    ${data.website ? `وب‌سایت: <a href="${data.website}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">${data.website}</a>` : ''}
    ${data.instagram && data.website ? ' | ' : ''}
    ${data.instagram ? `اینستاگرام: <a href="https://instagram.com/${data.instagram}" target="_blank" rel="noopener" class="text-pink-600 hover:underline">${data.instagram}</a>` : ''}
    ${(data.instagram || data.website) && data.trainerPhone ? ' | ' : ''}
    موبایل: ${data.trainerPhone}
  </footer>
</body>
</html>`;
}
