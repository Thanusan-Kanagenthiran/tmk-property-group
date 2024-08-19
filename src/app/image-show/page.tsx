import { v2 as cloudinary } from "cloudinary";
import Container from "@/components/Container";
import CldImage from "@/components/CldImage";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
}
async () => {};
async function Home() {
  const { resources: images } = await cloudinary.api.resources_by_tag("thanusan", {
    context: true
  });

  return (
    <Container>
      <h2 className="text-xl font-bold mb-4">Images</h2>
      <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {images.map((sneaker: CloudinaryResource) => {
          return (
            <li key={sneaker.public_id} className="rounded overflow-hidden bg-white dark:bg-slate-700">
              <div className="relative">
                <CldImage width={800} height={600} src={sneaker.public_id} alt="" />
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default Home;
