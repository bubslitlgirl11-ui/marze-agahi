import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ir.marzeagahi.app',
  appName: 'مرز آگاهی',
  webDir: 'public',
  server: {
    // برای تست و اجرای زنده در شبکه محلی وای‌فای (یا قرار دادن آدرس دامنه اصلی)
    url: 'http://10.230.23.226:3000',
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#030712',
  },
};

export default config;
