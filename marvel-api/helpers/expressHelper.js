// Based on npm package "express-async-handler"
export const asyncHandler = handler => {
    if (handler.constructor.name !== 'AsyncFunction')
        throw new Error(`asyncHandler must be used with a native async function, instead got: ${handler}`);

    return function (req, res, next) {
        return handler(req, res, next).catch(next);
    };
};
