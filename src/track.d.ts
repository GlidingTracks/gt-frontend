// Declarations for Track metadata fetching
// in the result of a getTracks request.
interface Track {
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
