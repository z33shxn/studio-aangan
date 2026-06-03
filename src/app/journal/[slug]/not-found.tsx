import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { ErrorLayout } from "@/components/error/ErrorLayout";
import { posts } from "@/content/posts";

export const metadata = {
  robots: { index: false }
};

export default function JournalNotFound() {
  const recentPosts = posts.slice(0, 3);

  return (
    <ErrorLayout
      code="404"
      eyebrow="Article not found"
      title="This story hasn't been written."
      body="The journal entry you're looking for doesn't exist. It might have been moved or unpublished. Browse our latest thoughts on design below."
      primaryCta={{ label: "Read the journal", href: "/journal" }}
    >
      <div className="mt-16 pt-12 border-t border-stone-2">
        <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-8">
          Recent Articles
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
              <div className="aspect-[4/3] relative w-full overflow-hidden mb-4 bg-stone-2/30">
                <Image 
                  src={post.coverImage} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-xs text-brass uppercase tracking-widest mb-2">{post.category}</p>
              <h4 className="font-serif text-lg mb-2 group-hover:text-brass transition-colors leading-tight">{post.title}</h4>
              <p className="text-sm text-ink/70 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </ErrorLayout>
  );
}
