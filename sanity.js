import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const client = createClient({
    projectId: "ic6jzg35",
    dataset: "production",
    useCdn: true,
    apiVersion:"2023-07-26",
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;