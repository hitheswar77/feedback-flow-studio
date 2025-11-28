import { useState } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackList } from "@/components/FeedbackList";
import { MessageSquare } from "lucide-react";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFeedbackSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-6">
            <MessageSquare className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Feedback Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your voice matters. Share your experience and help us create something amazing together.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div>
            <FeedbackForm onSuccess={handleFeedbackSuccess} />
          </div>

          {/* Feedback List */}
          <div>
            <FeedbackList refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ using Lovable & Supabase</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
