import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeedbackCardProps {
  name: string;
  email: string;
  rating: number;
  message?: string;
  status: string;
  createdAt: string;
}

export const FeedbackCard = ({ name, email, rating, message, status, createdAt }: FeedbackCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "reviewed":
        return "bg-primary/10 text-primary border-primary/20";
      case "resolved":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="gradient-card rounded-xl p-6 shadow-soft transition-smooth hover:shadow-hover border border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <Badge className={getStatusColor(status)} variant="outline">
          {status}
        </Badge>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 transition-smooth ${
              star <= rating ? "fill-secondary stroke-secondary" : "fill-muted stroke-muted-foreground"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-foreground">{rating}/5</span>
      </div>

      {message && (
        <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-3">{message}</p>
      )}

      <div className="text-xs text-muted-foreground">{formatDate(createdAt)}</div>
    </div>
  );
};
