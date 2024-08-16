import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

import Container from "@/components/Container";
import CldImage from "@/components/CldImage";
import Button from "@/components/Button";
import { getSession } from "next-auth/react";
import { Box } from "@mui/material";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}
async () => {};
async function Home() {
  const { resources: sneakers } = await cloudinary.api.resources_by_tag("nextjs-server-actions-upload-sneakers", {
    context: true
  });

  async function create(formData: FormData) {
    "use server";
    try {
      const file = formData.get("image") as File;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["thanusan"],
              upload_preset: "tmk-property-group"
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            }
          )
          .end(buffer);
      });

      // Handle the result if needed
      console.log(result);
      revalidatePath("/");
    } catch (error) {
      console.error("Error uploading image:", error);
      // You might want to show an error message to the user here
    }
  }

  return (
    <Container>
      <h2 className="text-xl font-bold mb-4">Add a New Image</h2>
      <form action={create} className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6">
        <p className="mb-6">
          <label htmlFor="image" className="block font-semibold text-sm mb-2">
            Select an Image to Upload
          </label>
          <input
            id="image"
            className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="file"
            name="image"
            required
          />
        </p>
        <Button>Submit</Button>
      </form>
      <h2 className="text-xl font-bold mb-4">Images</h2>
      <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {sneakers.map((sneaker: CloudinaryResource) => {
          return (
            <li key={sneaker.public_id} className="rounded overflow-hidden bg-white dark:bg-slate-700">
              <Box className="relative" width={200} height={200}>
                <CldImage
                  src={sneaker.public_id}
                  alt={sneaker.context?.alt || ""}
                  width="100"
                  height="200"
                  crop="fill"
                  gravity="center"
                />
              </Box>
              {sneaker.context?.caption && (
                <div className="py-4 px-5">
                  <p className="mb-1 text-md font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                    {sneaker.context?.caption || ""}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default Home;
