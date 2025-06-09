import { propertyDetails } from "../../services/api"; 

export async function generateStaticParams() {
  const data = await propertyDetails("373");

  if (!data || data.success !== 1 || !Array.isArray(data.data)) {
    return [];
  }

  const slugs: string[] = data.data.map((project: any) => project.slug);

  return slugs.map((slug: string) => ({ slug }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
