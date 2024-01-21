import { z } from "zod";

const refreshTokenSchema = z.object({

    expiryDate: z.date(),

    userId: z.string().uuid()

}).strict();

export default refreshTokenSchema;