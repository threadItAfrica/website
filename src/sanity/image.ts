import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client"; 
import { Any } from "next-sanity";
 

const builder = createImageUrlBuilder(client);

export function urlFor(source: Any) {
  return builder.image(source);
}