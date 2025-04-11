import { useSignIn, useSignUp, SignInButton, SignUpButton } from '@clerk/nextjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './index';

// Email validation for university emails
const universityEmailSchema = z.string().email().refine(
  (email) => {
    const domain = email.split('@')[1];
    return domain.endsWith('.edu') || 
           domain.endsWith('.ac.uk') || 
           domain.endsWith('.edu.au');
  },
  {
    message: 'Email must be from a university domain (.edu, .ac.uk, .edu.au, etc.)',
  }
);

type SignInFormData = {
  email: string;
  password: string;
};

type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  university: string;
  department: string;
  year: number;
};

export function SignInForm({ redirectUrl }: { redirectUrl?: string }) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  
  const onSubmit = async (data: SignInFormData) => {
    if (!isLoaded) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = redirectUrl || "/dashboard";
      } else {
        console.error("Sign in failed", result);
        setError("Sign in failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error("Error signing in:", err);
      setError(err.errors?.[0]?.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign in to StudentNet</h1>
        <p className="text-sm text-gray-500">Enter your details to access your account</p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-600 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="you@university.edu"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <Button 
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export function SignUpForm({ redirectUrl }: { redirectUrl?: string }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifyEmail, setVerifyEmail] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  
  const onSubmit = async (data: SignUpFormData) => {
    if (!isLoaded) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate university email
      try {
        universityEmailSchema.parse(data.email);
      } catch (err) {
        setError("Please use a valid university email address (.edu, .ac.uk, .edu.au, etc.)");
        setIsLoading(false);
        return;
      }
      
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        unsafeMetadata: {
          university: data.university,
          department: data.department,
          year: data.year,
          isApproved: false, // User needs approval
        },
      });
      
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = redirectUrl || "/onboarding";
      } else {
        // Email verification is required
        setVerifyEmail(true);
      }
    } catch (err: any) {
      console.error("Error signing up:", err);
      setError(err.errors?.[0]?.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (verifyEmail) {
    return (
      <div className="w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold">Verify your email</h2>
        <p className="text-gray-600">
          We've sent you a verification email. Please check your inbox and follow the instructions to verify your account.
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create your StudentNet account</h1>
        <p className="text-sm text-gray-500">Connect with other students at your university</p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-600 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register("name", { required: "Full name is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="you@university.edu"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            University
          </label>
          <input
            {...register("university", { required: "University is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stanford University"
          />
          {errors.university && (
            <p className="text-red-600 text-sm mt-1">{errors.university.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            {...register("department", { required: "Department is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Computer Science"
          />
          {errors.department && (
            <p className="text-red-600 text-sm mt-1">{errors.department.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year of Study
          </label>
          <select
            {...register("year", { required: "Year is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year</option>
            <option value="6">Graduate Student</option>
          </select>
          {errors.year && (
            <p className="text-red-600 text-sm mt-1">{errors.year.message}</p>
          )}
        </div>
        
        <Button 
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

// Export Clerk components with our styling
export { SignInButton, SignUpButton };