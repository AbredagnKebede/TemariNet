import { z } from 'zod';

// Email validation with university domain checks
export const emailSchema = z.string().email().refine(
  (email) => {
    const domain = email.split('@')[1];
    return domain.endsWith('.edu') || 
           domain.endsWith('.ac.uk') || 
           domain.endsWith('.edu.au') ||
           // Add more university domains as needed
           false;
  },
  {
    message: 'Email must be from a recognized university domain',
  }
);

// User profile schema
export const userProfileSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  year: z.number().int().positive().max(10),
  university: z.string().min(2).max(100),
  department: z.string().min(2).max(100),
  skills: z.array(z.string().max(50)).max(20).optional(),
});

// Post schema
export const postSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(1).max(5000),
  visibility: z.enum(['public', 'university', 'department', 'private']),
});

// Comment schema
export const commentSchema = z.object({
  content: z.string().min(1).max(1000),
});

// Group schema
export const groupSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500),
  type: z.enum(['public', 'private']),
  category: z.string().max(50),
});