import { z } from 'zod';
import { BaseEnvSchema } from './base.js';
import { IntegrationEnvSchema } from './integrations.js';

const EnvSchema = z.object({
  ...BaseEnvSchema.shape,
  ...IntegrationEnvSchema.shape,
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Validates the environment variables based on a predefined schema.
 *
 * If the `NODE_ENV` is not set to `production`, it will only perform a partial validation
 * of the environment variables and log a warning indicating a non-strict mode.
 *
 * When running in `production`, the method strictly validates all required environment variables
 * using the defined schema. If the validation fails, it logs the error details and exits the process
 * with a status code of 1.
 *
 * @return {Env} The validated environment variables object.
 */
export const Env: Env = (() => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ Running in dev mode, skipping strict env validation');
    return EnvSchema.partial().parse(process.env) as Env;
  }

  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Environment validation failed:\n');
    for (const issue of result.error.issues) {
      console.error(`• ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }

  console.log('✅ Environment validated successfully');
  return result.data;
})();
