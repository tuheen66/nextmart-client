
import Logo from '@/assets/svgs/Logo';
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "App Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", Icon: FaFacebook },
    { href: "#", Icon: BsInstagram },
    { href: "#", Icon: FaXTwitter },
  ];
  return (
    <footer className="bg-white border-t border-gray-200 py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black flex items-center">
              
                        <Logo />
              Next Mart
            </h1>
          </div>
          <p className="text-gray-600 mt-3 w-1/2">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
        </div>

        <hr />
        <ul className="flex justify-center space-x-6 text-sm text-gray-800 font-medium my-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-purple-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center space-x-4">
          {socialLinks.map(({ href, Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-purple-600"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
