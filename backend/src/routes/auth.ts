import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import supabase from '../lib/supabase';

const router = express.Router();

// Passport Google Strategy Setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.NODE_ENV === 'production'
        ? `${process.env.RENDER_EXTERNAL_URL}/api/auth/google/callback`
        : '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in Supabase
        let { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('google_id', profile.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // User doesn't exist yet, create them
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([
              {
                email: profile.emails?.[0].value,
                name: profile.displayName,
                avatar_url: profile.photos?.[0].value,
                google_id: profile.id,
              }
            ])
            .select()
            .single();
          
          if (createError) throw createError;
          return done(null, newUser);
        }
        
        if (error) throw error;
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    done(null, user);
  } catch (err) {
    done(err as Error);
  }
});

// Initiate Google OAuth Flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.NODE_ENV === 'production'
      ? `${process.env.FRONTEND_URL}/login`
      : 'http://localhost:3000/login',
  }),
  (req, res) => {
    // Success! Redirect to frontend dashboard
    res.redirect(process.env.NODE_ENV === 'production'
      ? `${process.env.FRONTEND_URL}/dashboard`
      : 'http://localhost:3000/dashboard'
    );
  }
);

// Get current user
router.get('/me', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
});

export default router;
