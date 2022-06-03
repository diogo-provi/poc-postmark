"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_client_1 = require("@hubspot/api-client");
require("dotenv/config");
class HubSpotMigration {
    constructor(config) {
        this.config = config;
        if (!config.hubspot.apiKey) {
            throw new Error("Hubspot API key is required");
        }
        this.client = new api_client_1.Client(config.hubspot.apiKey);
    }
    getTemplateFromHubspot(templateId) {
        return this.client.crm.
        ;
    }
}
