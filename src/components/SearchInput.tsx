import styles from './SearchInput.module.css';

interface SearchInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function SearchInput({
  id,
  value,
  onChange,
  label = 'Buscar',
  placeholder = 'Buscar por palabra clave',
}: SearchInputProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        autoComplete="off"
      />
    </div>
  );
}
