"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Color {
  id: string;
  name: string;
  value: string;
}

const ColorsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColors = async () => {
      if (!params.storeId) return;
      try {
        const res = await axios.get(`/api/${params.storeId}/colors`);
        setColors(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchColors();
  }, [params.storeId]);

  const handleCreate = () => {
    router.push(`/${params.storeId}/colors/new`);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Colors</h1>
        <Button onClick={handleCreate}>Create Color</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : colors.length === 0 ? (
        <div>No colors yet</div>
      ) : (
        <ul className="space-y-2">
          {colors.map((color) => (
            <li key={color.id} className="flex justify-between items-center">
              <span>{color.name} ({color.value})</span>
              <Button
                size="sm"
                onClick={() =>
                  router.push(`/${params.storeId}/colors/${color.id}`)
                }
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ColorsPage;



