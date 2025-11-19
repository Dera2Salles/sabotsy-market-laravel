import { ThemeProvider } from '@/theme/useThemeProvider';
import { LandingPageLayout } from './components/LandingPageLayout';
import { ProductProvider } from './context/productProvider';
import { Modalprovider } from './context/useModalProvider';

export const LandingPage = () => {
    return (
        <>
            <ThemeProvider>
                <ProductProvider>
                    <Modalprovider>
                        <LandingPageLayout />
                    </Modalprovider>
                </ProductProvider>
            </ThemeProvider>
        </>
    );
};
