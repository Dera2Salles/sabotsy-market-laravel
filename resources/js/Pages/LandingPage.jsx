import { LandingPage } from '@/pages/landingPage';
import { ProductProvider } from '@/pages/landingPage/context/productProvider';

const landing = () => {
    return (
        <ProductProvider>
            <LandingPage />
        </ProductProvider>
    );
};

export default landing;
