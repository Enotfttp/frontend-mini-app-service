import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
  CardStatus,
  CardType,
  IUpdateCardPayload,
  useGetCard,
  usePutCard,
  useSelectedCardStore,
} from '@entities/card';
import { useGetUsers } from '@entities/user';

import { DetailHeader, DrawerContent } from './CardDetailPanel.styled';

// ─── display config ──────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  CardStatus,
  { label: string; color: 'default' | 'info' | 'error' | 'success' }
> = {
  [CardStatus.CREATED]: { label: 'Создана', color: 'default' },
  [CardStatus.IN_PROGRESS]: { label: 'В работе', color: 'info' },
  [CardStatus.DECLINED]: { label: 'Отклонена', color: 'error' },
  [CardStatus.APPROVED]: { label: 'Одобрена', color: 'success' },
};

const TYPE_CONFIG: Record<
  CardType,
  { label: string; color: 'primary' | 'error' | 'warning' }
> = {
  [CardType.FEATURE]: { label: 'Feature', color: 'primary' },
  [CardType.BUG]: { label: 'Bug', color: 'error' },
  [CardType.HOTFIX]: { label: 'Hotfix', color: 'warning' },
};

const STORY_POINTS = [1, 2, 3, 5, 8, 13, 21];

// ─── local form state ─────────────────────────────────────────────────────────

interface FormState {
  status: CardStatus | '';
  type: CardType | '';
  storyPoints: number | '';
  assigneeId: string;
}

const EMPTY_FORM: FormState = { status: '', type: '', storyPoints: '', assigneeId: '' };

// ─── component ────────────────────────────────────────────────────────────────

export const CardDetailPanel: React.FC = () => {
  const { selectedCardId, closeCard } = useSelectedCardStore();

  const { data: card, isLoading } = useGetCard(selectedCardId ?? '');
  const { mutate } = usePutCard(selectedCardId ?? '');
  const { data: users = [] } = useGetUsers();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  // Sync form from API when a new card is opened
  useEffect(() => {
    if (card) {
      setForm({
        status: card.status ?? '',
        type: card.type ?? '',
        storyPoints: card.storyPoints ?? '',
        assigneeId: card.assigneeId ?? '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [card?.id]);

  const handleChange = <K extends keyof IUpdateCardPayload>(
    field: K,
    value: IUpdateCardPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value ?? '' }));
    mutate({ [field]: value });
  };

  return (
    <Drawer
      anchor="right"
      open={!!selectedCardId}
      onClose={closeCard}
      PaperProps={{ elevation: 8 }}
    >
      <DrawerContent>
        {/* Header */}
        <DetailHeader>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {isLoading ? <Skeleton width={200} /> : (card?.title ?? '—')}
          </Typography>
          <IconButton size="small" onClick={closeCard} edge="end">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DetailHeader>

        <Divider />

        {/* Body */}
        {isLoading ? (
          <Stack gap={2.5} p={2.5}>
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
            ))}
          </Stack>
        ) : !card ? (
          <Typography color="text.secondary" variant="body2" p={2.5}>
            Не удалось загрузить данные задачи
          </Typography>
        ) : (
          <Stack gap={2.5} p={2.5} sx={{ overflowY: 'auto', flex: 1 }}>
            {/* Type */}
            <FormControl size="small" fullWidth>
              <InputLabel>Тип задачи</InputLabel>
              <Select
                label="Тип задачи"
                value={form.type}
                onChange={(e) => handleChange('type', e.target.value as CardType)}
                renderValue={(v) =>
                  v ? (
                    <Chip
                      size="small"
                      label={TYPE_CONFIG[v as CardType].label}
                      color={TYPE_CONFIG[v as CardType].color}
                      sx={{ height: 22 }}
                    />
                  ) : null
                }
              >
                {Object.values(CardType).map((t) => (
                  <MenuItem key={t} value={t}>
                    <Chip
                      size="small"
                      label={TYPE_CONFIG[t].label}
                      color={TYPE_CONFIG[t].color}
                      sx={{ height: 22, pointerEvents: 'none' }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status */}
            <FormControl size="small" fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                label="Статус"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value as CardStatus)}
                renderValue={(v) =>
                  v ? (
                    <Chip
                      size="small"
                      label={STATUS_CONFIG[v as CardStatus].label}
                      color={STATUS_CONFIG[v as CardStatus].color}
                      sx={{ height: 22 }}
                    />
                  ) : null
                }
              >
                {Object.values(CardStatus).map((s) => (
                  <MenuItem key={s} value={s}>
                    <Chip
                      size="small"
                      label={STATUS_CONFIG[s].label}
                      color={STATUS_CONFIG[s].color}
                      sx={{ height: 22, pointerEvents: 'none' }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Story Points */}
            <FormControl size="small" fullWidth>
              <InputLabel>Story Points</InputLabel>
              <Select
                label="Story Points"
                value={form.storyPoints}
                onChange={(e) => handleChange('storyPoints', Number(e.target.value))}
              >
                {STORY_POINTS.map((sp) => (
                  <MenuItem key={sp} value={sp}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {sp}
                      </Box>
                      <Typography variant="body2">{sp} {sp === 1 ? 'очко' : sp < 5 ? 'очка' : 'очков'}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Assignee */}
            <FormControl size="small" fullWidth>
              <InputLabel>Ответственный</InputLabel>
              <Select
                label="Ответственный"
                value={form.assigneeId}
                onChange={(e) => handleChange('assigneeId', e.target.value as string)}
                renderValue={(v) => {
                  const user = users.find((u) => u.id === v);
                  if (!user) return null;
                  return (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 20, height: 20, fontSize: 11 }}>
                        {user.name[0].toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" noWrap>
                        {user.name}
                      </Typography>
                    </Stack>
                  );
                }}
              >
                {users.length === 0 ? (
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      Пользователи не найдены
                    </Typography>
                  </MenuItem>
                ) : (
                  users.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      <Stack direction="row" alignItems="center" gap={1.5}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 13 }}>
                          {u.name[0].toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {u.name}
                          </Typography>
                          {u.email && (
                            <Typography variant="caption" color="text.secondary">
                              {u.email}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Stack>
        )}
      </DrawerContent>
    </Drawer>
  );
};
