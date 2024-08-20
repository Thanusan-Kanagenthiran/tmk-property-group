"use server";
import ABC from "@/components/abc";
import { revalidatePath } from "next/cache";
revalidatePath("/abc");
const Page = () => {
  return <ABC />;
};

export default Page;
