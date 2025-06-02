
export interface OperatorInfo {
  name: string;
  color: string;
  bgColor: string;
}

export const getOperatorInfo = (phoneNumber: string): OperatorInfo => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // Check prefix patterns
  if (cleanNumber.startsWith('0901') || cleanNumber.startsWith('0902') || 
      cleanNumber.startsWith('0903') || cleanNumber.startsWith('0905') || 
      cleanNumber.startsWith('0990') || cleanNumber.startsWith('0991') || 
      cleanNumber.startsWith('0992') || cleanNumber.startsWith('0993') || 
      cleanNumber.startsWith('0994') || cleanNumber.startsWith('0995') || 
      cleanNumber.startsWith('0996') || cleanNumber.startsWith('0997') || 
      cleanNumber.startsWith('0998') || cleanNumber.startsWith('0999')) {
    return {
      name: 'همراه اول',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    };
  }
  
  if (cleanNumber.startsWith('0901') || cleanNumber.startsWith('0910') || 
      cleanNumber.startsWith('0911') || cleanNumber.startsWith('0912') || 
      cleanNumber.startsWith('0913') || cleanNumber.startsWith('0914') || 
      cleanNumber.startsWith('0915') || cleanNumber.startsWith('0916') || 
      cleanNumber.startsWith('0917') || cleanNumber.startsWith('0918') || 
      cleanNumber.startsWith('0919')) {
    return {
      name: 'ایرانسل',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    };
  }
  
  if (cleanNumber.startsWith('0920') || cleanNumber.startsWith('0921') || 
      cleanNumber.startsWith('0922')) {
    return {
      name: 'رایتل',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    };
  }
  
  // Default fallback
  return {
    name: 'سایر اپراتورها',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  };
};
