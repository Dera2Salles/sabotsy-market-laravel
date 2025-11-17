import { LandingPage } from '@/pages/landingPage';
import { ProductProvider } from '@/pages/landingPage/context/productProvider';
import { Modalprovider } from '@/pages/landingPage/context/useModalProvider';
import { ThemeProvider } from '@/theme/useThemeProvider';
const landing = () => {
    return (
        <ThemeProvider>
            <ProductProvider>
                <Modalprovider>
                    <LandingPage />
                </Modalprovider>
            </ProductProvider>
        </ThemeProvider>
    );
};

export default landing;
