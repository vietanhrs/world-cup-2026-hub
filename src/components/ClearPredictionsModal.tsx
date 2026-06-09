import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

type ClearPredictionsModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ClearPredictionsModal({ opened, onClose, onConfirm }: ClearPredictionsModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Xóa toàn bộ prediction?" centered>
      <Stack>
        <Text size="sm">Tất cả tỉ số đang điền sẽ bị xóa khỏi màn hình hiện tại.</Text>
        <Group justify="end">
          <Button variant="default" onClick={onClose}>Hủy</Button>
          <Button color="red" leftSection={<IconTrash size={16} />} onClick={onConfirm}>Clear all</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
