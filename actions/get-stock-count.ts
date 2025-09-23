import prismadb from "@/lib/prismadb";
import { orderColumns } from "@tanstack/react-table";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
