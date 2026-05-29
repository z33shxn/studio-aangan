import Image from "next/image";
import Link from "next/link";
import { posts } from "@/content/posts";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "Journal",
  description: "Thoughts on interior design, architecture, and slow living.",
};

export default function JournalPage() {
  return (
    <div className="flex flex-col pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Journal</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-24 leading-relaxed">
            Thoughts on interior design, architecture, and slow living.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="aspect-[4/3] relative w-full overflow-hidden mb-6 bg-paper/50">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <div className="flex gap-4 text-xs uppercase tracking-widest text-ink/60 font-medium mb-3">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight mb-3 group-hover:text-brass transition-colors">{post.title}</h3>
                  <p className="text-sm text-ink/70 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
