export type CloudFunction = {
    params: any;
    onRequest: (params: any) => void;
};
export declare namespace Functions {
    const Register: (functionObject: CloudFunction) => void;
}
