import { SessionResponseService } from "./SessionResponseService";
export declare class ResponseService {
    private sessionResponseService;
    constructor(sessionResponseService?: SessionResponseService);
    prepare(request: any, response: any): any;
}
