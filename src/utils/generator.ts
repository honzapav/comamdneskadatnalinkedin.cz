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

export const formatPost = (post: GeneratedPost): string => {
  const { subject, context, achievement, technology, insight, hashtags } = post;
  
  return `${subject.emoji} ${subject.text} ${context.emoji} ${context.text} ${achievement.emoji} ${achievement.text} v oblasti ${technology.emoji} ${technology.text}!

${insight.emoji} ${insight.text}

${hashtags.join(' ')}`;
}; 