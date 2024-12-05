import { GeneratedPost } from '../types';
import {
  subjects,
  contexts,
  achievements,
  technologies,
  insights,
  hashtags,
} from '../data/phrases';

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomHashtags = (count: number = 3): string[] => {
  const shuffled = [...hashtags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generatePost = (): GeneratedPost => {
  return {
    subject: getRandomItem(subjects),
    context: getRandomItem(contexts),
    achievement: getRandomItem(achievements),
    technology: getRandomItem(technologies),
    insight: getRandomItem(insights),
    hashtags: getRandomHashtags(),
  };
};

// Format the main text for enhancement
export const formatMainText = (post: GeneratedPost): string => {
  const { subject, context, achievement, technology } = post;
  return `${subject.emoji} ${subject.text} ${context.text} ${achievement.text} v oblasti ${technology.text}!`;
};

// Format the complete post with enhanced text
export const formatCompletePost = (post: GeneratedPost): string => {
  const mainText = post.subject.text; // Enhanced text is stored here
  const { insight, hashtags } = post;
  return `${mainText}\n\n${insight.emoji} ${insight.text}\n\n${hashtags.join(' ')}`;
}; 