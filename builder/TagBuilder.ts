import { XmlManager } from "../util/XmlManager";

export class TagBuilder implements Tag {
    public version: string;
    public comments: string;
    public date: string | null;
    public user_thumbnail: string | null;
    public user_name: string;
    public release: boolean;
    
    constructor(tag: GoogleAppsScript.XML_Service.Element) {
        let user_thumbnail: string | null = null;
        tag.getChildren().forEach((value) => {
            if (value.getName() == 'thumbnail') {
                user_thumbnail = value.getAttribute('url').getValue();
            }
        });

        this.version = XmlManager.getChild(tag, 'title').getText();
        this.comments = XmlManager.getChild(tag, 'content')
            .getText()
            /*.replaceAll('\u0026#x000A;', '')
            .replaceAll('</b>', '</b><br/>')
            .replaceAll('</li>', '</li><br/>')
            .replaceAll('</ul>', '</ul><br/>')*/;

        this.date = XmlManager.getChild(tag, 'updated')
            ? Utilities.formatDate(
                new Date(XmlManager.getChild(tag, 'updated').getText()),
                'America/Sao_Paulo',
                'dd/MM/YYYY'
            )
            : null;

        this.user_thumbnail = user_thumbnail;

        this.user_name = XmlManager.getChild(
            XmlManager.getChild(tag, 'author'),
            'name'
        ).getText();

        this.release = this.validateTag();
    }

    private validateTag(): boolean {
        // Logger.log('Validando TAG...');
        // if (getParameterValue(DEBUG) == 1) {
        //     Logger.log('SCRIPT em modo DEBUG...');
        //     return true;
        // }

        // if (RELEASES.includes(tag.version)) {
        //     Logger.log('RELEASE: [' + tag.version + '] já notificado');
        //     return false;
        // }

        if (!this.date) {
            //Logger.log('TAG: [' + this.version + '] não é um release');
            return false;
        }

        var regex = new RegExp('[a-zA-Z]+', 'i');
        if (regex.test(this.version)) {
            //Logger.log('RELEASE: [' + this.version + '] não é oficial!');
            return false;
        }

        return true;
    }

    public isRelease(): boolean {
        return this.release;
    }
}

