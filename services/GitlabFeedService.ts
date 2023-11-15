import { TagBuilder } from "../builder/TagBuilder";
import { XmlManager } from "../util/XmlManager";
import "../interfaces/Tag";

export class GitlabFeedService {
    private document: GoogleAppsScript.XML_Service.Document;

    constructor(url: string) {

        console.log('Visitando Feed de Tags do Gitlab: ' + url);

        let response: GoogleAppsScript.URL_Fetch.HTTPResponse = this.getFeed(url);

        console.info("Feed obtido com sucesso!");

        let xml = response.getContentText();

        //TODO console.info("XML obtido com sucesso!\n" + xml);

        this.document = XmlService.parse(xml);
    }

    private getFeed(url: string): GoogleAppsScript.URL_Fetch.HTTPResponse {
        try {
            return UrlFetchApp.fetch(url);
        } catch (error) {
            throw new Error("Erro ao obter feed! \n" + error);
        }
    }

    public getXmlDocument(): GoogleAppsScript.XML_Service.Document {
        return this.document;
    }

    public getXmlFeed(): GoogleAppsScript.XML_Service.Element {
        return this.getXmlDocument().getRootElement();
    }

    public getXmlTags(): GoogleAppsScript.XML_Service.Element[] {
        return XmlManager.getChildren(this.getXmlFeed(), 'entry');
    }

    public getLastXmlTag(): GoogleAppsScript.XML_Service.Element {
        return XmlManager.getChild(this.getXmlFeed(), 'entry');
    }

    public getLastTag(): Tag {
        return new TagBuilder(this.getLastXmlTag());
    }

    public hasTags(): boolean {
        return this.getLastXmlTag() !== null;
    }
}

