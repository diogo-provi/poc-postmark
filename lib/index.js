"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postmark_1 = __importDefault(require("postmark"));
class EmailService {
    constructor(config) {
        this.config = config;
        if (!config.postmark.apiKey)
            throw new Error("Postmark API key is required");
        this.client = new postmark_1.default.ServerClient(config.postmark.apiKey);
    }
    async send(email) {
        if (!email.from || !email.to || !email.subject || !email.html) {
            throw new Error("Email is not valid");
        }
        this.client.sendEmail({
            From: email.from,
            To: email.to,
            Subject: email.subject,
            HtmlBody: email.html,
        });
    }
}
const config = {
    postmark: {
        apiKey: process.env.POSTMARK_API_KEY || "",
    },
};
console.log(process.env.POSTMARK_API_KEY);
const emailService = new EmailService(config);
const sampleEmail = {
    to: "diogo.cezar@provi.com.br",
    from: "diogo.cezar@provi.com.br",
    subject: "Testing",
    html: "<h1>Hello</h1>",
};
async () => await emailService.send(sampleEmail);
