import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FeedbackCard } from "./FeedbackCard";
import { Loader2 } from "lucide-react";

interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  message?: string;
  status: string;
  created_at: string;
}

export const FeedbackList = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, [refreshTrigger]);

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <span className="text-3xl">💭</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No feedback yet</h3>
        <p className="text-muted-foreground">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Recent Feedback</h2>
        <p className="text-muted-foreground mt-1">See what others are saying</p>
      </div>
      
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            name={feedback.name}
            email={feedback.email}
            rating={feedback.rating}
            message={feedback.message || undefined}
            status={feedback.status}
            createdAt={feedback.created_at}
          />
        ))}
      </div>
    </div>
  );
};
