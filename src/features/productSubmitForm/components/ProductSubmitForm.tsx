import BasicInfoSection from "./BasicInfoSection";
import DetailsSection from "./DetailsSection";
import MediaSection from "./MediaSection";

const ProductSubmitForm = () => {
  return (
    <form>
      <BasicInfoSection />
      <DetailsSection />
      <MediaSection />
    </form>
  );
};

export default ProductSubmitForm;
