export const environment = process.env as NodeJS.ProcessEnv & {
    mode: 'production' | 'test' | 'development';
};
