import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mental.gym',
  appName: 'Mental Gym',
  webDir: 'out',
  server: {
    url: 'https://fabulous-liger-df8fc6.netlify.app',
    cleartext: true
  }
};

export default config;
