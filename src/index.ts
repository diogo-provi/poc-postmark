import { Client, Message, TemplatedMessage } from "postmark";
import "dotenv/config";

type Config = {
  postmark: {
    apiKey: string;
  };
};

type Email = {
  from: string;
  to: string;
};

type SimpleEmail = Email & {
  subject: string;
  html: string;
};

type TemplateEmail = Email & {
  templateModel: Object;
  templateAlias: string;
};

class EmailService {
  private client: Client;

  constructor(private readonly config: Config) {
    if (!config.postmark.apiKey)
      throw new Error("Postmark API key is required");
    this.client = new Client(config.postmark.apiKey);
  }

  async sendEmailWithoutTemplate(email: SimpleEmail): Promise<void> {
    if (!email.from || !email.to || !email.subject || !email.html) {
      throw new Error("Email is not valid");
    }
    const options: Message = {
      From: email.from,
      To: email.to,
      Subject: email.subject,
      HtmlBody: email.html,
    };
    this.client.sendEmail(options, (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log(result);
    });
  }

  async sendEmailWithTemplate(email: TemplateEmail): Promise<void> {
    if (
      !email.from ||
      !email.to ||
      !email.templateAlias ||
      !email.templateModel
    ) {
      throw new Error("Email is not valid");
    }
    const options: TemplatedMessage = {
      From: email.from,
      To: email.to,
      TemplateAlias: email.templateAlias,
      TemplateModel: email.templateModel,
    };
    this.client.sendEmailWithTemplate(options, (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log(result);
    });
  }
}

const start = async () => {
  const config: Config = {
    postmark: {
      apiKey: process.env.POSTMARK_API_KEY || "",
    },
  };

  const emailService = new EmailService(config);

  const sampleSimpleEmail: SimpleEmail = {
    to: "diogo.cezar@provi.com.br",
    from: "felix@provi.com.br",
    subject: "Testing",
    html: "<h1>Hello</h1>",
  };

  const sampleTemplateEmail: TemplateEmail = {
    to: "diogo.cezar@provi.com.br",
    from: "felix@provi.com.br",
    templateAlias: "welcome",
    templateModel: {
      product_url: "http://www.google.com",
      product_name: "Google",
      name: "Diogo",
      action_url: "http://www.google.com",
      login_url: "http://www.google.com",
      username: "diogo",
      trial_length: "30",
      trial_start_date: "10/10/2020",
      trial_end_date: "10/12/2020",
      support_email: "felix@provi.com.br",
      live_chat_url: "http://www.google.com",
      sender_name: "Felix",
      help_url: "http://www.google.com",
      company_name: "ProviTeste",
      company_address: "ProviTeste",
    },
  };

  try {
    //emailService.sendEmailWithoutTemplate(sampleSimpleEmail);
    emailService.sendEmailWithTemplate(sampleTemplateEmail);
  } catch (e) {
    console.log(e);
  }
};
start();
