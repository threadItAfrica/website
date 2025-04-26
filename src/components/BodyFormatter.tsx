import { PortableText } from "next-sanity"
import { TypedObject } from "@portabletext/types"
import Image from "next/image" 
import { urlFor } from "@/sanity/image"

interface BodyFormatterProps {
  body: TypedObject | TypedObject[]
}

export const BodyFormatter = ({ body }: BodyFormatterProps) => {
  const getHeaderId = (children: React.ReactNode) => {
    if (!children) return '';
    return children.toString().toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="prose text-[1rem] lg:text-xl lg:prose-xl">
      {Array.isArray(body) && (
        <PortableText
          value={body}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="text-gray-600 text-md md:text-lg my-8">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 id={getHeaderId(children)} className="text-gray-700 text-md md:text-lg mt-4 mb-2  font-[600] flex gap-2 items-center">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 id={getHeaderId(children)} className="text-gray-700 text-md md:text-lg mt-4 mb-2  font-[600] flex gap-2 items-center">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 id={getHeaderId(children)} className="text-gray-700 text-md md:text-lg mt-4 mb-2 font-[600] flex gap-2 items-center">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h3 id={getHeaderId(children)} className="text-gray-700 text-md md:text-lg mt-4 mb-2  font-[600] flex gap-2 items-center">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h3>
              ),
              h5: ({ children }) => (
                <h3 id={getHeaderId(children)} className="text-gray-700 text-md md:text-lg mt-4 mb-2 font-[600] flex gap-2 items-center">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h3>
              ),
              h6: ({ children }) => (
                <h3 id={getHeaderId(children)} className="text-gray-700 text-md md:text-lg mt-4 mb-2  font-[600] flex gap-2 items-center">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary text-md md:text-lg pl-4 italic text-gray-600 my-8">
                  {children}
                </blockquote>
              ),
            },
            types: {
              image: ({ value }) => (
                <div className="bg-cover bg-center w-full md:w-[80%] h-[100%]">
                  <Image
                    src={urlFor(value).url()}
                    alt={value.alt || "Post Image"}
                    className="aspect-auto"
                    width={1550}
                    height={1310}
                  />
                </div>
              ),
            },
          }}
        />
      )}
    </div> 
  )
}
