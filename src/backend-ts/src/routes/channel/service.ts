import { DataModel, DtoModel, ViewModel } from "./model.ts";
import loginRepository from "./repository.ts";

export default function loginService(model: DtoModel): ViewModel {
  const result: DataModel = loginRepository(model);
  return { jwtToken: getJWTToken(result.mail) };
}

const getJWTToken = (sort: string): string => {
  return "sjlafjlaf";
};
