const ProSchema = (data) => {
  const name = data.name;
  const product = data.product;
  const author = "AFC Chris";
  const prosCons = data.prosCons;
  if (!data.prosCons) {
    return null;
  }

  const ratingv = data?.rating ?? 5;
  //(ratingv);
  let counter = 1;
  let pros = "";
  prosCons.pros?.map(function (d) {
    pros =
      pros +
      `
    {
      "@type": "ListItem",
      "position": ${counter},
      "name": "${d.title}: ${d.content}"
    },`;
    counter++;
  });
  counter = 1;
  let cons = "";
  prosCons.cons?.map(function (d) {
    cons =
      cons +
      `
    {
      "@type": "ListItem",
      "position": ${counter},
      "name": "${d.title}: ${d.content}"
    },`;
    counter++;
  });
  if (!pros || !cons) {
    // if we did not have both return nothing
    return null;
  }
  cons = cons.substring(0, cons.length - 1); // remove last comma
  pros = pros.substring(0, pros.length - 1); // remove last comma

  let proCon = `
      {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${product}",
      "review": {
        "@type": "Review",
        "name": "${name}",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "${ratingv}"
        },
        "author": {
          "@type": "Person",
          "name": "${author}"
        },
        "positiveNotes": {
          "@type": "ItemList",
          "itemListElement": [
           ${pros}
          ]
        },
        "negativeNotes": {
          "@type": "ItemList",
          "itemListElement": [
             ${cons}
          ]
        }
      }
    }
    `;
  // console.log (faqOut);
  const pro = {
    __html: proCon,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={pro} />;
};

export default ProSchema;
