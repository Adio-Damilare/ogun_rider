import React from 'react';
import { PaystackButton } from 'react-paystack';
const apiKey=import.meta.env.VITE_API_KEY;

const PaystackPay = () => {
  const amount = 500000; // ₦5000 in Kobo
  const email = 'customer@example.com'
  const componentProps = {
    email,
    amount,
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: 'Mobile Number',
          variable_name: 'mobile_number',
          value: '08012345678',
        },
      ],
    },
    publicKey:apiKey,
    text: 'Pay ',
    onSuccess: (ref) => alert(`Payment successful! Reference: ${ref.reference}`),
    onClose: () => alert('Payment closed'),
  };

  return <div className='border-4 m-auto p-5 rounded-xl space-y-4 shadow-2xl flex flex-col items-center justify-center'>
    <p className='text-center text-2xl font-bold'>Payment </p>
    <span className='block'>You are pay ₦5000 to complete this registration</span>

    <PaystackButton  className="bg-green-600 text-sm text-white px-6 py-2 rounded mx-auto" {...componentProps} />
  </div>
};

export default PaystackPay;
