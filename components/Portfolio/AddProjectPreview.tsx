import { AnimatePresence, motion } from "framer-motion";
import { Project } from "../../types/types";

interface AddProjectPreviewProps {
  project: Project[];
  title: string;
}

export default function AddProjectPreview({
  project,
  title,
}: AddProjectPreviewProps) {
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
      {project.map((element) => {
        const { type, content, key } = element;
        return (
          <AnimatePresence key={key}>
            <motion.div
              layoutId={String(key)}
              key={key}
              layout="position"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {type === "leftPhoto" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 10%",
                    marginBottom: "40px",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "40%",
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                    src={content.photo}
                    alt=""
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "1.7rem",
                        marginBottom: "10px",
                      }}
                    >
                      {content.title}
                    </p>
                    <p>{content.text}</p>
                  </div>
                </div>
              )}
              {type === "rightPhoto" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 10%",
                    marginBottom: "40px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "1.7rem",
                        marginBottom: "10px",
                      }}
                    >
                      {content.title}
                    </p>
                    <p>{content.text}</p>
                  </div>
                  <img
                    style={{
                      width: "40%",
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                    src={content.photo}
                    alt=""
                  />
                </div>
              )}
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
