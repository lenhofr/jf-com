import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const DonateButton = () => {
  const handleDonateClick = () => {
    // Placeholder for donate functionality
    // This will need to be updated with actual donate link/form
    const donateWindow = window.open(
      "https://secure.actblue.com/donate/jesseforeman",
      "_blank"
    );
    if (donateWindow) {
      donateWindow.opener = null;
    }
  };

  const buttonClassName = [
    "bg-secondary",
    "text-secondary-foreground",
    "hover:bg-secondary/90",
    "shadow-2xl",
    "text-lg",
    "px-8",
    "py-7",
    "uppercase",
    "tracking-wider",
    "font-bold",
    "rounded-full",
    "glow-secondary",
    "animate-pulse-slow",
    "group",
  ].join(" ");

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button
        size="lg"
        onClick={handleDonateClick}
        className={buttonClassName}
        aria-label="Donate to support Jesse Foreman's campaign"
      >
        <Heart className="mr-2 h-6 w-6 fill-current group-hover:scale-110 transition-transform" />
        Donate
      </Button>
      
      {/* Pulse ring effect */}
      <div className="absolute inset-0 rounded-full bg-secondary/30 animate-ping-slow pointer-events-none" />
    </div>
  );
};

export default DonateButton;
