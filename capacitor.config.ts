import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.80314e52784a4af8b58cb6398b0f71db',
  appName: 'instant-handyman-app',
  webDir: 'dist',
  server: {
    url: 'https://80314e52-784a-4af8-b58c-b6398b0f71db.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;