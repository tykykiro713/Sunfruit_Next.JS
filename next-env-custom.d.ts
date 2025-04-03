// Override Next.js PageProps types for compatibility
declare namespace NextJs {
    interface PageProps {
      params: Record<string, string>;
      searchParams?: Record<string, string | string[] | undefined>;
    }
  }
  
  // Augment Next.js types
  declare module 'next' {
    interface PageProps extends NextJs.PageProps {}
  }