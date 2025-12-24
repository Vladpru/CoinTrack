export const validateNumber = (
  value: string,
  field: { onChange: (value: number) => void },
  setDisplayAmount: (value: string) => void
) => {
  const regex = /^\d*\.?\d{0,2}$/;

  if (value !== '' && !regex.test(value)) {
    return;
  }

  setDisplayAmount(value);

  if (value === '') {
    field.onChange(0);
    return;
  }

  if (value === '.' || value.endsWith('.')) {
    return;
  }

  const numValue = parseFloat(value);

  if (!isNaN(numValue) && isFinite(numValue) && numValue >= 0) {
    field.onChange(Math.round(numValue * 100));
  }
};
