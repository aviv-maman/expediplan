const currentYear = new Date().getFullYear();
const footerProps = {
  text: `© 2022-${currentYear} Aviv Maman. All rights reserved.`,
  links: [
    { link: '/', label: 'Home', targetSegment: null },
    { link: '/help', label: 'Help', targetSegment: 'help' },
  ],
};

export default footerProps;
