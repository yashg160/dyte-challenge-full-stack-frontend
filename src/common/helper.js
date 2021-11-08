export const getProperShortLink = (slug) => {
  return `https://${process.env.REACT_APP_SHORT_LINK_DOMAIN}/${slug}`;
};
