import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black">
            <section className="flex flex-col items-center gap-10">
                <div className="w-[200px] mt-5">
                    <img src="/images/marvel_Logo.png" alt="" />
                </div>
                <div className="text-white flex flex-col items-center gap-5">
                    <ul className="flex gap-10 font-medium text-xl">
                        <li><Link to="">Home</Link></li>
                        <li><Link to="/comics">Comics</Link></li>
                        <li><Link to="/characters">Characters</Link></li>
                    </ul>
                    <p className="font-medium text-sm my-6">Stay updated with the latest from Marvel. © 2024 Marvel. All Rights Reserved.</p>
                </div>
            </section>

        </footer>
    )
}

export default Footer;