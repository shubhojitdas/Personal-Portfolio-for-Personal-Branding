export type PostType = 'blog' | 'research'; // Keeping legacy types for compatibility, but UI will focus on tags

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  type: PostType;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  readTime: number;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Semantic Search',
    slug: 'future-semantic-search',
    excerpt: 'Exploring how LLMs and Knowledge Graphs are reshaping the SEO landscape forever.',
    content: `# The Future of Semantic Search\n\nSearch engines are evolving from keyword matching to entity understanding. This shift requires a holistic approach to SEO.\n\n## Entity-Based SEO\n\nEntities are the backbone of the semantic web. By connecting concepts, we create a knowledge graph that search engines can understand.\n\n### Key Takeaways\n\n1. Focus on topics, not just keywords.\n2. Build topical authority.\n3. Structure data effectively.`,
    tags: ['Technical SEO', 'Research', 'Semantic SEO'],
    type: 'research',
    published: true,
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: 5
  },
  {
    id: '2',
    title: 'Optimizing React for Core Web Vitals',
    slug: 'optimizing-react-cwv',
    excerpt: 'A deep dive into server components and rendering patterns to boost your On Page metrics.',
    content: `# Building High Performance React Apps\n\nPerformance is not just about speed; it's about user experience. In this guide, we explore advanced patterns.\n\n## The Cost of Re-renders\n\nReact is fast, but unnecessary re-renders can kill your TBT (Total Blocking Time).`,
    tags: ['On Page SEO', 'Technical SEO'],
    type: 'blog',
    published: true,
    createdAt: new Date(Date.now() - 50000000).toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: 8
  },
  {
    id: '3',
    title: 'Holistic Branding Strategy',
    slug: 'holistic-branding',
    excerpt: 'Aligning your technical infrastructure with your brand voice for maximum impact.',
    content: 'Full content about holistic branding...',
    tags: ['Research', 'On Page SEO'],
    type: 'blog',
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: 3
  },
  {
    id: '4',
    title: 'AI Agents in Search',
    slug: 'ai-agents-search',
    excerpt: 'How autonomous AI agents are becoming the new users of your website.',
    content: 'Content about AI agents...',
    tags: ['AI', 'Research', 'Technical SEO'],
    type: 'research',
    published: true,
    createdAt: new Date(Date.now() - 20000000).toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: 6
  },
  {
    id: '5',
    title: 'Mastering Internal Linking Structures',
    slug: 'internal-linking-mastery',
    excerpt: 'Designing site architecture that flows page rank efficiently to money pages.',
    content: 'Content about internal linking...',
    tags: ['On Page SEO', 'Semantic SEO'],
    type: 'blog',
    published: true,
    createdAt: new Date(Date.now() - 15000000).toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: 4
  },
  {
    id: '6',
    title: 'The End of Ten Blue Links',
    slug: 'end-of-ten-blue-links',
    excerpt: 'Preparing for a zero-click future with Generative AI experiences.',
    content: 'Content about SGE...',
    tags: ['AI', 'Research'],
    type: 'blog',
    published: true,
    createdAt: new Date(Date.now() - 5000000).toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: 5
  }
];