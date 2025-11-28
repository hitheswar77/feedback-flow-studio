import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1 and 5"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export const FeedbackForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      message: "",
    },
  });

  const selectedRating = form.watch("rating");

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("feedback").insert([
        {
          name: data.name,
          email: data.email,
          rating: data.rating,
          message: data.message || null,
          status: "new",
        },
      ]);

      if (error) throw error;

      toast.success("Thank you for your feedback!", {
        description: "Your feedback has been submitted successfully.",
      });

      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gradient-card rounded-2xl p-8 shadow-soft transition-smooth hover:shadow-hover">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow">
          Share Your Feedback
        </h2>
        <p className="mt-2 text-muted-foreground">We'd love to hear from you. Your feedback helps us improve!</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="transition-smooth focus:shadow-soft"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    className="transition-smooth focus:shadow-soft"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => field.onChange(rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-smooth transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                      >
                        <Star
                          className={`w-8 h-8 transition-smooth ${
                            rating <= (hoveredRating || selectedRating)
                              ? "fill-secondary stroke-secondary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your experience..."
                    className="min-h-[120px] transition-smooth focus:shadow-soft resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-primary font-semibold text-lg py-6 transition-smooth hover:scale-[1.02] hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
