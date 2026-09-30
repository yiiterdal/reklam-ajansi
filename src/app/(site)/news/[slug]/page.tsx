import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticle from "@/components/NewsArticle";
import { NEWS_POSTS, getNewsPost } from "@/lib/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return NEWS_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return { title: "Story not found" };

  return {
    title: `${post.title} | News`,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-white">
      <NewsArticle slug={post.slug} />
    </main>
  );
}
