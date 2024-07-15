import { FieldError, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from '../ValidationError';

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

//Form using Controlled fields
export function ContactForm() {
  //Destructure register , handleSubmit & formState function from useForm hook
  const {
    register,
    handleSubmit,
    //Destructuring errors from formState
    formState: { errors },
  } = useForm<Contact>({
    //The mode option now tells React Hook Form to initially validate when a field editor loses focus
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const navigate = useNavigate();

  function onSubmit(contact: Contact) {
    console.log('Submitted details:', contact);
    navigate(`/thank-you/${contact.name}`);
  }

  const fieldStyle = 'flex flex-col mb-2';

  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'border-red-500' : '';
  }

  return (
    <div className="flex flex-col py-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold underline mb-3">Contact Us</h2>
      <p className="mb-3">If you enter your details we'll get back to you as soon as we can.</p>
      {/* noValidate attribute prevent any native HTML validation*/}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            className={getEditorStyle(errors.name)}
            {...register('name', {
              required: 'You must enter your name',
            })}
          />
          <ValidationError fieldError={errors.name} />
        </div>

        <div className={fieldStyle}>
          <label htmlFor="email">Your email address</label>
          <input
            type="email"
            id="email"
            className={getEditorStyle(errors.email)}
            {...register('email', {
              required: 'You must enter your email address',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
          />
          <ValidationError fieldError={errors.email} />
        </div>

        <div className={fieldStyle}>
          <label htmlFor="reason">Reason you need to contact us</label>
          <select
            id="reason"
            className={getEditorStyle(errors.reason)}
            {...register('reason', {
              required: 'You must enter the reason for contacting us',
            })}
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
          <ValidationError fieldError={errors.reason} />
        </div>

        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea id="notes" {...register('notes')} />
        </div>

        <div>
          <button type="submit" className="mt-2 h-10 px-6 font-semibold bg-black text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
