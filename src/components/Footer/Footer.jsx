import './style.css'

const Footer = () => {
    const date = new Date();
    const fullYear = date.getFullYear();

    return (
        <div className='correct'>
            <footer className="footer">
                <p>
                    Sklep obuwniczy &copy; {fullYear}
                </p>
            </footer>
        </div>
            
    );
};

export default Footer;