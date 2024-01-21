import { ZodIssue } from "zod";

function formatZodError(error: ZodIssue) {

    return { message: `${ error.message } ${ error.path || "" }`, reason: error.code };

}

export default formatZodError;