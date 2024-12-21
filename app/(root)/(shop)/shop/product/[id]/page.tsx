import { getProductById } from "@/lib/actions/shop/getProductById";
import { Product } from "@prisma/client";
import ProductPage from "@/components/shop/ProductPage";
import { currentUser } from "@/lib/actions/authActions";
import ProductDeleteButton from "@/components/shop/ProductDeleteButton";

const Page = async ( {params} : {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id;
  const user = await currentUser();
console.log(id)
  const product: Product | null = await getProductById(id);
    if (!product) {
      return <div>Product not found</div>;
    }

  return (
    <div>
      {
        user?.role === 'ADMIN' && (
          <div className="container">
            <ProductDeleteButton id={id}/>
          </div>
        )
      }
      <ProductPage product={product} />
    </div>
  );
};

export default Page;
