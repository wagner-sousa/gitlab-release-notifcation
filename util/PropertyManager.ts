export class PropertyManager {
    private static properties = PropertiesService.getScriptProperties();

    public static getProperty(propertyName: string): string {
        const property = this.properties.getProperty(propertyName);
        Logger.log('Obtendo dados de propriedades de:' + propertyName);
        Logger.log('Dados obtidos: ' + property);

        if (!property) {
            throw new Error('Propriedade ' + propertyName + ' não definida');
        }

        return property;
    }
}