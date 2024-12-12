// from repository to service
export interface DataModel {
  mail: string;
}

// between service and controller/repository
export interface DtoModel {
  mail: string;
  hashPassword: string;
}

// from service to controller
export interface ViewModel {
  jwtToken: string;
}
