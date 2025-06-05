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
    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none font-body">
      {Array.isArray(body) && (
        <PortableText
          value={body}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-body py-2 md:py-3">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 id={getHeaderId(children)} className="text-black text-xl sm:text-2xl md:text-3xl font-[500] md:mt-6 md:mb-3 my-2 flex gap-2 items-center font-heading">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 id={getHeaderId(children)} className="text-black text-lg sm:text-xl md:text-2xl font-[500] md:mt-6 md:mb-3 my-2 flex gap-2 items-center font-heading">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 id={getHeaderId(children)} className="text-black text-base sm:text-lg md:text-xl font-[500] md:mt-6 md:mb-3 my-2 flex gap-2 items-center font-heading">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 id={getHeaderId(children)} className="text-black text-base sm:text-lg md:mt-6 md:mb-3 my-2 font-[500] flex gap-2 items-center font-heading">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h5 id={getHeaderId(children)} className="text-black text-base sm:text-lg md:mt-6 md:mb-3 my-2 font-[500] flex gap-2 items-center font-heading">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h5>
              ),
              h6: ({ children }) => (
                <h6 id={getHeaderId(children)} className="text-black text-base sm:text-lg font-medium md:mt-6 md:mb-3 my-2 flex gap-2 items-center font-heading">
                  <span className="hidden md:block rounded-full w-[13px] h-[13px] bg-primary"></span>
                  {children}
                </h6>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary bg-gray-50 px-4 py-3 my-6 text-base sm:text-lg text-gray-700 italic font-body rounded-r">
                  {children}
                </blockquote>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc list-outside pl-4 sm:pl-6 space-y-2 my-4 text-base sm:text-lg text-gray-800 font-body">
                  {children}
                </ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal list-outside pl-4 sm:pl-6 space-y-2 my-4 text-base sm:text-lg text-gray-800 font-body">
                  {children}
                </ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => (
                <li className="text-gray-800 pl-2">{children}</li>
              ),
              number: ({ children }) => (
                <li className="text-gray-800 pl-2">{children}</li>
              ),
            },
              marks: {
              link: ({ children, value }) => (
                <a 
                  href={value.href}
                  target={value.href.startsWith('http') ? '_blank' : '_self'}
                  rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary hover:text-primary/80 underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 font-medium"
                >
                  {children}
                </a>
              ),
            },
            types: {
              image: ({ value }) => (
                <figure className="my-8">
                  <div className="w-full overflow-hidden rounded-lg">
                    <Image
                      src={urlFor(value).url()}
                      alt={value.alt || "Post Image"}
                      className="w-full h-auto object-cover"
                      width={1200}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                    />
                  </div>
                  {value.caption && (
                    <figcaption className="mt-2 text-center text-sm text-gray-600 italic font-body">
                      {value.caption}
                    </figcaption>
                  )}
                </figure>
              ),
            },
          }}
        />
      )}
    </div> 
  )
}
