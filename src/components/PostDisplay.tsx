import React, { useEffect, useState } from 'react';
import { GeneratedPost, Profile } from '../types';
import { MessageSquare, ThumbsUp, Repeat2 } from 'lucide-react';
import { generateImage } from '../utils/imageGenerator';

interface PostDisplayProps {
  post: GeneratedPost;
  profile: Profile;
}

export const PostDisplay: React.FC<PostDisplayProps> = ({ 
  post,
  profile,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateAndSetImage = async () => {
      try {
        const url = await generateImage(post);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to generate image:', error);
      }
    };

    generateAndSetImage();
  }, [post]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto mb-8">
      {/* Profile Header */}
      <div className="p-6 pb-3">
        <div className="flex items-center">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.title} • {profile.company}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 py-4 whitespace-pre-wrap text-lg">
        {`${post.subject.emoji} ${post.subject.text} ${post.context.emoji} ${post.context.text} ${post.achievement.emoji} ${post.achievement.text} v oblasti ${post.technology.emoji} ${post.technology.text}!

${post.insight.emoji} ${post.insight.text}

${post.hashtags.join(' ')}`}
      </div>

      {/* Generated Image */}
      {imageUrl && (
        <div className="px-6 pb-4">
          <img
            src={imageUrl}
            alt="Generated LinkedIn post"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Interaction Bar */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button className="flex items-center text-gray-600 hover:text-linkedin-primary transition-colors">
            <ThumbsUp className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Líbí se mi</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-linkedin-primary transition-colors">
            <MessageSquare className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Komentář</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-linkedin-primary transition-colors">
            <Repeat2 className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Sdílet</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 