import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Layout, LogOut, Plus, Edit, Trash, Save, ArrowLeft } from 'lucide-react';
import { Card, Button, Badge } from '../components/Shared';
import { ContentService } from '../services/contentService';
import { Post, PostType } from '../types';

export const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ContentService.login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid access credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md border-zinc-200 dark:border-white/10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Layout size={24} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">System Access</h2>
          <p className="text-zinc-500 dark:text-gray-500 text-sm mt-2">Enter your secure key to proceed.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key..."
              className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors text-zinc-900 dark:text-white"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full">Authenticate</Button>
          <div className="text-center text-xs text-zinc-500 dark:text-gray-600 mt-4">Hint: admin</div>
        </form>
      </Card>
    </div>
  );
};

export const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ContentService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
    setPosts(ContentService.getAllPosts());
  }, [navigate]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entity?')) {
      ContentService.deletePost(id);
      setPosts(ContentService.getAllPosts());
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Content Command Center</h1>
          <p className="text-zinc-500 dark:text-gray-500">Manage your digital footprint.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => { ContentService.logout(); navigate('/admin'); }}>
            <LogOut size={16} /> Logout
          </Button>
          <Link to="/admin/new">
            <Button><Plus size={16} /> New Entry</Button>
          </Link>
        </div>
      </div>

      <div className="bg-surface border border-zinc-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-white/5 text-zinc-900 dark:text-zinc-100">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4"><Badge color={post.type === 'blog' ? 'blue' : 'purple'}>{post.type}</Badge></td>
                <td className="p-4">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${post.published ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  {post.published ? 'Published' : 'Draft'}
                </td>
                <td className="p-4 text-sm text-zinc-500 dark:text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => navigate(`/admin/edit/${post.id}`)} className="p-2 hover:text-primary transition-colors"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 hover:text-red-500 transition-colors"><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-12 text-center text-zinc-500 dark:text-gray-500">No content entities found. Initialize new data.</div>
        )}
      </div>
    </div>
  );
};

export const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [formData, setFormData] = useState<Post>({
    id: crypto.randomUUID(),
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: [],
    type: 'blog',
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: 1
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!ContentService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
    if (!isNew && id) {
      const post = ContentService.getPostById(id);
      if (post) setFormData(post);
    }
  }, [id, isNew, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title if slug is empty
      ...(name === 'title' && isNew && !prev.slug ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') } : {})
    }));
  };

  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    ContentService.savePost(formData);
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/dashboard" className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors text-zinc-900 dark:text-white">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{isNew ? 'Create Entity' : 'Edit Entity'}</h1>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-1">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded p-3 text-lg font-bold focus:border-primary focus:outline-none text-zinc-900 dark:text-white"
                  placeholder="Enter title..."
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-1">Slug</label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded p-2 text-sm font-mono text-zinc-500 dark:text-gray-400 focus:border-primary focus:outline-none"
                  placeholder="url-slug"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-1">Content (Markdown)</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full h-96 bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded p-3 font-mono text-sm focus:border-primary focus:outline-none resize-none text-zinc-900 dark:text-white"
                  placeholder="# Write your masterpiece..."
                  required
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="space-y-4">
              <Button type="submit" className="w-full">
                <Save size={16} /> Save Entity
              </Button>
              
              <div>
                <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-1">Type</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded p-2 text-sm text-zinc-900 dark:text-white"
                >
                  <option value="blog">Blog Post</option>
                  <option value="research">Research Paper</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded p-2 text-sm h-24 resize-none text-zinc-900 dark:text-white"
                  placeholder="Brief summary..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-zinc-500 dark:text-gray-500 mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded p-2 text-sm text-zinc-900 dark:text-white"
                    placeholder="Add tag..."
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <button type="button" onClick={handleAddTag} className="bg-zinc-100 dark:bg-white/10 p-2 rounded hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-900 dark:text-white"><Plus size={16}/></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span key={tag} onClick={() => setFormData(prev => ({...prev, tags: prev.tags.filter(t => t !== tag)}))} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded cursor-pointer hover:bg-red-500/20 hover:text-red-500 transition-colors">
                      {tag} &times;
                    </span>
                  ))}
                </div>
              </div>
              
               <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-white/10">
                <input 
                  type="checkbox" 
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="published" className="text-sm cursor-pointer select-none text-zinc-900 dark:text-white">Publish Immediately</label>
              </div>

            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};