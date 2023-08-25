import { useState } from 'react';
import copy from 'copy-to-clipboard';

type CopyFunction = (text: any, options?: any) => void;
type ClipboardState = [CopyFunction, { value: any; success: boolean }];

export default function useCopyToClipboard(): ClipboardState {
  const [value, setValue] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);

  const copyToClipboard: CopyFunction = (text, options) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return [copyToClipboard, { value, success }];
}

// USAGE
// import useCopyToClipboard from './useCopyToClipboard';
// export default function CopyToClipboardComponent() {
//   const [copyToClipboard, { success }] = useCopyToClipboard();
//
//   return (
//     <>
//       <button onClick={() => copyToClipboard('This was copied')}>
//         {success ? 'Copied' : 'Copy Text'}
//       </button>
//       <input type="text" />
//     </>
//   );
// }
