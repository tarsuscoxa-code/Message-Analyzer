
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col justify-center h-full p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Sign In</h2>
        <p className="text-muted-foreground">Sync summaries across devices and back up your categories.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            className="w-full p-3 bg-secondary border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 active:scale-95 transition"
        >
          Sign In with Email
        </button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-6">
        By signing in, you agree to our imaginary Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default LoginScreen;
