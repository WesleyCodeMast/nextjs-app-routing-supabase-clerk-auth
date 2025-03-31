import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { Fragment } from "react";
import { createElement } from "react";
import Link from "next/link";
export default async function StringRehype(props) {
  if (!props?.html) {
    return null;
  }
  const { result: renderedReview } = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: function RenderedLink({ href, children, className, ...rest }) {
          const canonical = "https://www.allfreechips.com";
          if (href.startsWith(canonical)) {
            href = href.slice(canonical.length);
          }
          return (
            <Link
              {...rest}
              href={href}
              className={`${
                className || ""
              } font-semibold text-blue-600 hover:underline dark:text-orange-300`}
            >
              {children}
            </Link>
          );
        },
      },
    })
    .process(props.html.__html);
  return renderedReview;
}
