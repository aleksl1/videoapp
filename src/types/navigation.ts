// Navigation type definitions for Expo Router
export type RootStackParamList = {
  '(tabs)': undefined;
  'video/[id]': { id: string };
  settings: undefined;
};

export type TabsParamList = {
  index: undefined;
  search: { query?: string };
};
