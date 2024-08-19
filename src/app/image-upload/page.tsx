import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import Container from "@/components/Container";
import Button from "@/components/Button";
import ImageList from "./ImageList";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
      // Handle error (e.g., show message to user)
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
      <ImageList sneakers={sneakers} />
    </Container>
  );
}

export default Home;
