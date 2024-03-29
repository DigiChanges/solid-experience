import { createPalette } from '@hope-ui/core';

export const colors = {
    colors: {
        dark: {
            primary: createPalette({
                50: '#E1F8FA',
                100: '#00C2D7',
                200: '#05A2C2',
                300: '#00647D',
                400: '#064150',
                500: '#073844',
                600: '#07303B',
                700: '#072830',
                800: '#061E24',
                900: '#07191D'
            }),
            info: createPalette({
                50: '#EAF6FF',
                100: '#52A9FF',
                200: '#369EFF',
                300: '#0091FF',
                400: '#0954A5',
                500: '#0A4481',
                600: '#0D3868',
                700: '#102A4C',
                800: '#10243E',
                900: '#0F1B2D'
            }),
            neutral: createPalette({
                50: '#ECEDEE',
                100: '#9BA1A6',
                200: '#787F85',
                300: '#697177',
                400: '#3A3F42',
                500: '#2B2F31',
                600: '#26292B',
                700: '#202425',
                800: '#1A1D1E',
                900: '#151718'
            }),
            danger: createPalette({
                50: '#FEECEE',
                100: '#FF6369',
                200: '#F2555A',
                300: '#E5484D',
                400: '#AA2429',
                500: '#822025',
                600: '#671E22',
                700: '#541B1F',
                800: '#3C181A',
                900: '#291415'
            }),
            warning: createPalette({
                50: '#FEF3DD',
                100: '#F1A10D',
                200: '#FFCB47',
                300: '#FFB224',
                400: '#824E00',
                500: '#573300',
                600: '#3F2200',
                700: '#341C00',
                800: '#271700',
                900: '#1F1300'
            }),
            success: createPalette({
                50: '#E5FBEB',
                100: '#4CC38A',
                200: '#3CB179',
                300: '#30A46C',
                400: '#236E4A',
                500: '#164430',
                600: '#113123',
                700: '#0F291E',
                800: '#0C1F17',
                900: '#0D1912'
            })
        }
    }
};
