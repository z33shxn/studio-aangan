import Image, { ImageProps } from "next/image";
import blurData from "@/content/blur-data.json";
import { ClipReveal } from "@/components/motion/ClipReveal";

const FALLBACK_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAD0lEQVQIW2NkYGD4z0AEMAIuABFj0B1aAAAAAElFTkSuQmCC";

type SmartImageProps = ImageProps & {
  src: string;
  noReveal?: boolean;
};

export function SmartImage(props: SmartImageProps) {
  const { src, alt, noReveal, ...rest } = props;

  let blurUrl = FALLBACK_BLUR;
  if (typeof src === "string") {
    if (src in blurData) {
      blurUrl = blurData[src as keyof typeof blurData];
    }
  }

  const imageNode = (
    <Image
      src={src}
      alt={alt || ""}
      placeholder="blur"
      blurDataURL={blurUrl}
      {...rest}
    />
  );

  if (noReveal) {
    return imageNode;
  }

  const isFill = rest.fill;
  const revealClassName = isFill 
    ? "absolute inset-0 overflow-hidden" 
    : "relative overflow-hidden w-full h-full max-w-full max-h-full inline-block";

  return (
    <ClipReveal className={revealClassName}>
      {imageNode}
    </ClipReveal>
  );
}
