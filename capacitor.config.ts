import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.residencedrone.app',
  appName: 'test5',
  webDir: 'dist/test5/browser',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: {androidScheme: "http"}
};

export default config;
