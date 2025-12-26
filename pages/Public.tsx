import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Cpu, Globe, Search, BarChart3, Clock, Calendar, Mail, MapPin, Send, User, Linkedin, Layout as LayoutIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Card, Button, SectionHeader, Badge } from '../components/Shared';
import { SEO } from '../components/SEO';
import { ContentService } from '../services/contentService';
import { Post } from '../types';

// --- Components ---

const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    
    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-8 animate-pulse-slow shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"/> SHUBHOJIT.IO ONLINE
      </div>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-zinc-900 dark:text-white drop-shadow-sm">
        Holistic <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-secondary text-glow">
          SEO Engineer
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-zinc-500 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
        Building the bridge between Semantic Search, Knowledge Graphs, and High-Performance Web Architecture.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Link to="/about">
          <Button className="w-full md:w-auto px-8 py-4 text-base">About Me</Button>
        </Link>
        <Link to="/articles">
          <Button variant="outline" className="w-full md:w-auto px-8 py-4 text-base">Read Articles</Button>
        </Link>
      </div>
    </div>
  </section>
);

const FeatureGrid = () => (
  <section className="py-24 bg-surface/30 backdrop-blur-sm border-y border-zinc-200 dark:border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Core Competencies" subtitle="A multi-disciplinary approach to digital dominance." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <LayoutIcon className="text-primary" size={32} />, title: 'On Page SEO', desc: 'Crafting content architecture and UX that users love and bots understand.' },
          { icon: <Cpu className="text-secondary" size={32} />, title: 'Technical SEO', desc: 'Server-side rendering, crawl budget optimization, and web performance.' },
          { icon: <Globe className="text-accent" size={32} />, title: 'Semantic SEO', desc: 'Optimizing for entities, knowledge graphs, and topical authority.' }
        ].map((item, idx) => (
          <Card key={idx} className="group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
            <div className="mb-6 p-4 rounded-full bg-zinc-100 dark:bg-white/5 w-fit group-hover:bg-zinc-200 dark:group-hover:bg-white/10 transition-colors">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-zinc-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// --- Pages ---

export const Home = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const all = ContentService.getAllPosts().filter(p => p.published);
    // Sort by createdAt descending
    const sorted = all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setLatestPosts(sorted.slice(0, 6));
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shubhojit",
    "url": window.location.origin,
    "jobTitle": "SEO Engineer",
    "knowsAbout": ["SEO", "Semantic Search", "Web Performance", "Next.js"],
    "description": "Building the bridge between Semantic Search, Knowledge Graphs, and High-Performance Web Architecture."
  };

  return (
    <>
      <SEO 
        title="Shubhojit.io | Future of Search & Web Performance" 
        description="Personal portfolio of a Holistic SEO Engineer specializing in Semantic Search, Technical SEO, and High-Performance Web Architecture."
        schema={schema}
      />
      <Hero />
      <FeatureGrid />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Latest Articles" subtitle="Thoughts on the industry evolution." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {latestPosts.map(post => (
              <Link key={post.id} to={`/articles/${post.slug}`} className="group h-full">
                <Card className="h-full flex flex-col border-zinc-200 dark:border-white/5 group-hover:border-primary/30 transition-all duration-300 group-hover:bg-zinc-50 dark:group-hover:bg-white/[0.02]">
                   <div className="mb-4 flex gap-2 flex-wrap">
                     {post.tags.slice(0, 2).map(tag => (
                       <Badge key={tag} color="blue">{tag}</Badge>
                     ))}
                   </div>
                   <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                   <p className="text-zinc-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                   <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-gray-500 font-mono pt-4 border-t border-zinc-200 dark:border-white/5">
                     <div className="flex items-center gap-2">
                       <Calendar size={12} />
                       {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                     </div>
                     <div className="flex items-center gap-2">
                       <Clock size={12} />
                       {post.readTime} min read
                     </div>
                   </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/articles">
              <Button size="lg">Explore Knowledge Base</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export const ArticlesPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  // Specific filters requested
  const filters = ['All', 'On Page SEO', 'Technical SEO', 'Semantic SEO', 'AI', 'Research'];

  useEffect(() => {
    // Get all published posts regardless of legacy 'type'
    const all = ContentService.getAllPosts();
    setPosts(all.filter(p => p.published));
  }, []);

  const filteredPosts = posts.filter(p => {
    // Search logic
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    // Filter logic
    const matchesFilter = activeFilter === 'All' || p.tags.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SEO 
        title="Articles | Shubhojit.io"
        description="In-depth analysis, case studies, and guides on SEO and Web Engineering."
        canonical="/articles"
      />
      <div className="flex flex-col mb-12 gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">Knowledge Base</h1>
            <p className="text-zinc-600 dark:text-gray-400 text-lg max-w-xl">
              Exploring the intersection of search engines and modern web architecture.
            </p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full md:w-80 bg-surface/50 border border-zinc-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors backdrop-blur-sm text-zinc-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === filter 
                  ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                  : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
             <Link key={post.id} to={`/articles/${post.slug}`} className="group h-full">
              <Card className="h-full flex flex-col border-zinc-200 dark:border-white/5 group-hover:border-primary/30 transition-all duration-300 group-hover:bg-zinc-50 dark:group-hover:bg-white/[0.02]">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => <Badge key={tag} color="purple">{tag}</Badge>)}
                   </div>
                 </div>
                 <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{post.title}</h2>
                 <p className="text-zinc-600 dark:text-gray-400 mb-6 flex-grow">{post.excerpt}</p>
                 <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-gray-500 font-mono pt-4 border-t border-zinc-200 dark:border-white/5 w-full mt-auto">
                   <span className="flex items-center gap-2"><Calendar size={12} /> {format(new Date(post.createdAt), 'MMM dd')}</span>
                   <span className="flex items-center gap-1 text-primary">Read <ArrowRight size={12} /></span>
                 </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-block p-4 rounded-full bg-zinc-100 dark:bg-white/5 mb-4 text-gray-500"><Search size={32} /></div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-gray-300">No Articles Found</h3>
            <p className="text-zinc-500 dark:text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const found = ContentService.getPostBySlug(slug);
      setPost(found);
    }
    setLoading(false);
  }, [slug]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  if (!post) return <div className="min-h-[60vh] flex items-center justify-center text-xl text-gray-400">404 | Post Not Found</div>;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": "Shubhojit"
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <SEO 
        title={`${post.title} | Shubhojit.io`}
        description={post.excerpt}
        type="article"
        schema={schema}
        canonical={`/articles/${post.slug}`}
      />
      <div className="mb-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-zinc-900 dark:text-white">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-zinc-500 dark:text-gray-500 font-mono">
           <span className="flex items-center gap-2"><User size={14} className="text-primary" /> Shubhojit</span>
           <span className="flex items-center gap-2"><Calendar size={14} /> {format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
           <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime} min read</span>
        </div>
      </div>

      <div className="prose prose-lg max-w-none 
        text-zinc-700 dark:text-gray-300
        prose-headings:text-zinc-900 dark:prose-headings:text-white 
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
        prose-code:text-accent prose-code:bg-zinc-100 dark:prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded 
        prose-pre:bg-zinc-100 dark:prose-pre:bg-surface/50 prose-pre:backdrop-blur-sm prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-white/10 
        prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-white/10">
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>;
          if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
          if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
          if (line === '') return <br key={i} />;
          return <p key={i}>{line}</p>;
        })}
      </div>

      <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-white/10">
        <Link to="/articles">
           <Button variant="outline"><ArrowRight className="rotate-180 mr-2" size={16} /> Back to Articles</Button>
        </Link>
      </div>
    </article>
  );
};

