const FaqJsonLD = (data) => {
  if (!data.data) {
    return null;
  }
  let check = 0;
  let faqOut =
    '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[';

  data.data.map(function (d) {
    let faqQ =
      '{"@type":"Question","name":"' +
      d.question +
      '","acceptedAnswer":{"@type":"Answer","text":"' +
      d.answer +
      '"}},';
    if (d.answer) {
      check = 1;
    }
    faqOut = faqOut + faqQ;
  });
  if (!check) {
    return null;
  }
  faqOut = faqOut.substring(0, faqOut.length - 1); // remove last comma
  faqOut = faqOut + "]}'};";
  // console.log (faqOut);
  const faq = {
    __html: faqOut,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={faq}
      key="faq-jsonld"
    />
  );
};

export default FaqJsonLD;
