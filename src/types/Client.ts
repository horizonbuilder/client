export interface Client {
  id: string;
  name: string;
  address: string;
  mobile_phone_number: string;
  wired_phone_number: string;
  email_address: string;
}

export interface ClientInput {
  name?: string;
  address?: string;
  mobile_phone_number?: string;
  wired_phone_number?: string;
  email_address?: string;
}