export const AboutMe = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <SEO title="About Me | Shubhojit.io" description="Holistic SEO Engineer specializing in technical search and semantic web." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">Hello, I'm <span className="text-primary">Shubhojit</span>.</h1>
          <p className="text-xl text-zinc-600 dark:text-gray-400 leading-relaxed mb-6">
            I am a Holistic SEO Engineer obsessed with the mechanics of search and the architecture of the web.
          </p>
          <p className="text-zinc-600 dark:text-gray-400 leading-relaxed mb-8">
            My work sits at the intersection of Marketing and Engineering. I don't just optimize content; I build infrastructure that Google loves to crawl. My philosophy is simple: **Technical Excellence + Semantic Understanding = Organic Dominance.**
          </p>
          <div className="flex gap-4">
            <Link to="/contact"><Button>Let's Chat</Button></Link>
            <a href="#" target="_blank"><Button variant="outline"><Linkedin size={18} /> Follow Me</Button></a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-white/5 dark:to-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-primary/20 blur-[100px] group-hover:bg-primary/30 transition-colors duration-700" />
             <User size={120} className="text-zinc-400 dark:text-white/20 relative z-10" />
             <div className="absolute bottom-6 left-6 right-6 bg-white/60 dark:bg-black/60 backdrop-blur-md p-4 rounded-xl border border-zinc-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-mono text-zinc-700 dark:text-gray-300">Open for new opportunities</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <SectionHeader title="My Expertise" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
            <h3 className="text-xl font-bold mb-4 text-primary">Technical SEO</h3>
            <ul className="space-y-2 text-zinc-600 dark:text-gray-400 text-sm">
              <li>• Log File Analysis</li>
              <li>• JavaScript Rendering (SSR/ISR)</li>
              <li>• Core Web Vitals Optimization</li>
              <li>• Crawl Budget Management</li>
            </ul>
          </Card>
           <Card className="hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
            <h3 className="text-xl font-bold mb-4 text-secondary">Semantic SEO</h3>
            <ul className="space-y-2 text-zinc-600 dark:text-gray-400 text-sm">
              <li>• Knowledge Graph Construction</li>
              <li>• Schema Markup Strategy</li>
              <li>• Entity Salience Optimization</li>
              <li>• NLP & LLM Integration</li>
            </ul>
          </Card>
           <Card className="hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
            <h3 className="text-xl font-bold mb-4 text-accent">On Page SEO</h3>
            <ul className="space-y-2 text-zinc-600 dark:text-gray-400 text-sm">
              <li>• Internal Linking Architecture</li>
              <li>• Content Clustering</li>
              <li>• UX/UI Signals</li>
              <li>• Keyword to Entity Mapping</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SEO title="Contact | Shubhojit.io" description="Get in touch with Shubhojit for SEO consulting and engineering." />
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">Let's Chat</h1>
        <p className="text-zinc-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Have a project in mind? Want to discuss the future of search? I'm always open to interesting conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
           <Card>
             <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-primary/10 rounded-lg text-primary"><Mail /></div>
               <div>
                 <h3 className="font-bold text-zinc-900 dark:text-white">Email Me</h3>
                 <p className="text-sm text-zinc-600 dark:text-gray-400">hello@shubhojit.io</p>
               </div>
             </div>
             <div className="flex items-center gap-4">
               <div className="p-3 bg-secondary/10 rounded-lg text-secondary"><MapPin /></div>
               <div>
                 <h3 className="font-bold text-zinc-900 dark:text-white">Location</h3>
                 <p className="text-sm text-zinc-600 dark:text-gray-400">Remote / Worldwide</p>
               </div>
             </div>
           </Card>
           
           <div className="p-6 rounded-xl border border-zinc-200 dark:border-white/5 bg-gradient-to-br from-zinc-100 to-transparent dark:from-white/5">
             <h3 className="font-bold mb-4 text-zinc-900 dark:text-white">Connect Socially</h3>
             <div className="flex gap-4">
               <Button variant="outline" className="w-full justify-center"><Linkedin size={18} /></Button>
             </div>
           </div>
        </div>

        <div className="md:col-span-3">
          <Card className="h-full">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Message Sent!</h3>
                <p className="text-zinc-600 dark:text-gray-400">I'll get back to you as soon as possible.</p>
                <Button className="mt-8" onClick={() => { setSubmitted(false); setFormState({name:'',email:'',message:''}); }}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-2">Your Name</label>
                    <input 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      type="text" 
                      className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors text-zinc-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-2">Email Address</label>
                    <input 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      type="email" 
                      className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors text-zinc-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-2">Message</label>
                  <textarea 
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full h-40 bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors resize-none text-zinc-900 dark:text-white"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button type="submit" className="w-full py-4">Send Message <ArrowRight size={16} /></Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};