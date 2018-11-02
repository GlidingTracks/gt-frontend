import { MeterPipe } from './meter.pipe';

describe('MeterPipe', () => {
  let pipe: MeterPipe;
  beforeEach( () => pipe = new MeterPipe());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform 1324.456 | meter to "1324m"', () => {
    expect(pipe.transform(1324.456)).toEqual('1324m');
  });

  it('should transform 1324.456 | meter:"km" to "1km"', () => {
    expect(pipe.transform(1324.456, 'km')).toEqual('1km');
  });

  it('should transform 1324.456 | meter:"m":.1 to "1324.5m"', () => {
    expect(pipe.transform(1324.456, 'm', .1)).toEqual('1324.5m');
  });

  it('should transform 1324.456 | meter:"km":.001 to "1.324km"', () => {
    expect(pipe.transform(1324.456, 'km', .001)).toEqual('1.324km');
  });

  it('1324.456 | meter:"mm" should throw "Invalid unit" error', () => {
    expect(() => pipe.transform(1324.456, 'mm')).toThrowError('Invalid unit');
  });
});
