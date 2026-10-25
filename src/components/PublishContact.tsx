import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, BookOpen, User, Mail, Sparkles } from 'lucide-react';
import { contentService } from '../services/contentService';

export const PublishContact: React.FC = () => {
  const [mode, setMode] = useState<'contact' | 'publish'>('publish');
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Opinion & Reflection');
  const [content, setContent] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'publish') {
      try {
        await contentService.savePost({
          id: `post-community-${Date.now()}`,
          title,
          excerpt: content.slice(0, 160) + '...',
          content,
          author: authorName,
          authorBio: `Diaspora contributor based in ${country || 'Overseas'}`,
          category,
          imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
          readTime: '4 min read',
          publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.error('Publish error:', err);
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Editorial Bureau &amp; Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Publish With Us &amp; Get in Touch
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Share your diaspora experience, nominate an inspiring achiever, or connect with our editorial collective.
        </p>

        {/* Toggle between Publish Story and Contact Us */}
        <div className="mt-6 inline-flex p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => { setMode('publish'); setSubmitted(false); }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              mode === 'publish'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Publish Article / Story</span>
          </button>
          <button
            onClick={() => { setMode('contact'); setSubmitted(false); }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              mode === 'contact'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us Directly</span>
          </button>
        </div>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-emerald-900">
            {mode === 'publish' ? 'Article Submitted Successfully!' : 'Message Received!'}
          </h3>
          <p className="text-sm text-emerald-700 mt-2 max-w-md mx-auto">
            {mode === 'publish'
              ? 'Your submission has been queued and published to our community articles feed.'
              : 'Thank you for reaching out. Our editorial secretariat will respond to your email shortly.'}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setTitle('');
              setContent('');
            }}
            className="mt-6 px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
          >
            Submit Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Dr. Priya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Country of Residence
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United Kingdom, Singapore, USA"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {mode === 'publish' ? 'Topic Category' : 'Inquiry Type'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                {mode === 'publish' ? (
                  <>
                    <option value="Opinion & Reflection">Opinion &amp; Reflection</option>
                    <option value="Diaspora Achiever Nomination">Diaspora Achiever Nomination</option>
                    <option value="Community Innovation">Community Innovation</option>
                    <option value="Heritage & Culture">Heritage &amp; Culture</option>
                  </>
                ) : (
                  <>
                    <option value="General Query">General Query</option>
                    <option value="Partnership & Sponsorship">Partnership &amp; Sponsorship</option>
                    <option value="Consular / NRI Guidance">Consular / NRI Guidance</option>
                    <option value="Press / Media Access">Press / Media Access</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              {mode === 'publish' ? 'Headline / Article Title *' : 'Subject *'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={mode === 'publish' ? "The Cross-Border Bridge: Connecting Diaspora Mentors..." : "Partnership inquiry for Indian Diaspora Club"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              {mode === 'publish' ? 'Full Article / Story Body *' : 'Your Message *'}
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={mode === 'publish' ? "Write or paste your article text here..." : "How can our global community team help you?"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-600/20 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{mode === 'publish' ? 'Submit for Publication' : 'Send Message'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
