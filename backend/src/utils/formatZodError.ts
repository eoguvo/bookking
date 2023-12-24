import { ZodIssue } from "zod";

function formatZodError(error: ZodIssue) {

    return { message: error.message, reason: error.code };

}

export default formatZodError;