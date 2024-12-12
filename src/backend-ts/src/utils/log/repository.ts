import {
  EventLogRepositoryModel,
  HardwareLogRepositoryModel,
} from "./model.ts";
import mysqlPool from "../mysql.ts";

export async function eventLogRepository(log: EventLogRepositoryModel) {
  const connection = await mysqlPool.getConnection();
  try {
    const query = `
      INSERT INTO event_logs (uid, event)
      VALUES (?, ?)
    `;
    const values = [log.uid, log.event];
    await connection.query(query, values);
  } catch (error) {
    console.error("Error inserting event log:", error);
  } finally {
    connection.release();
  }
}

export async function hardwareLogRepository(log: HardwareLogRepositoryModel) {
  const connection = await mysqlPool.getConnection();
  try {
    const query = `
      INSERT INTO hardware_performance_logs (cpu, ram, disk)
      VALUES (?, ?, ?)
    `;
    const values = [log.cpu, log.ram, log.disk];
    await connection.query(query, values);
  } catch (error) {
    console.error("Error inserting hardware log:", error);
  } finally {
    connection.release();
  }
}
