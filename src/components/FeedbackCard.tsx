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

export const FeedbackCard = ({
  name,
  email,
  rating,
  message,
  status,
  createdAt,
}: FeedbackCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "reviewed":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="rounded-xl p-6 bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <Badge variant="outline" className={getStatusColor(status)}>
          {status}
        </Badge>
      </div>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-primary stroke-primary"
                : "fill-muted stroke-muted-foreground"
            }`}
          />
        ))}
      </div>

      {message && (
        <p className="text-foreground mb-4 whitespace-pre-wrap">{message}</p>
      )}

      <p className="text-xs text-muted-foreground">{formatDate(createdAt)}</p>
    </div>
  );
};
