import { features } from "process";
import data from "../data.json";

export async function GET() {
  const featureProduct = data.products.filter((product) => product.featured);
  return Response.json(featureProduct);
}
