export type VehicleType = 'MATRIX' | 'TRAILER';

export interface FuelSession {
  id: string;
  pumpId: number;
  qrIdentifier: string;
  vehicleType: VehicleType;
  startTime: string;
  endTime: string;
}
