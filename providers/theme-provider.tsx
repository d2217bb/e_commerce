"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

model Store {
id          String        @id @default(uuid())
name        String
userId      String
billboards  Billboard[]   @relation("StoreToBillboard")
sizes       Size[]        @relation("StoreToSize")
colors      Color[]       @relation("StoreToColor")
categories  Category[]    @relation("StoreToCategory")
products    Product[]     @relation("StoreToProduct")
orders      Order[]       @relation("StoreToOrder")
createdAt   DateTime      @default(now())
updatedAt   DateTime      @updatedAt
}

model Billboard {
id          String        @id @default(uuid())
storeId     String
store       Store         @relation("StoreToBillboard", fields: [storeId], references: [id])
label       String
imageUrl    String
categories  Category[]
createdAt   DateTime      @default(now())
updatedAt   DateTime      @updatedAt

@@index([storeId])
}


model Category {
id          String        @id @default(uuid())
storeId     String
store       Store         @relation("StoreToCategory", fields: [storeId], references:[id])
billboardId String
billboard   Billboard     @relation(fields: [billboardId], references: [id])
products    Product[]     @relation("CategoryToProduct")
name        String
createdAt   DateTime      @default(now())
updatedAt   DateTime      @updatedAt

@@index([storeId])
@@index([billboardId])
}


model Size {
id          String        @id @default(uuid())
storeId     String
store       Store         @relation("StoreToSize", fields: [storeId], references: [id])
name        String
value       String
products    Product[]
createdAt   DateTime      @default(now())
updatedAt   DateTime      @updatedAt

@@index([storeId])
}
model Color {
id          String        @id @default(uuid())
storeId     String
store       Store         @relation("StoreToColor", fields: [storeId], references: [id])
name        String
value       String
products    Product[]
createdAt   DateTime      @default(now())
updatedAt   DateTime      @updatedAt

@@index([storeId])
}