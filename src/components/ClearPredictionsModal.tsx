import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useI18n } from '../i18n';

type ClearPredictionsModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ClearPredictionsModal({ opened, onClose, onConfirm }: ClearPredictionsModalProps) {
  const { t } = useI18n();

  return (
    <Modal opened={opened} onClose={onClose} title={t('modal.clearTitle')} centered>
      <Stack>
        <Text size="sm">{t('modal.clearDescription')}</Text>
        <Group justify="end">
          <Button variant="default" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button color="red" leftSection={<IconTrash size={16} />} onClick={onConfirm}>
            {t('common.clearAll')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
