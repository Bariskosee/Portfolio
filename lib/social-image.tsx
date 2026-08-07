import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";

export const socialImageAlt = `${SITE_NAME} software engineering portfolio`;

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function generateSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2f1ec",
          color: "#131a27",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              maxWidth: "760px",
            }}
          >
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 28,
                letterSpacing: 6,
                color: "#4f5a6d",
                textTransform: "uppercase",
              }}
            >
              Software Engineering Student
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 0.92,
                fontSize: 118,
                letterSpacing: 0,
              }}
            >
              <span>{SITE_NAME.split(" ")[0]}</span>
              <span style={{ color: "#202837", fontStyle: "italic" }}>
                {SITE_NAME.split(" ")[1]}
              </span>
            </div>
          </div>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 28,
              border: "2px solid rgba(19,26,39,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fcfcf9",
              boxShadow: "0 18px 45px rgba(17,24,39,0.12)",
              fontFamily: "sans-serif",
              fontSize: 56,
              fontWeight: 700,
              color: "#202837",
            }}
          >
            BK
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
          }}
        >
          <div
            style={{
              maxWidth: "920px",
              fontFamily: "sans-serif",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#4f5a6d",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontFamily: "sans-serif",
              fontSize: 26,
              color: "#202837",
            }}
          >
            <span>React</span>
            <span>TypeScript</span>
            <span>Next.js</span>
            <span>Distributed Systems</span>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}

export { SITE_TITLE };
