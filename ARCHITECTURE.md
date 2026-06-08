# Portfolio Loyihasi Arxitekturasi

Ushbu hujjat shaxsiy portfolio veb-ilovasining texnik tuzilishi va ishlash tamoyillarini tavsiflaydi.

## 1. Texnologiyalar To'plami (Tech Stack)

- **Frontend:** React.js (v19)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React va React Icons
- **Routing:** React Router DOM

## 2. Loyiha Tuzilishi (File Structure)

```text
src/
├── components/        # Qayta ishlatiladigan UI komponentlar (Sidebar, Pickerlar)
├── context/           # Global holatni boshqarish (Til, Mavzu)
├── pages/             # Asosiy sahifalar (Home, Skills, Portfolio)
├── translations/      # Statik tarjima fayllari (UZ, EN, RU)
└── assets/            # Rasmlar va shriftlar
```

## 3. Asosiy Funksional Tizimlar

### A. Ko'p Tilli Tizim (i18n Implementation)
Dasturda xalqaro standartlarga mos, lekin soddalashtirilgan o'ziga xos i18n tizimi qo'llanilgan:
- **LanguageContext:** Tanlangan tilni (`uz`, `en`, `ru`) saqlaydi va `localStorage` orqali brauzer xotirasida saqlab qoladi.
- **t(key) funksiyasi:** Nuqtali kalitlar orqali (`nav.home` kabi) statik lug'atdan kerakli matnni dinamik ravishda olib beradi.
- **Dinamik Kontent:** Hatto Typewriter effekti kabi murakkab animatsiyalar ham lug'atdagi massivlar asosida ishlaydi.

### B. Mavzular Boshqaruvi (Theme Management)
- **CSS Variables:** Ranglar Tailwind bilan integratsiya qilingan CSS o'zgaruvchilari orqali boshqariladi.
- **ThemeContext:** Foydalanuvchi tanlagan mavzuni butun ilovaga tatbiq etadi.
- **Mavjud Mavzular:** Loyihada 5 xil ranglar palitrasidan foydalanilgan: `Light Steel`, `Vivid Nightfall`, `Purple Cascade`, `Fresh Greens` va `Pink Ombre`.
- **Dinamik Switcher:** Foydalanuvchiga real vaqt rejimida ranglar palitrasini o'zgartirish imkonini beradi.

### C. Navigatsiya va Sidebar
- Sidebar ilovaning asosiy boshqaruv markazi hisoblanadi.
- **Desktop:** Chap tomonda vertikal holatda turadi.
- **Mobile:** Pastki qismda "Floating" (suzuvchi) menyu shakliga o'tadi.
- **Integratsiya:** Til va mavzu sozlamalari Sidebarga modal/popover shaklida ixcham joylashtirilgan.

## 4. Komponentlar Arxitekturasi

1.  **Sidebar.jsx:** Navigatsiya havolalari va sozlamalar (Theme/Language) konteyneri.
2.  **LanguagePicker.jsx:** Framer Motion yordamida animatsiya qilingan, mobile-friendly til tanlash modali.
3.  **Home.jsx:** Ko'p tilli massivlar asosida ishlovchi reaktiv "Typewriter" effekti.
4.  **Portfolio.jsx:** Loyihalar ro'yxatini lug'atdan olib, gradient kartalar shaklida ko'rsatuvchi sahifa.
5.  **Skills.jsx:** Texnologik ko'nikmalarni vizual progress-bar va suzuvchi ikonkalar orqali namoyish etadi.

## 5. Ma'lumotlar Oqimi (Data Flow)

1.  Foydalanuvchi tilni o'zgartiradi.
2.  `LanguageContext` `language` holatini yangilaydi va `localStorage`ga yozadi.
3.  React Context barcha komponentlarga qayta render buyrug'ini beradi.
4.  `t()` funksiyasi yangilangan til kaliti bo'yicha lug'atdan yangi qiymatlarni qaytaradi.
5.  UI bir zumda yangi tilda namoyon bo'ladi.

## 6. Dizayn va UX

- **Responsive:** Barcha o'lchamlardagi ekranlar uchun moslashtirilgan.
- **Interaktivlik:** Har bir tugma va karta uchun Framer Motion orqali "Haptic-like" (teginishga sezgir) animatsiyalar qo'shilgan.
- **Glassmorphism:** `backdrop-blur` va yarim shaffof ranglar orqali zamonaviy dizayn uslubi qo'llanilgan.

## 7. Optimallashtirish va Build

- **React 19:** Eng so'nggi versiya imkoniyatlaridan foydalangan holda renderlash optimallashtirilgan.
- **Vite HMR:** Dasturlash jarayonida tezkor "Hot Module Replacement" ta'minlangan.
- **Tailwind JIT:** Faqat ishlatilgan CSS klasslari build tarkibiga kirishi orqali fayl hajmi minimallashtirilgan.

---
*Tuzuvchi: Elnurbek*
*Sana: 2026-yil*