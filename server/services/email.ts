interface EmailService {
  sendContactNotification(submission: {
    name: string;
    email: string;
    company?: string;
    message: string;
    utmSource?: string;
  }): Promise<boolean>;
}

class ConsoleEmailService implements EmailService {
  async sendContactNotification(submission: {
    name: string;
    email: string;
    company?: string;
    message: string;
    utmSource?: string;
  }): Promise<boolean> {
    console.log("📧 New contact form submission:");
    console.log("Name:", submission.name);
    console.log("Email:", submission.email);
    console.log("Company:", submission.company || "Not provided");
    console.log("Message:", submission.message);
    console.log("UTM Source:", submission.utmSource || "direct");
    console.log("---");

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  }
}

export const emailService: EmailService = new ConsoleEmailService();
