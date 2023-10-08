import { RequestService } from "./Request/RequestService";

export function commonLib() {
    const requestService = new RequestService();

    const commonLib = {
        request: requestService,
    }

    return commonLib;
}
