var postmark = require("postmark");
import "dotenv/config";

type Config = {
  postmark: {
    apiKey: string;
  };
};

type Email = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

class EmailService {
  private client: postmark.ServerClient;

  constructor(private readonly config: Config) {
    if (!config.postmark.apiKey)
      throw new Error("Postmark API key is required");
    this.client = new postmark.ServerClient(config.postmark.apiKey);
  }

  async send(email: Email): Promise<void> {
    if (!email.from || !email.to || !email.subject || !email.html) {
      throw new Error("Email is not valid");
    }
    this.client.sendEmail(
      {
        From: email.from,
        To: email.to,
        Subject: email.subject,
        HtmlBody: email.html,
      },
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );
  }
}

const start = async () => {
  const config: Config = {
    postmark: {
      apiKey: process.env.POSTMARK_API_KEY || "",
    },
  };

  const emailService = new EmailService(config);

  const sampleEmail: Email = {
    to: "diogo.cezar@provi.com.br",
    from: "felix@provi.com.br",
    subject: "Testing",
    html: "<h1>Hello</h1>",
  };

  try {
    emailService.send(sampleEmail);
  } catch (e) {
    console.log(e);
  }
};
start();
