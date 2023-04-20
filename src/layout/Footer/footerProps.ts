const currentYear = new Date().getFullYear();
const footerProps = {
  text: `© 2022-${currentYear} Aviv Maman. All rights reserved.`,
  links: [
    { link: '/', label: 'Home' },
    { link: '/help', label: 'Help' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Store' },
    { link: '#', label: 'Careers' },
  ],
};

export default footerProps;
