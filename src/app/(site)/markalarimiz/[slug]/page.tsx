import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MarkalarimizSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/brands/${slug}`);
}
