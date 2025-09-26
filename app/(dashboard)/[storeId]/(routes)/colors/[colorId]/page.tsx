import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form"; // Editare culoare

interface ColorPageProps {
  params: { colorId: string };
}

const ColorPage = async ({ params }: ColorPageProps) => {
  if (!params.colorId) {
    return <div>Color ID missing</div>;
  }

  const color = await prismadb.color.findUnique({
    where: { id: params.colorId },
  });

  if (!color) {
    return <div>Color not found</div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;

