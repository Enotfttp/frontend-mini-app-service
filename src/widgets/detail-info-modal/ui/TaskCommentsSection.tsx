import type { ITaskComment } from '@entities/task';
import { formatDateTime } from '@shared/utils/formatter';
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

interface Props {
  comments: ITaskComment[];
  currentUserName: string;
  commentText: string;
  setCommentText: (v: string) => void;
  sendingComment: boolean;
  onSubmitComment: () => Promise<void>;
  canSubmitComment: boolean;
}

export const TaskCommentsSection = ({
  comments,
  currentUserName,
  commentText,
  setCommentText,
  sendingComment,
  onSubmitComment,
  canSubmitComment,
}: Props) => (
  <Stack spacing={1.5}>
    <Typography variant="subtitle2" fontWeight={700}>
      Комментарии
    </Typography>

    <Stack spacing={1.25} sx={{ maxHeight: 220, overflow: 'auto', pr: 0.5 }}>
      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Пока нет комментариев.
        </Typography>
      ) : (
        comments.map((c) => (
          <Box
            key={c.id}
            sx={{
              p: 1.25,
              borderRadius: 2.5,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : theme.palette.grey[100],
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar sx={{ width: 26, height: 26, fontSize: 12 }}>
                  {(c.userName?.[0] ?? '?').toUpperCase()}
                </Avatar>
                <Typography variant="caption" fontWeight={700}>
                  {c.userName}
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {formatDateTime(c.createdAt)}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {c.text}
            </Typography>
          </Box>
        ))
      )}
    </Stack>

    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ px: 0.25 }}>
        <Avatar sx={{ width: 26, height: 26, fontSize: 12 }}>
          {(currentUserName[0] ?? '?').toUpperCase()}
        </Avatar>
        <Typography variant="caption" color="text.secondary">
          Автор: {currentUserName}
        </Typography>
      </Stack>
      <TextField
        size="small"
        fullWidth
        multiline
        minRows={2}
        label="Новый комментарий"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Текст комментария"
      />
      <Button
        variant="outlined"
        onClick={() => void onSubmitComment()}
        disabled={sendingComment || !commentText.trim() || !canSubmitComment}
      >
        {sendingComment ? 'Отправка…' : 'Отправить комментарий'}
      </Button>
    </Stack>
  </Stack>
);
