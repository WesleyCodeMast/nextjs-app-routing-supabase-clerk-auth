const OrgSchema = () => {
  const org = `
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "All Free Chips",
      "alternateName": "https://www.allfreechips.com/",
      "url": "https://www.allfreechips.com/",
      "logo": "https://www.allfreechips.com/images/logo.png"
    }
   `;
  const orgOut = {
    __html: org,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={orgOut} />;
};
export default OrgSchema;
