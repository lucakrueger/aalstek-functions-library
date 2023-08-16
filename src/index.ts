import { Types } from "./params";

// Inserted V8 Globals //

let CloudFunction = {
    name: 'GetUser',
    paramsObject: {},
    onRequest: (params: any) => {}
}

let GetUser = {params: {}, onRequest: (params: any) => {}}

// Library //


export namespace Functions {
    export const Register = (functionObject: {params: any, onRequest: (params: any) => any }) => {
        const paramsObject = new Types.Obj().matches(functionObject.params)
        CloudFunction.paramsObject = paramsObject
        CloudFunction.onRequest = functionObject.onRequest
    }
}


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