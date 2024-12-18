import { DataModel, DtoModel} from "./model.ts";

export function loginRepository(model: DtoModel): DataModel {
  const result: DataModel = { mail: model.mail };
  return result;
}

export function registerRepository(model: DtoModel): DataModel {
  const result: DataModel = { mail: model.mail };
  return result;
}