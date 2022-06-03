var postmark = require("postmark");
import "dotenv/config";
import { isGeneratorFunction } from "util/types";

enum TypeSend {
  SimpleEmail = 0,
  TemplateEmail = 1,
}

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

type PostmarkOptions = {
  Type: TypeSend;
  From: string;
  To: string;
  Subject?: string;
  HtmlBody?: string;
  TextBody?: string;
  TemplateModel?: Object;
  TemplateAlias?: string;
};

class EmailService {
  private client: postmark.ServerClient;

  constructor(private readonly config: Config) {
    if (!config.postmark.apiKey)
      throw new Error("Postmark API key is required");
    this.client = new postmark.ServerClient(config.postmark.apiKey);
  }

  async sendEmailWithoutTemplate(email: SimpleEmail): Promise<void> {
    if (!email.from || !email.to || !email.subject || !email.html) {
      throw new Error("Email is not valid");
    }
    const options: PostmarkOptions = {
      Type: TypeSend.SimpleEmail,
      From: email.from,
      To: email.to,
      Subject: email.subject,
      HtmlBody: email.html,
    };
    this.send(options);
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
    const options: PostmarkOptions = {
      Type: TypeSend.TemplateEmail,
      From: email.from,
      To: email.to,
      TemplateAlias: email.templateAlias,
      TemplateModel: email.templateModel,
    };
    this.send(options);
  }

  async send(options: PostmarkOptions): Promise<void> {
    const methodName =
      options.Type === TypeSend.SimpleEmail
        ? "sendEmail"
        : "sendEmailWithTemplate";
    this.client[methodName](options, (err, result) => {
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
    to: "felix.cezar@provi.com.br",
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
