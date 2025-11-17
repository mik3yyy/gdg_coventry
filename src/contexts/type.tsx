// types.ts

export type Resource = Video | Article | Tool | Interview;

export interface Video {
    id: string;
    title: string;
    author: string;
    duration: string;
    level: string;
    category: string;
    thumbnail: string;
    url: string;
    status: 'published' | 'draft';
    createdAt: string;
    type: 'video';  // This field is to indicate this is a Video resource
}

export interface Article {
    id: string;
    title: string;
    author: string;
    readTime: string;
    category: string;
    articleCategory: string;
    url: string;
    status: 'published' | 'draft';
    createdAt: string;
    type: 'article';  // This field is to indicate this is an Article resource
}

export interface Tool {
    id: string;
    name: string;
    description: string;
    category: string;
    toolCategory: string;
    url: string;
    status: 'published' | 'draft';
    createdAt: string;
    type: 'tool';  // This field is to indicate this is a Tool resource
}

export interface Interview {
    id: string;
    title: string;
    questionType: "Question Bank" | "Study Guide" | "Practice Exams" | "Technical Guide" | "Scenarios";  // Renamed to 'questionType' to avoid conflict with the 'type' property
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Mixed";
    category: string;
    url: string;
    status: 'published' | 'draft';
    createdAt: string;
    type: 'interview';  // This field is to indicate this is an Interview resource
}
export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    resourceCount: number;
}
export type ResourceCategory = 'videos' | 'articles' | 'tools' | 'interview';
