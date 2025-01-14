// Regular expression for basic IP address validation
export function isValidIPAddress(ip: string): boolean {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) return false;
  
  const parts = ip.split('.');
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
}

// Generate a random IP address for testing
export function generateRandomIP(): string {
  const generateOctet = () => Math.floor(Math.random() * 256);
  return `${generateOctet()}.${generateOctet()}.${generateOctet()}.${generateOctet()}`;
}