import { ComponentPropsWithoutRef } from 'react';

type Props<Data> = {
  data: Data[];
  //'keyof Data' means any property key of the Data type.
  id: keyof Data;
  primary: keyof Data;
  secondary: keyof Data;
  //By using & (intersection), the Props<Data> type now includes all the properties that a ul element can accept, such as className, style, onClick, etc.
} & ComponentPropsWithoutRef<'ul'>;

//We use a rest parameter in the component props to collect all the HTML element props into an array
export function Checklist<Data>({ data, id, primary, secondary, ...ulProps }: Props<Data>) {
  return (
    <ul className="bg-gray-300 rounded p-10" {...ulProps}>
      {data.map((item) => {
        const idValue = item[id] as unknown;
        if (typeof idValue !== 'string' && typeof idValue !== 'number') {
          return null;
        }
        const primaryText = item[primary] as unknown;
        if (typeof primaryText !== 'string') {
          return null;
        }
        const secondaryText = item[secondary] as unknown;

        return (
          <li key={idValue} className="bg-white p-6 shadow rounded mb-4 last:mb-0">
            <div className="text-xl text-gray-800 pb-1">{primaryText}</div>
            {typeof secondaryText === 'string' && (
              <div className="text-sm text-gray-500">{secondaryText}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
