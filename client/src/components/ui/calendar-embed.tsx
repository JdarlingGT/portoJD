import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analytics } from "@/lib/analytics";

interface CalendarEmbedProps {
  className?: string;
  title?: string;
  description?: string;
}

export function CalendarEmbed({ 
  className,
  title = "Schedule a Call",
  description = "Book a 15-minute portfolio walk-through to discuss your marketing technology challenges."
}: CalendarEmbedProps) {
  const [isBooked, setIsBooked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Sample time slots for demonstration
  const timeSlots = [
    { id: "1", date: "Today", time: "2:00 PM", available: true },
    { id: "2", date: "Today", time: "4:30 PM", available: true },
    { id: "3", date: "Tomorrow", time: "10:00 AM", available: true },
    { id: "4", date: "Tomorrow", time: "2:00 PM", available: false },
    { id: "5", date: "Tomorrow", time: "3:30 PM", available: true },
    { id: "6", date: "Friday", time: "11:00 AM", available: true },
  ];

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    analytics.track('calendar_slot_select', { slotId });
  };

  const handleBookCall = () => {
    if (selectedSlot) {
      const slot = timeSlots.find(s => s.id === selectedSlot);
      analytics.trackCTAClick("calendar-embed", `Book Call - ${slot?.date} ${slot?.time}`);
      setIsBooked(true);
    }
  };

  if (isBooked) {
    return (
      <Card className={cn("border-green-200 bg-green-50/50", className)}>
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-green-700">Call Scheduled!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-green-600">
            Your call has been booked for {timeSlots.find(s => s.id === selectedSlot)?.date} at {timeSlots.find(s => s.id === selectedSlot)?.time}.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Video className="w-4 h-4" />
              <span>Video call link will be sent via email</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>15-minute duration</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Time Slot Grid */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground">Available Times</div>
          
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && handleSlotSelect(slot.id)}
                disabled={!slot.available}
                className={cn(
                  "p-3 rounded-lg border text-sm transition-colors text-left",
                  slot.available 
                    ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
                    : "border-border/50 bg-muted/50 text-muted-foreground cursor-not-allowed",
                  selectedSlot === slot.id && "border-primary bg-primary/10"
                )}
                data-testid={`calendar-slot-${slot.id}`}
              >
                <div className="font-medium">{slot.date}</div>
                <div className="text-xs text-muted-foreground">{slot.time}</div>
                {!slot.available && (
                  <div className="text-xs text-red-500 mt-1">Unavailable</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Meeting Details */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="text-sm font-medium">Call Details:</div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-3 h-3" />
              <span>Video call (Google Meet)</span>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <Button 
          className="w-full"
          disabled={!selectedSlot}
          onClick={handleBookCall}
          data-testid="button-book-selected-slot"
        >
          {selectedSlot 
            ? `Book ${timeSlots.find(s => s.id === selectedSlot)?.date} at ${timeSlots.find(s => s.id === selectedSlot)?.time}`
            : "Select a time slot"
          }
        </Button>

        {/* Alternative */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Don't see a good time? <a href="mailto:jacob@example.com" className="text-primary hover:underline">Email me</a> to schedule.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}