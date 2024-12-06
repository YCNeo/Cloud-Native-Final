import { DataModel, DtoModel} from "./model.ts";

export default function loginRepository(model: DtoModel): DataModel {
  const result: DataModel = { mail: model.mail };
  return result;
}
