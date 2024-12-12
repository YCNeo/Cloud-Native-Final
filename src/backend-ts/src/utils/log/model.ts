export interface EventLogServiceModel {
  uid: string;
  apiUrl: string;
  httpCode: number;
  description?: string | undefined;
}

export interface EventLogRepositoryModel {
  uid: string;
  event: string; // event: 'API:[API], http code:[http code], description:[description]'
}

export interface HardwareLogRepositoryModel {
  cpu: number;
  ram: number;
  disk: number;
  // network: string; // network: 'in:[in] MB/s, out:[out] MB/s'
}
