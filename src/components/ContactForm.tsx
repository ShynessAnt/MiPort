import { useId, useState, type FormEvent } from 'react';
import { isMinLength, isNonEmpty, isValidEmail } from '@/lib/validators';
import styles from './ContactForm.module.css';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!isNonEmpty(values.name)) {
    errors.name = 'El nombre es obligatorio.';
  }
  if (!isNonEmpty(values.email)) {
    errors.email = 'El correo es obligatorio.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Escribe un correo válido.';
  }
  if (!isNonEmpty(values.subject)) {
    errors.subject = 'El asunto es obligatorio.';
  }
  if (!isMinLength(values.message, 20)) {
    errors.message = 'El mensaje debe tener al menos 20 caracteres.';
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const formId = useId();

  const nameErrorId = `${formId}-name-error`;
  const emailErrorId = `${formId}-email-error`;
  const subjectErrorId = `${formId}-subject-error`;
  const messageErrorId = `${formId}-message-error`;
  const statusId = `${formId}-status`;

  const updateField = (field: keyof FormValues, value: string): void => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      return;
    }

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();
    if (!endpoint) {
      setStatus('error');
      setStatusMessage(
        'El formulario no está configurado. Define VITE_FORM_ENDPOINT en un archivo .env.',
      );
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Respuesta no válida');
      }

      setStatus('success');
      setStatusMessage('Mensaje enviado. Gracias por escribir.');
      setValues(initialValues);
      setErrors({});
    } catch {
      setStatus('error');
      setStatusMessage(
        'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.',
      );
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(event)}
      noValidate
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${formId}-name`}>
          Nombre
        </label>
        <input
          id={`${formId}-name`}
          className={`${styles.input} ${errors.name ? styles.invalid : ''}`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => {
            updateField('name', event.target.value);
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? nameErrorId : undefined}
          required
        />
        {errors.name ? (
          <p id={nameErrorId} className={styles.error} role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${formId}-email`}>
          Correo
        </label>
        <input
          id={`${formId}-email`}
          className={`${styles.input} ${errors.email ? styles.invalid : ''}`}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => {
            updateField('email', event.target.value);
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
          required
        />
        {errors.email ? (
          <p id={emailErrorId} className={styles.error} role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${formId}-subject`}>
          Asunto
        </label>
        <input
          id={`${formId}-subject`}
          className={`${styles.input} ${errors.subject ? styles.invalid : ''}`}
          name="subject"
          value={values.subject}
          onChange={(event) => {
            updateField('subject', event.target.value);
          }}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? subjectErrorId : undefined}
          required
        />
        {errors.subject ? (
          <p id={subjectErrorId} className={styles.error} role="alert">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${formId}-message`}>
          Mensaje
        </label>
        <textarea
          id={`${formId}-message`}
          className={`${styles.textarea} ${errors.message ? styles.invalid : ''}`}
          name="message"
          value={values.message}
          onChange={(event) => {
            updateField('message', event.target.value);
          }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? messageErrorId : undefined}
          required
          minLength={20}
        />
        {errors.message ? (
          <p id={messageErrorId} className={styles.error} role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      {statusMessage ? (
        <p
          id={statusId}
          className={`${styles.status} ${status === 'success' ? styles.success : ''}`}
          role="status"
        >
          {statusMessage}
        </p>
      ) : null}

      <button
        className={styles.submit}
        type="submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  );
}
