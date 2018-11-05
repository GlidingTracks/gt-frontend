import { GeoPipe } from './geo.pipe';

describe('GeoPipe', () => {
  let pipe: GeoPipe;
  beforeEach( () => pipe = new GeoPipe());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform 18.894288 | geo:"lon" to "18°53\'39.43" E"', () => {
    expect(pipe.transform(18.894288, 'lon')).toEqual('18°53\'39.43" E');
  });

  it('should transform -18.894288 | geo:"lon" to "18°53\'39.43 W"', () => {
    expect(pipe.transform(-18.894288, 'lon')).toEqual('18°53\'39.43" W');
  });

  it('should transform 51.864156 | geo:"lat" to "51°51\'50.96" N"', () => {
    expect(pipe.transform(51.864156, 'lat')).toEqual('51°51\'50.96" N');
  });

  it('should transform -51.864156 | geo:"lat" to "51°51\'50.96" S"', () => {
    expect(pipe.transform(-51.864156, 'lat')).toEqual('51°51\'50.96" S');
  });

  it('18.894288 | geo:"l" should throw "Invalid type" error', () => {
    expect(() => pipe.transform(18.894288, 'l')).toThrowError('Invalid type');
  });
});
