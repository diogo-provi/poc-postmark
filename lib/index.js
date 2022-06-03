"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postmark_1 = require("postmark");
require("dotenv/config");
class EmailService {
    constructor(config) {
        this.config = config;
        if (!config.postmark.apiKey)
            throw new Error("Postmark API key is required");
        this.client = new postmark_1.Client(config.postmark.apiKey);
    }
    async sendEmailWithoutTemplate(email) {
        if (!email.from || !email.to || !email.subject || !email.html) {
            throw new Error("Email is not valid");
        }
        const options = {
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
    async sendEmailWithTemplate(email) {
        if (!email.from ||
            !email.to ||
            !email.templateAlias ||
            !email.templateModel) {
            throw new Error("Email is not valid");
        }
        const options = {
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
    const config = {
        postmark: {
            apiKey: process.env.POSTMARK_API_KEY || "",
        },
    };
    const emailService = new EmailService(config);
    const sampleSimpleEmail = {
        to: "diogo.cezar@provi.com.br",
        from: "felix@provi.com.br",
        subject: "Testing",
        html: "<h1>Hello</h1>",
    };
    const sampleTemplateEmail = {
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
        emailService.sendEmailWithTemplate(sampleTemplateEmail);
    }
    catch (e) {
        console.log(e);
    }
};
start();
