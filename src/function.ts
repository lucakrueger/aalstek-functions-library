import { Types } from "./params";

// Library //

export type CloudFunction = {
    params: any,
    onRequest: (params: any) => void
}

export namespace Functions {
    export const Register = (functionObject: CloudFunction) => {
        const paramsObject = new Types.Obj().matches(functionObject.params)
        CloudFn.paramsObject = paramsObject
        CloudFn.onRequest = functionObject.onRequest
    }
}

// Inserted V8 Globals //

let CloudFn = {
    name: 'GetUser',
    paramsObject: {},
    onRequest: (params: any) => {}
}

let GetUser: CloudFunction = {params: {}, onRequest: (params: any) => {}}

// Function //

GetUser.params = {
    username: new Types.String().max(32),
    email: new Types.String().contains('@').contains('.'),
    password: new Types.String().min(12)
}

GetUser.onRequest = (params: any) => {
    return {
        value: 'Hello World'
    }
}

Functions.Register(GetUser)

/*
    CloudFunction Object gets cached and precompiled
    The CloudFunctionProcess just has to inject this global and call
        paramsObject.match($requestBody) == true : return onRequest($requestBody) : return error
*/