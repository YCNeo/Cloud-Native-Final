import si from "systeminformation";
import { EventLogServiceModel, HardwareLogRepositoryModel } from "./model.ts";
import { eventLogRepository, hardwareLogRepository } from "./repository.ts";

export function eventLogService(log: EventLogServiceModel) {
  try {
    eventLogRepository({
      uid: log.uid,
      event: `API:[${log.apiUrl}], http code:[${log.httpCode}], description:[${log.description}]`,
    });
  } catch (error) {
    console.error("Error inserting event log:", error);
  }
}

export async function hardwareLogService() {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const disk = await si.fsSize();

    const hardwareLog: HardwareLogRepositoryModel = {
      cpu: cpu.currentLoad,
      ram: memory.used / (1024 * 1024 * 1024), // Convert bytes to GB
      disk: disk.reduce((acc, d) => acc + d.use, 0) / disk.length, // Average disk usage percentage
    };

    // Log the hardwareLog object for debugging
    console.log("Hardware Log:", hardwareLog);

    await hardwareLogRepository(hardwareLog);
  } catch (error) {
    console.error("Error inserting hardware log:", error);
  }
}
