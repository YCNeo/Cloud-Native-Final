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
