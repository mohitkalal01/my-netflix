const Footer = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center text-brand-gray">
        <p>&copy; {new Date().getFullYear()} My-netflix. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-brand-light">Terms of Use</a>
          <a href="#" className="hover:text-brand-light">Privacy Policy</a>
          <a href="#" className="hover:text-brand-light">Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
