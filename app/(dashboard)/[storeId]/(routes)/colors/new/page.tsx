import { ColorForm } from "../[colorId]/components/color-form";

const NewColorPage = () => {
  return (
    <div className="p-8">
      <ColorForm initialData={null} /> {/* null pentru că e creare */}
    </div>
  );
};

export default NewColorPage;
