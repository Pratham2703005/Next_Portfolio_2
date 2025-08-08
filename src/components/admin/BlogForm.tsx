'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('@/components/ui/TiptapEditor'), {
  ssr: false,
});

interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  category: string;
  tags: string[];
}

interface BlogFormProps {
  initialData?: BlogFormData;
  blogId?: string;
  mode: 'create' | 'edit';
}

export default function BlogForm({ initialData, blogId, mode }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<BlogFormData>(
    initialData || {
      title: '',
      content: '',
      excerpt: '',
      published: false,
      featured: false,
      category: '',
      tags: [],
    }
  );

  const handleInputChange = (field: keyof BlogFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Enter key from submitting the form unless it's from the submit button
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      
      // Allow Enter in textarea (excerpt field)
      if (target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Allow Enter only on submit button
      if (target.type === 'submit') {
        return;
      }
      
      // Prevent all other Enter key presses from submitting the form
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug log to track form submissions
    console.log('Form submitted via:', e.target, 'Event type:', e.type);
    
    // Prevent accidental submissions
    if (loading) {
      console.log('Form submission blocked - already loading');
      return;
    }
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    setLoading(true);

    try {
      const url = mode === 'create' ? '/api/blogs' : `/api/blogs/${blogId}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const blog = await response.json();
        router.push(`/blog/${blog.slug}`);
      } else {
        const error = await response.json();
        alert(error.error || `Failed to ${mode} blog`);
      }
    } catch (error) {
      console.error(`Error ${mode}ing blog:`, error);
      alert(`Failed to ${mode} blog`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-4 py-3  border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 transition-colors text-white"
          placeholder="Enter blog title..."
          required
        />
      </div>

      {/* Category and Tags Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3  border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 transition-colors text-white"
            placeholder="e.g., Technology, Tutorial, Personal"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3  border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 transition-colors text-white"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleAddTag();
              }}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveTag(tag);
                  }}
                  className="hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Content *
        </label>
        <div 
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <TiptapEditor
            value={formData.content}
            onChange={(content) => handleInputChange('content', content)}
            placeholder="Write your blog content here..."
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="mt-16">
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => handleInputChange('excerpt', e.target.value)}
          rows={3}
          className="w-full px-4 py-3  border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 transition-colors text-white resize-none"
          placeholder="Brief description of the blog post (optional - will be auto-generated if empty)"
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => handleInputChange('published', e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
          />
          <span className="text-gray-300">
            {mode === 'create' ? 'Publish immediately' : 'Published'}
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleInputChange('featured', e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
          />
          <span className="text-gray-300">Featured post</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Save size={20} />
          )}
          {loading ? 
            (mode === 'create' ? 'Creating...' : 'Updating...') : 
            (mode === 'create' ? 'Create Blog Post' : 'Update Blog Post')
          }
        </button>

      </div>
    </form>
  );
}