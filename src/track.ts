// Declarations for Track metadata fetching
// in the result of a getTracks request.
export interface TrackMetadata {
  Privacy: boolean;
  Time: number;
  UID: string;
  Record: TrackRecord;
  TrackID: string;
  TrackPoints: TrackPoint[];
}

interface TrackRecord {
  Manufacturer: Manufacturer;
  Header: Header;
}

interface Manufacturer {
  ManufacturerID: string;
  UniqueID: string;
  Additional: string;
}

interface Header {
  Pilot: string;
  FlightRecorderType: string;
  GliderType: string;
  GliderID: string;
  FirmwareVersion: string;
  HardwareVersion: string;
  Date: string;
}

// Declaration for the IGC file parsing
export interface TrackPoint {
  Time: number;
  Latitude: number;
  Longitude: number;
  Valid: boolean;
  Pressure_alt: number;
  GPS_alt?: number;
  Accuracy?: number;
  Engine_RPM?: number;
}
