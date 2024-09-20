import Header from './header';
import { Outlet } from "react-router-dom";
import Footer from './footer';
import ScrollToTop from '../../shared/utils/ScrollToTop';

const Layout = () => {

    return (
        <>
            <div className="relative z-10">
            <ScrollToTop />
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    )
};

export default Layout;

