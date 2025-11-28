-- Create feedback table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  message TEXT,
  status TEXT DEFAULT 'new', 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public feedback form)
CREATE POLICY "Anyone can submit feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view feedback" 
ON public.feedback 
FOR SELECT 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_feedback_created_at ON public.feedback(created_at DESC);
CREATE INDEX idx_feedback_status ON public.feedback(status);