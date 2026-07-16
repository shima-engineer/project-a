import BasicInfoSection from "./BasicInfoSection";
import DetailsSection from "./DetailsSection";
import MediaSection from "./MediaSection";
import SocialLinksSection from "./SocialLinksSection";

const ProductSubmitForm = () => {
  return (
    <form>
      <BasicInfoSection />
      <DetailsSection />
      <MediaSection />
      <SocialLinksSection />
    </form>
  );
};

export default ProductSubmitForm;
