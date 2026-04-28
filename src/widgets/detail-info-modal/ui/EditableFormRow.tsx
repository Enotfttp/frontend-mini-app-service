import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Box, FormHelperText, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Field, type FieldRenderProps } from 'react-final-form';

export interface EditableFormRowProps<T = unknown> {
  name: string;
  label?: string;
  required?: boolean;
  formatDisplay?: (value: T) => React.ReactNode;
  onApply?: (value: T) => Promise<void> | void;
  children: (props: { value: T; onChange: (v: T) => void }) => React.ReactNode;
}

function requiredMessage<T>(value: T, required?: boolean) {
  if (!required) return false;
  if (value === undefined || value === null) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  return false;
}

function EditableFormRowInner<T = unknown>({
  input,
  meta,
  label,
  required,
  formatDisplay,
  onApply,
  editContent,
}: FieldRenderProps<T, HTMLElement> &
  Pick<EditableFormRowProps<T>, 'label' | 'required' | 'formatDisplay' | 'onApply'> & {
    editContent: EditableFormRowProps<T>['children'];
  }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<T>(input.value);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (editing) {
      setDraft(input.value);
    }
  }, [editing, input.value]);

  const display = formatDisplay
    ? formatDisplay(input.value)
    : ((input.value as React.ReactNode) ?? '—');

  const accept = async () => {
    if (requiredMessage(draft, required)) return;
    setApplying(true);
    input.onChange(draft);
    input.onBlur();
    if (onApply) {
      try {
        await onApply(draft);
      } catch {
        setApplying(false);
        return;
      }
    }
    setApplying(false);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(input.value);
    setEditing(false);
    input.onBlur();
  };

  const effectiveLabel = label ?? '';

  return (
    <Stack direction="row" alignItems="flex-start" spacing={1.25} sx={{ py: 0.5 }}>
      {effectiveLabel ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ minWidth: 120, pt: 0.5, textTransform: 'uppercase', letterSpacing: 0.4 }}
        >
          {effectiveLabel}
        </Typography>
      ) : null}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {!editing ? (
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
            <Box sx={{ flex: 1, minWidth: 0 }}>{display}</Box>
            <IconButton
              size="small"
              aria-label={`Редактировать ${effectiveLabel || name}`}
              onClick={() => {
                setDraft(input.value);
                setEditing(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <Stack spacing={1}>
            {editContent({ value: draft, onChange: setDraft })}
            <Stack direction="row" spacing={0.5}>
              <IconButton
                size="small"
                color="primary"
                aria-label="Применить"
                onClick={() => void accept()}
                disabled={applying}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="Отменить" onClick={cancel} disabled={applying}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        )}
        {meta.touched && meta.error && (
          <FormHelperText error sx={{ mx: 0 }}>
            {meta.error}
          </FormHelperText>
        )}
      </Box>
    </Stack>
  );
}

const requiredValidator =
  (required?: boolean) =>
  (value: unknown): string | undefined => {
    if (!required) return undefined;
    if (requiredMessage(value, true)) return 'Обязательное поле';
    return undefined;
  };

export function EditableFormRow<T = unknown>(props: EditableFormRowProps<T>) {
  const { name, label, required, formatDisplay, onApply, children } = props;
  return (
    <Field<T> name={name} validate={requiredValidator(required)}>
      {(fieldProps) => (
        <EditableFormRowInner<T>
          {...fieldProps}
          label={label}
          required={required}
          formatDisplay={formatDisplay}
          onApply={onApply}
          editContent={children}
        />
      )}
    </Field>
  );
}
