// Declarations for Track metadata fetching
// in the result of a getTracks request.
export interface TrackMetadata {
  Privacy: boolean;
  Time: number;
  UID: string;
  Record: TrackRecord;
  TrackID: string;
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
  Time: Date;
  Latitude: string;
  Longitude: string;
  Valid: boolean;
  Pressure_alt: number;
  GPS_alt?: number;
  Accuracy?: number;
  Engine_RPM?: number;
  Status?: string;
}
