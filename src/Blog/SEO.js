// src/components/SEO.js
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
  console.log(title, description);
  return (
    // <Helmet>
    <>
      {/* <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} /> */}
      {/* </Helmet> */}
    </>
  );
};

export default SEO;
