export interface Subject {
  text: string;
  emoji?: string;
}

export interface Context {
  text: string;
  emoji?: string;
}

export interface Achievement {
  text: string;
  emoji?: string;
}

export interface Technology {
  text: string;
  emoji?: string;
}

export interface Insight {
  text: string;
  emoji?: string;
}

export interface GeneratedPost {
  subject: Subject;
  context: Context;
  achievement: Achievement;
  technology: Technology;
  insight: Insight;
  hashtags: string[];
}

export interface Profile {
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
} 