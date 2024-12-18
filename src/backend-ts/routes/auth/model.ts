// from repository to service
export type DataModel = {
  mail: string;
};

// between service and controller/repository
export type DtoModel = {
  mail: string;
  hashPassword: string;
};

// from service to controller
export type ViewModel = {
  jwtToken: string;
};

export type registerModel = {
  name: string;
  mail: string;
  hashPassword: string;
};

export type searchResult = {
  success: boolean;
  mail: string;
};