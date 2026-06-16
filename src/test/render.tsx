import { MantineProvider } from '@mantine/core';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { I18nProvider } from '../i18n';
import { theme } from '../theme';

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(
    <MantineProvider theme={theme} defaultColorScheme="light">
      <I18nProvider>{ui}</I18nProvider>
    </MantineProvider>,
    options,
  );
}
