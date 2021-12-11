export default class BaseComponent {
    protected inputs: any;
    protected client: any;
    private name;
    private basePath;
    constructor(inputs: any);
    __getBasePath(): string;
    __doc(projectName?: string): string;
    protected __report(reportData: any): any;
}
