import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sathi.ai.app',
  appName: 'Sathi',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;