import { notFound } from "next/navigation";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { posts } from "@/content/posts";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return { title: `${post.title} | Journal` };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] flex flex-col justify-end pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <Parallax offset={50} className="w-full h-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/40" />
          </Parallax>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10 text-paper">
          <Reveal>
            <div className="flex items-center gap-4 mb-6 text-xs uppercase tracking-widest text-paper/70 font-medium">
              <Link href="/journal" className="hover:text-paper transition-colors">Journal</Link>
              <span className="text-brass">/</span>
              <span>{post.category}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-paper/70">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <div className="prose prose-lg prose-neutral md:prose-xl prose-headings:font-serif prose-headings:font-normal prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-ink/80 prose-p:leading-relaxed prose-li:text-ink/80">
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i}>{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <p key={i}><strong>{paragraph.replace(/\*\*/g, '')}</strong></p>;
                }
                return <p key={i}>{paragraph}</p>;
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
