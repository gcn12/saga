import { AnimatePresence, motion } from "framer-motion";
import { Blog } from "../../Types/types";

interface AddBlogPreviewProps {
  blog: Blog[];
  title: string;
}

export default function AddBlogPreview({ blog, title }: AddBlogPreviewProps) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1
          style={{
            padding: "0 10%",
            marginBottom: "40px",
            fontWeight: "500",
          }}
        >
          {title}
        </h1>
      </div>
      {blog.map((element: Blog) => {
        const { type, content, key } = element;
        return (
          <AnimatePresence key={key}>
            <motion.div
              layoutId={String(key)}
              key={key}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {type === "largePhoto" && (
                <img
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    marginBottom: "40px",
                    boxShadow: ` 0 1px 1px hsl(0deg 0% 0% / 0.08),
                      0 2px 2px hsl(0deg 0% 0% / 0.08),
                      0 4px 4px hsl(0deg 0% 0% / 0.08),
                      0 8px 8px hsl(0deg 0% 0% / 0.08),
                      0 16px 16px hsl(0deg 0% 0% / 0.08)`,
                  }}
                  src={content}
                  alt=""
                />
              )}
              {type === "smallPhoto" && (
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    padding: "0 10%",
                    width: "100%",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "40px",
                      boxShadow: ` 0 1px 1px hsl(0deg 0% 0% / 0.08),
                      0 2px 2px hsl(0deg 0% 0% / 0.08),
                      0 4px 4px hsl(0deg 0% 0% / 0.08),
                      0 8px 8px hsl(0deg 0% 0% / 0.08),
                      0 16px 16px hsl(0deg 0% 0% / 0.08)`,
                    }}
                    src={content}
                    alt=""
                  />
                </div>
              )}

              {type === "paragraph" && (
                <p
                  style={{
                    padding: "0 10%",
                    marginBottom: "40px",
                    whiteSpace: "pre-wrap",
                    fontWeight: "300",
                  }}
                >
                  {content}
                </p>
              )}
              {type === "header" && (
                <h2
                  style={{
                    padding: "0 10%",
                    marginBottom: "20px",
                    fontWeight: "500",
                  }}
                >
                  {content}
                </h2>
              )}
            </motion.div>
          </AnimatePresence>
        );
      })}
    </>
  );
}
