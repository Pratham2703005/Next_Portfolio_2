'use client';

export default function BlogPostStyles() {
  return (
    <style jsx global>{`
      .blog-content {
        color: #d1d5db;
        font-size: 1.125rem;
        line-height: 1.75rem;
      }

      .blog-content h1 {
        font-size: 2.25rem;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: white;
      }

      .blog-content h2 {
        font-size: 1.875rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        color: white;
      }

      .blog-content h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
        color: white;
      }

      .blog-content p {
        margin-bottom: 1rem;
        color: #d1d5db;
      }

      .blog-content a {
        color: #a855f7;
        text-decoration: underline;
      }

      .blog-content a:hover {
        color: #c084fc;
      }

      .blog-content ul,
      .blog-content ol {
        padding-left: 1.5rem;
        margin: 1rem 0;
      }

      .blog-content ul {
        list-style-type: disc;
      }

      .blog-content ol {
        list-style-type: decimal;
      }

      .blog-content li {
        margin-bottom: 0.5rem;
      }

      .blog-content blockquote {
        border-left: 4px solid #a855f7;
        padding-left: 1rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: #d1d5db;
      }

      .blog-content pre {
        background-color: #1f2937;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1rem 0;
      }

      .blog-content code {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
      }

      .blog-content img {
        border-radius: 0.5rem;
        margin: 1.5rem 0;
        max-width: 100%;
        height: auto;
      }
    `}</style>
  );
}
