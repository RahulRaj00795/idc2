import React from 'react';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, User, ArrowRight, Plus, Sparkles } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onOpenAdminToAdd?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  onSelectPost,
  onOpenAdminToAdd
}) => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-purple-700" />
              <span>Diaspora Voices &amp; Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Blog Posts &amp; Articles
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Thought leadership essays, cross-generational reflections, and cultural perspectives.
            </p>
          </div>

          {onOpenAdminToAdd && (
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button
                onClick={onOpenAdminToAdd}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-gray-300 hover:border-orange-500 text-gray-800 hover:text-orange-600 rounded-xl text-xs font-bold shadow-xs transition"
              >
                <Plus className="w-3.5 h-3.5 text-orange-600" />
                <span>Write Article via Admin</span>
              </button>
            </div>
          )}
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-200 hover:border-orange-300 shadow-xs hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold rounded-md">
                  {post.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      <span>{post.publishedAt}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{post.author}</p>
                      {post.authorBio && (
                        <p className="text-[10px] text-gray-400 truncate max-w-[120px]">
                          {post.authorBio}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
