// ============================================================
//  app.config.ts — Universal Tauri App Configuration
//  Barcha loyiha sozlamalarini shu fayldan o'zgartiring
// ============================================================

export const AppConfig = {
  // ── App Identity ─────────────────────────────────────────
  name: "MyApp",
  version: "1.0.0",
  description: "Your app description",

  // ── Titlebar ─────────────────────────────────────────────
  titlebar: {
    // "custom" = o'z dizayningiz | "native" = OS titlebar
    type: "custom" as "custom" | "native",

    height: 40,
    showTitle: true,
    showIcon: true,
    iconPath: "/icons/icon.png", // public/ papkasidan

    // Tugmalar tartibi: "left" (macOS) | "right" (Windows)
    controlsPosition: "right" as "left" | "right",

    // Qaysi tugmalar ko'rinsin
    controls: {
      minimize: true,
      maximize: true,
      close: true,
    },

    // Style — barcha qiymatlar CSS custom property sifatida ishlatiladi
    style: {
      // "app" = AppConfig.theme ranglaridan oladi
      // yoki to'g'ridan-to'g'ri rang bering: "#1a1a2e"
      background: "app",        // "app" | hex | hsl(...)
      foreground: "app",        // "app" | hex
      borderBottom: true,
      borderColor: "app",       // "app" | hex
      blur: false,              // backdrop-filter blur (macOS-da chiroyli)
      blurAmount: "12px",

      // Hover effektlari
      buttonHoverBg: "rgba(255,255,255,0.1)",
      closeHoverBg: "#e81123",  // Windows-style qizil
    },
  },

  // ── Theme ─────────────────────────────────────────────────
  theme: {
    // Dastur ishga tushganda qaysi mode? "light" | "dark" | "system"
    defaultMode: "system" as "light" | "dark" | "system",

    // Saqlash joyi: "localStorage" | "none"
    persist: "localStorage" as "localStorage" | "none",

    light: {
      background:     "hsl(0 0% 100%)",
      surface:        "hsl(0 0% 97%)",
      surfaceAlt:     "hsl(0 0% 94%)",
      border:         "hsl(0 0% 88%)",
      textPrimary:    "hsl(0 0% 9%)",
      textSecondary:  "hsl(0 0% 40%)",
      textMuted:      "hsl(0 0% 60%)",
      accent:         "hsl(221 83% 53%)",
      accentFg:       "hsl(0 0% 100%)",
      accentHover:    "hsl(221 83% 45%)",
      success:        "hsl(142 71% 45%)",
      warning:        "hsl(38 92% 50%)",
      danger:         "hsl(0 84% 60%)",
      titlebarBg:     "hsl(0 0% 98%)",
      titlebarFg:     "hsl(0 0% 9%)",
      titlebarBorder: "hsl(0 0% 88%)",
    },

    dark: {
      background:     "hsl(222 14% 9%)",
      surface:        "hsl(222 14% 12%)",
      surfaceAlt:     "hsl(222 14% 16%)",
      border:         "hsl(222 14% 22%)",
      textPrimary:    "hsl(0 0% 95%)",
      textSecondary:  "hsl(0 0% 65%)",
      textMuted:      "hsl(0 0% 45%)",
      accent:         "hsl(217 91% 60%)",
      accentFg:       "hsl(0 0% 100%)",
      accentHover:    "hsl(217 91% 68%)",
      success:        "hsl(142 70% 50%)",
      warning:        "hsl(38 92% 55%)",
      danger:         "hsl(0 84% 65%)",
      titlebarBg:     "hsl(222 14% 7%)",
      titlebarFg:     "hsl(0 0% 95%)",
      titlebarBorder: "hsl(222 14% 18%)",
    },
  },

  // ── Window Defaults ───────────────────────────────────────
  window: {
    rememberSize: true,       // Oyna o'lchamini saqlash
    rememberPosition: true,   // Oyna pozitsiyasini saqlash
    minWidth: 400,
    minHeight: 300,
  },

  // ── Sidebar (agar loyihada sidebar bo'lsa) ─────────────────
  sidebar: {
    enabled: true,
    defaultWidth: 240,
    minWidth: 180,
    maxWidth: 400,
    collapsible: true,
    defaultCollapsed: false,
    position: "left" as "left" | "right",
  },

  // ── Shortcuts ─────────────────────────────────────────────
  shortcuts: {
    toggleTheme:    "ctrl+shift+t",
    toggleSidebar:  "ctrl+b",
    openSettings:   "ctrl+,",
    search:         "ctrl+k",
  },

  // ── Features (feature flags) ──────────────────────────────
  features: {
    search: true,
    notifications: true,
    autoUpdate: false,
    analytics: false,
    devtools: import.meta.env.DEV,
  },
} as const;

// ── Type exports ─────────────────────────────────────────────
export type AppTheme = typeof AppConfig.theme.light;
export type ThemeMode = "light" | "dark";
export type TitlebarConfig = typeof AppConfig.titlebar;
