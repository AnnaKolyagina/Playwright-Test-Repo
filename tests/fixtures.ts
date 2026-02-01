import { test as base, Page } from '@playwright/test';
import logger from '../utils/logger';

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    logger.info('Test has started, Page has been created');
    await use(page);
    logger.info('Test is completed, Page has been closed');
  },
});

export { expect } from '@playwright/test';
